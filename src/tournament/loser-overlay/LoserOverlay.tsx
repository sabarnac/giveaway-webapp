import React, { useEffect } from "react";
import { Observer } from "mobx-react";
import "./LoserOverlay.scss";
import classNames from "classnames";
import Participant from "../../store/round/match/participant/Participant";
import { CSSTransition } from "react-transition-group";
import {
  getNormalizedSpeed,
  useAnimationState,
  AnimationStateHookResult,
  runOnPredicate,
} from "../../util/index";
import LoserOverlayView from "./_partial/LoserOverlayView";

/**
 * Properties of the loser overlay React component.
 */
interface LoserOverlayProps {
  /** The losers of a round. */
  losers: Participant[];
  /** Action to call when the overlay has finished showing the list of losers. */
  onOverlayComplete: () => void;
}

/**
 * React component for the loser overlay.
 */
export default (props: LoserOverlayProps): JSX.Element => {
  const [
    currentState,
    updateState,
  ]: AnimationStateHookResult = useAnimationState();
  const className: string = "loser-overlay";

  useEffect(runOnPredicate(currentState === 0, updateState));

  return (
    <Observer>
      {() => (
        <CSSTransition
          in={currentState === 1}
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
          onExited={props.onOverlayComplete}
        >
          <div
            className={classNames(`${className}-wrapper`)}
            style={{
              transition: `opacity ${getNormalizedSpeed(500)}ms ease-in-out`,
            }}
          >
            <LoserOverlayView
              losers={props.losers}
              className={className}
              onViewComplete={updateState}
            />
          </div>
        </CSSTransition>
      )}
    </Observer>
  );
};
