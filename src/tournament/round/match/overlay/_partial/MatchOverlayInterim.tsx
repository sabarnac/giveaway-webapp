import React, { useEffect } from "react";
import { inject, Observer } from "mobx-react";
import "./MatchOverlayInterim.scss";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import {
  getNormalizedSpeed,
  AnimationStateHook,
  useAnimationState,
  runOnPredicate,
  isInRange,
} from "../../../../../util/index";
import { ClipLoader } from "react-spinners";

/**
 * Properties of the match overlay React component.
 */
interface MatchOverlayInterimProps {
  /** CSS class */
  className: string;
  /** Whether to show the winner or not. */
  show: boolean;
  /** Action to call when the view has finished showing the match. */
  onInterimComplete: () => void;
}

export default inject("config")(
  (props: MatchOverlayInterimProps): JSX.Element => {
    const [
      currentState,
      updateState,
      updateStateDelay,
    ]: AnimationStateHook = useAnimationState();

    useEffect(runOnPredicate(currentState === 0, updateState));
    useEffect(
      runOnPredicate(currentState === 2, () =>
        updateStateDelay(getNormalizedSpeed(4000)),
      ),
      [currentState],
    );

    return (
      <Observer>
        {() => (
          <CSSTransition
            in={isInRange(currentState, 1, 2) && props.show}
            timeout={getNormalizedSpeed(500)}
            classNames={{
              enter: "",
              enterActive: `${props.className}__interim--entering`,
              enterDone: `${props.className}__interim--entered`,
              exit: "",
              exitActive: `${props.className}__interim--exiting`,
              exitDone: `${props.className}__interim--exited`,
            }}
            mountOnEnter={true}
            unmountOnExit={true}
            onEntered={updateState}
            onExited={props.onInterimComplete}
          >
            <div
              className={classNames(`${props.className}__interim`)}
              style={{
                transition: `opacity ${getNormalizedSpeed(500)}ms ease-in-out`,
              }}
            >
              <h3>Selecting Winner</h3>
              <ClipLoader sizeUnit={"rem"} size={3} />
            </div>
          </CSSTransition>
        )}
      </Observer>
    );
  },
);
