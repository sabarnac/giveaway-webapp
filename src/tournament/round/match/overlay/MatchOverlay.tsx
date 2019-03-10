import React, { useEffect } from "react";
import { inject, Observer } from "mobx-react";
import "./MatchOverlay.scss";
import classNames from "classnames";
import Match from "../../../../store/round/match/Match";
import { CSSTransition } from "react-transition-group";
import {
  isInRange,
  getNormalizedSpeed,
  AnimationStateHook,
  useAnimationState,
  runOnPredicate,
} from "../../../../util/index";
import MatchOverlayWinner from "./_partial/MatchOverlayWinner";
import MatchOverlayInterim from "./_partial/MatchOverlayInterim";
import MatchOverlayParticipants from "./_partial/MatchOverlayParticipants";

/**
 * Properties of the match overlay React component.
 */
interface MatchOverlayProps {
  /** The match details. */
  currentMatch: Match;
  /** Whether to show the match overlay or not. */
  show: boolean;
  /** Action to call when the view has finished showing the match. */
  onOverlayComplete: () => void;
}

export default inject("config")(
  (props: MatchOverlayProps): JSX.Element => {
    const [currentState, updateState]: AnimationStateHook = useAnimationState();
    const className: string = "match-overlay";

    useEffect(runOnPredicate(currentState === 0 && props.show, updateState));

    return (
      <Observer>
        {() => (
          <CSSTransition
            in={isInRange(currentState, 1, 2) && props.show}
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
              <div className={classNames(className)}>
                <MatchOverlayParticipants
                  className={className}
                  currentMatch={props.currentMatch}
                />
                <MatchOverlayInterim
                  className={className}
                  show={currentState === 1}
                  onInterimComplete={updateState}
                />
                <MatchOverlayWinner
                  currentMatch={props.currentMatch}
                  className={className}
                  show={currentState === 2}
                  onWinnerComplete={updateState}
                />
              </div>
            </div>
          </CSSTransition>
        )}
      </Observer>
    );
  },
);
