import React, { useEffect } from "react";
import { Observer } from "mobx-react";
import "./WinnerOverlay.scss";
import Participant from "../../store/round/match/participant/Participant";
import classNames from "classnames";
import Config from "../../store/config/Config";
import { CSSTransition } from "react-transition-group";
import {
  useAnimationState,
  AnimationStateHookResult,
  getNormalizedSpeed,
} from "../../util";
import WinnerOverlayView from "./_partial/WinnerOverlayView";

/**
 * Properties of the winner overlay React component.
 */
interface WinnerOverlayProps {
  /** @ignore The application config. */
  config?: Config;
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
  const className: string = "winner-overlay-wrapper";

  useEffect(updateState);

  return (
    <Observer>
      {() => (
        <CSSTransition
          in={currentState > 0}
          timeout={getNormalizedSpeed(500)}
          classNames={{
            enter: "",
            enterActive: `${className}--entering`,
            enterDone: `${className}--entered`,
            exit: "",
            exitActive: `${className}--exiting`,
            exitDone: `${className}--exited`,
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
            <WinnerOverlayView winner={props.winner} />
          </div>
        </CSSTransition>
      )}
    </Observer>
  );
};
