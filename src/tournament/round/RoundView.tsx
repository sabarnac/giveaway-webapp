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
  getRoundRedirectIfRequired,
} from "../../util/index";
import RoundDetails from "./_partial/RoundDetails";
import { CSSTransition } from "react-transition-group";

/**
 * Properties of the round view React component.
 */
interface RoundViewProps {
  /** Whether to show the round or not. */
  show: boolean;
  /** The ID of the current match. */
  matchId: string;
  /** The details of the current round. */
  round: Round;
  /** Action to call when the view has finished showing the round. */
  onRoundComplete: () => void;
}

/**
 * React component for the round view.
 */
export default (props: RoundViewProps): JSX.Element => {
  const currentMatchIndex: number = props.round.matches.findIndex(
    (match: Match): boolean => match.id === props.matchId,
  );
  const className: string = "round";

  const [currentState, updateState]: AnimationStateHook = useAnimationState(
    currentMatchIndex,
  );
  const shouldNextRedirect: boolean =
    currentMatchIndex !== currentState &&
    currentMatchIndex !== -1 &&
    currentState < props.round.matches.length;

  useEffect(
    runOnPredicate(currentState === props.round.matches.length, () => {
      const delayId: number = runOnDelay(
        props.onRoundComplete,
        getNormalizedSpeed(500),
      );
      return () => clearTimeout(delayId);
    }),
    [currentState],
  );

  return (
    <CSSTransition
      in={props.show}
      timeout={500}
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
          onRoundMatchComplete={updateState}
        />
        {getRoundRedirectIfRequired(
          currentMatchIndex === -1,
          props.round.id,
          props.round.firstMatch.id,
        )}
        {getRoundRedirectIfRequired(
          shouldNextRedirect,
          props.round.id,
          props.round.matches[Math.max(currentMatchIndex, currentState)].id,
        )}
      </Fragment>
    </CSSTransition>
  );
};
