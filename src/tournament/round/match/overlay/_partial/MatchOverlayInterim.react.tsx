import React, { useEffect } from "react";
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
import { Trans, WithTranslation } from "react-i18next";

/**
 * Properties of the match overlay interim React component.
 */
export interface MatchOverlayInterimProps extends WithTranslation {
  /** CSS class */
  className: string;
  /** Whether to show the interim text or not. */
  show: boolean;
  /** Action to call when the view has finished showing the interim text. */
  onInterimComplete: () => void;
}

/**
 * React component for the match overlay interim.
 */
export default (props: MatchOverlayInterimProps): JSX.Element => {
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
        <h3>
          <Trans i18nKey="matchOverlay.interimText">Selecting Winner</Trans>
        </h3>
        <ClipLoader sizeUnit={"rem"} size={3} />
      </div>
    </CSSTransition>
  );
};
