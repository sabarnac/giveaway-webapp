import React, { useEffect, Fragment } from "react";
import "./RoundView.scss";
import Round from "../../store/round/Round";
import Match from "../../store/round/match/Match";
import {
  AnimationStateHook,
  useAnimationState,
  runOnPredicate,
  runOnDelay,
  getNormalizedSpeed,
  getMatchRedirect,
} from "../../util/index";
import RoundDetails from "./_partial/RoundDetails";
import { CSSTransition } from "react-transition-group";

/**
 * Properties of the round view React component.
 */
export interface RoundViewProps {
  /** Whether to show the round or not. */
  show: boolean;
  /** The ID of the current match. */
  matchId: string;
  /** The details of the current round. */
  round: Round | undefined;
  /** Action to call when the view has finished showing the round. */
  onRoundComplete: () => void;
}

/**
 * Returns a redirect to the given round and match if required.
 * @param {boolean} required Whether the redirect is required or not.
 * @param {Round} round The details of the round.
 * @param {number} matchIndex The index of the match to redirect to.
 * @return {JSX.Element | null} The redirect if it is required, or null if it is not.
 */
export const getRoundRedirectIfRequired = (
  required: boolean = false,
  round: Round,
  matchIndex: number,
): JSX.Element | null =>
  required ? getMatchRedirect(round.id, round.matches[matchIndex].id) : null;

/**
 * React component for the round view.
 */
export default (props: RoundViewProps): JSX.Element | null => {
  if (props.round === undefined) {
    return null;
  }

  const currentMatchIndex: number = props.round.matches.findIndex(
    (match: Match): boolean => match.id === props.matchId,
  );
  const className: string = "round";

  const [
    currentState,
    updateState,
    ,
    setState,
  ]: AnimationStateHook = useAnimationState(currentMatchIndex);
  const shouldNextRedirect: boolean =
    currentState > 0 &&
    currentMatchIndex !== currentState &&
    currentMatchIndex !== -1 &&
    currentState < props.round.matches.length;

  useEffect(
    runOnPredicate(currentState === props.round.matches.length, () =>
      runOnDelay(props.onRoundComplete, getNormalizedSpeed(500)),
    ),
    [currentState],
  );

  useEffect(() => setState(currentMatchIndex), [currentMatchIndex, props.matchId, setState]);

  return (
    <CSSTransition
      in={props.show}
      timeout={getNormalizedSpeed(500)}
      classNames={{
        enter: "",
        enterActive: "round--entering",
        enterDone: "round--entered",
        exit: "",
        exitActive: "round--exiting",
        exitDone: "round--exited",
      }}
      mountOnEnter={true}
      unmountOnExit={true}
    >
      <Fragment>
        <RoundDetails
          className={className}
          round={props.round}
          show={currentState !== props.round.matches.length}
          matchId={props.matchId}
          onCurrentComplete={updateState}
        />
        {getRoundRedirectIfRequired(currentMatchIndex === -1, props.round, 0)}
        {getRoundRedirectIfRequired(
          shouldNextRedirect,
          props.round,
          currentState,
        )}
      </Fragment>
    </CSSTransition>
  );
};
