import React, { useEffect } from "react";
import "./RoundDetails.scss";
import classNames from "classnames";
import Round from "../../../store/round/Round";
import Match from "../../../store/round/match/Match";
import { CSSTransition } from "react-transition-group";
import {
  getNormalizedSpeed,
  AnimationStateHook,
  useAnimationState,
  runOnPredicate,
} from "../../../util/index";
import RoundMatchListView from "./RoundMatchListView";
import RoundTitle from "./RoundTitle";

/**
 * Properties of the round details React component.
 */
export interface RoundDetailsProps {
  /** CSS class */
  className: string;
  /** The ID of the current match. */
  matchId: string;
  /** The details of the current round. */
  round: Round;
  /** Whether to show the round details or not. */
  show: boolean;
  /** Action to call when the current match is completed. */
  onCurrentComplete: () => void;
}

/**
 * React component for the round details.
 */
export default (props: RoundDetailsProps): JSX.Element => {
  const currentMatchIndex: number = props.round.matches.findIndex(
    (match: Match): boolean => match.id === props.matchId,
  );
  const [currentState, updateState]: AnimationStateHook = useAnimationState(
    currentMatchIndex,
  );

  useEffect(runOnPredicate(currentState === 0, updateState));

  return (
    <CSSTransition
      in={currentState > 0 && currentMatchIndex !== -1 && props.show}
      timeout={getNormalizedSpeed(500)}
      classNames={{
        enter: "",
        enterActive: `${props.className}--entering`,
        enterDone: `${props.className}--entered`,
        exit: "",
        exitActive: `${props.className}--exiting`,
        exitDone: `${props.className}--exited`,
      }}
      mountOnEnter={true}
      unmountOnExit={true}
    >
      <div
        className={classNames(props.className)}
        style={{
          transition: `opacity ${getNormalizedSpeed(500)}ms ease-in-out`,
        }}
      >
        <RoundTitle round={props.round} />
        <RoundMatchListView
          key={`${props.round.id}:${props.matchId}`}
          className={props.className}
          round={props.round}
          matchId={props.matchId}
          onCurrentMatchComplete={props.onCurrentComplete}
        />
      </div>
    </CSSTransition>
  );
};
