import React, { useEffect } from "react";
import { Observer } from "mobx-react";
import "./LoserInfo.scss";
import classNames from "classnames";
import Participant from "../../../store/round/match/participant/Participant";
import ParticipantCard from "../../round/match/participant/card/ParticipantCard";
import { CSSTransition } from "react-transition-group";
import {
  AnimationStateHook,
  useAnimationState,
  getNormalizedSpeed,
  runOnPredicate,
  isInRange,
} from "../../../util";

/**
 * Properties of the loser info React component.
 */
interface LoserInfoProps {
  /** CSS class */
  className: string;
  /** The loser details. */
  loser: Participant;
  /** Whether to show the entry or not. */
  show: boolean;
  /** Action to call when the info has finished showing the list of losers. */
  onInfoComplete: () => void;
}

/**
 * React component for the loser info.
 */
export default (props: LoserInfoProps): JSX.Element => {
  const [
    currentState,
    updateState,
    updateStateDelay,
  ]: AnimationStateHook = useAnimationState();

  useEffect(runOnPredicate(currentState === 0, updateState));
  useEffect(
    runOnPredicate(currentState === 2, () =>
      updateStateDelay(getNormalizedSpeed(1000)),
    ),
    [currentState],
  );

  return (
    <Observer>
      {() => (
        <CSSTransition
          in={isInRange(currentState, 1, 2) && props.show}
          timeout={getNormalizedSpeed(200)}
          classNames={{
            enter: "",
            enterActive: `${props.className}__loser--entering`,
            enterDone: `${props.className}__loser--entered`,
            exit: "",
            exitActive: `${props.className}__loser--exiting`,
            exitDone: `${props.className}__loser--exited`,
          }}
          mountOnEnter={true}
          unmountOnExit={true}
          onEntered={updateState}
          onExited={props.onInfoComplete}
        >
          <div
            className={classNames(`${props.className}__loser`)}
            style={{
              transition: `opacity ${getNormalizedSpeed(200)}ms ease-in-out`,
            }}
          >
            <ParticipantCard participant={props.loser} />
          </div>
        </CSSTransition>
      )}
    </Observer>
  );
};
