import React, { useEffect } from "react";
import "./MatchWinnerView.scss";
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
  /** The details of the current match. */
  winner: Participant;
}

/**
 * React component for the match view.
 */
export default (props: MatchWinnerViewProps): JSX.Element => {
  const [currentState, updateState]: AnimationStateHook = useAnimationState();

  useEffect(runOnPredicate(currentState === 0, updateState));

  return (
    <CSSTransition
      in={currentState > 0}
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
    >
      <div
        className={classNames("match__winner")}
        style={{
          transition: `opacity ${getNormalizedSpeed(200)}ms ease-in-out`,
        }}
      >
        <ParticipantEntry participant={props.winner} />
      </div>
    </CSSTransition>
  );
};
