import React, { useEffect } from "react";
import { Observer, inject } from "mobx-react";
import "./MatchOverlayWinner.scss";
import classNames from "classnames";
import ParticipantEntry from "../../participant/entry/ParticipantEntry";
import { CSSTransition } from "react-transition-group";
import {
  getNormalizedSpeed,
  runOnDelay,
  AnimationStateHook,
  useAnimationState,
  runOnPredicate,
} from "../../../../../util/index";
import { RouteComponentProps, withRouter } from "react-router";
import Match from "../../../../../store/round/match/Match";

/**
 * Properties of the match overlay winner React component.
 */
interface MatchOverlayWinnerProps {
  /** CSS class */
  className: string;
  /** The current match details. */
  currentMatch: Match;
  /** Whether to show the winner or not. */
  show: boolean;
  /** Action to call when the view has finished showing the winner. */
  onWinnerComplete: () => void;
}

const STOP_QUERY_FLAG: string = "stop";

/**
 * React component for the match overlay winner.
 */
export default inject("config")(
  withRouter(
    (props: MatchOverlayWinnerProps & RouteComponentProps): JSX.Element => {
      const [
        currentState,
        updateState,
      ]: AnimationStateHook = useAnimationState();
      const shouldNotStopOnEnd: boolean = !new URLSearchParams(
        props.location.search,
      ).has(STOP_QUERY_FLAG);

      useEffect(runOnPredicate(currentState === 0, updateState));

      return (
        <Observer>
          {() => (
            <CSSTransition
              in={currentState === 1 && props.show}
              timeout={getNormalizedSpeed(500)}
              classNames={{
                enter: "",
                enterActive: `${props.className}__winner--entering`,
                enterDone: `${props.className}__winner--entered`,
                exit: "",
                exitActive: `${props.className}__winner--exiting`,
                exitDone: `${props.className}__winner--exited`,
              }}
              mountOnEnter={true}
              unmountOnExit={true}
              onEntered={
                shouldNotStopOnEnd
                  ? () =>
                      runOnDelay(
                        props.onWinnerComplete,
                        getNormalizedSpeed(4000),
                      )
                  : undefined
              }
            >
              <div
                className={classNames(`${props.className}__winner`)}
                style={{
                  transition: `opacity ${getNormalizedSpeed(
                    500,
                  )}ms ease-in-out`,
                }}
              >
                <ParticipantEntry participant={props.currentMatch.winner} />
                <h3>Won The Match!</h3>
                <h5>
                  <strong>
                    <em>{props.currentMatch.message}</em>
                  </strong>
                </h5>
              </div>
            </CSSTransition>
          )}
        </Observer>
      );
    },
  ),
);
