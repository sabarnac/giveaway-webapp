import React, { useEffect } from "react";
import { Observer } from "mobx-react";
import "./WinnerOverlay.scss";
import Participant from "../../store/round/match/participant/Participant";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import {
  useAnimationState,
  AnimationStateHookResult,
  getNormalizedSpeed,
  runOnPredicate,
} from "../../util";
import WinnerOverlayView from "./_partial/WinnerOverlayView";

/**
 * Properties of the winner overlay React component.
 */
interface WinnerOverlayProps {
  /** The tournament winner. */
  winner: Participant;
}

/**
 * React component for the winner overlay.
 */
export default (props: WinnerOverlayProps): JSX.Element => {
  const [
    currentState,
    updateState,
  ]: AnimationStateHookResult = useAnimationState();
  const className: string = "winner-overlay";

  useEffect(runOnPredicate(currentState === 0, updateState));

  return (
    <Observer>
      {() => (
        <CSSTransition
          in={currentState > 0}
          timeout={getNormalizedSpeed(500)}
          classNames={{
            enter: "",
            enterActive: `${className}-wrapper--entering`,
            enterDone: `${className}-wrapper--entered`,
            exit: "",
            exitActive: `${className}-wrapper--exiting`,
            exitDone: `${className}-wrapper--exited`,
          }}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <div
            className={classNames(`${className}-wrapper`)}
            style={{
              transition: `opacity ${getNormalizedSpeed(500)}ms ease-in-out`,
            }}
          >
            <WinnerOverlayView className={className} winner={props.winner} />
          </div>
        </CSSTransition>
      )}
    </Observer>
  );
};
