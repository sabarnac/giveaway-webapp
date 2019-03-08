import React, { useEffect } from "react";
import "./MatchView.scss";
import classNames from "classnames";
import ParticipantEntry from "../participant/entry/ParticipantEntry";
import { getNormalizedSpeed } from "../../../../util/index";
import { CSSTransition } from "react-transition-group";
import Participant from "../../../../store/round/match/participant/Participant";
import {
  useAnimationState,
  AnimationStateHook,
  runOnPredicate,
} from "../../../../util";

/**
 * Properties of the match view React component.
 */
interface MatchWinnerViewProps {
  /** Whether it is the currently ongoing match. */
  isCurrentMatch: boolean;
  /** Whether it is an actual match. */
  isActualMatch: boolean;
  /** The details of the current match. */
  winner: Participant;
  /** Whether to show the round details or not. */
  show: boolean;
  /** Action to call when the view has finished showing the match. */
  onWinnerComplete: () => void;
}

/**
 * React component for the match view.
 */
export default (props: MatchWinnerViewProps): JSX.Element => {
  const [currentState, updateState]: AnimationStateHook = useAnimationState();

  useEffect(runOnPredicate(currentState === 0, updateState));

  return (
    <CSSTransition
      in={currentState > 0 && props.show}
      timeout={getNormalizedSpeed(200)}
      classNames={{
        enter: "",
        enterActive: "match__winner--entering",
        enterDone: "match__winner--entered",
        exit: "",
        exitActive: "match__winner--exiting",
        exitDone: "match__winner--exited",
      }}
      mountOnEnter={true}
      unmountOnExit={true}
      onEntered={props.onWinnerComplete}
    >
      <div
        className={classNames("match__winner", {
          "match__winner--completed":
            !props.isCurrentMatch || !props.isActualMatch,
        })}
        style={{
          transition: `opacity ${getNormalizedSpeed(200)}ms ease-in-out`,
        }}
      >
        <ParticipantEntry participant={props.winner} />
      </div>
    </CSSTransition>
  );
};
