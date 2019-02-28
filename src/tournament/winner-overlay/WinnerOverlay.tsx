import React, { useState, Dispatch, useEffect } from "react";
import { inject } from "mobx-react";
import "./WinnerOverlay.scss";
import Participant from "../../store/round/match/participant/Participant";
import Config from "../../store/config/Config";
import { CSSTransition } from "react-transition-group";
import WinnerOverlayWrapper from "./_partial/WinnerOverlayWrapper";

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
 * Create an animation state hook.
 * @return The current animation state.
 */
const useAnimationState = () => {
  const [currentState, setCurrentState]: [number, Dispatch<number>] = useState(
    0,
  );

  useEffect(() => setCurrentState(currentState + 1));

  return currentState;
};

/**
 * React component for the winner overlay.
 */
export default inject("config")(
  (props: WinnerOverlayProps): JSX.Element => {
    const currentState: number = useAnimationState();
    const className: string = "winner-overlay-wrapper";

    return (
      <CSSTransition
        in={currentState > 0}
        timeout={500 / props.config!.speed}
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
        <WinnerOverlayWrapper {...props} />
      </CSSTransition>
    );
  },
);
