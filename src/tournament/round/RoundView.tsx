import React, { Fragment, useEffect } from "react";
import "./RoundView.scss";
import Round from "../../store/round/Round";
import Match from "../../store/round/match/Match";
import {
  getMatchRedirect,
  AnimationStateHookResult,
  useAnimationState,
  runOnPredicate,
  runOnDelay,
  getNormalizedSpeed,
} from "../../util/index";
import RoundDetails from "./_partial/RoundDetails";

/**
 * Properties of the round view React component.
 */
interface RoundViewProps {
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

  const [
    currentState,
    updateState,
  ]: AnimationStateHookResult = useAnimationState(currentMatchIndex);
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
    <Fragment>
      <RoundDetails
        className={className}
        round={props.round}
        show={currentState !== props.round.matches.length}
        matchId={props.matchId}
        onRoundMatchComplete={updateState}
      />
      {currentMatchIndex === -1
        ? getMatchRedirect(props.round.id, props.round.firstMatch.id)
        : null}
      {shouldNextRedirect
        ? getMatchRedirect(
            props.round.id,
            props.round.matches[Math.max(currentMatchIndex, currentState)].id,
          )
        : null}
    </Fragment>
  );
};
