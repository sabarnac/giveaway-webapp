import React, { useEffect, Fragment } from "react";
import "./MatchFinalEntry.scss";
import classNames from "classnames";
import ParticipantEntry from "../participant/entry/ParticipantEntry";
import { getNormalizedSpeed, isInRange } from "../../../../util/index";
import { CSSTransition } from "react-transition-group";
import {
  useAnimationState,
  AnimationStateHook,
  runOnPredicate,
} from "../../../../util";
import Match from "../../../../store/round/match/Match";
import Participant from "../../../../store/round/match/participant/Participant";
import MatchWinnerView from "./MatchWinnerView";

/**
 * Properties of the match final entry React component.
 */
interface MatchFinalEntryProps {
  /** CSS class */
  className: string;
  /** Whether it is the currently ongoing match. */
  isCurrentMatch: boolean;
  /** Whether it is an actual match. */
  isActualMatch: boolean;
  /** The details of the current match. */
  match: Match;
}

/**
 * React component for the match final entry.
 */
export default (props: MatchFinalEntryProps): JSX.Element => {
  const [
    currentState,
    updateState,
    updateStateDelay,
    setState,
  ]: AnimationStateHook = useAnimationState();

  useEffect(runOnPredicate(currentState === 0, updateState));
  useEffect(
    runOnPredicate((currentState + 1) % 3 === 0, () =>
      updateStateDelay(getNormalizedSpeed(200)),
    ),
  );
  useEffect(
    runOnPredicate(
      currentState === props.match.participants.length * 3 + 1,
      () => setState(1),
    ),
  );

  return (
    <Fragment>
      {props.isCurrentMatch && props.isActualMatch ? (
        props.match.participants.map(
          (participant: Participant, index: number): JSX.Element => (
            <CSSTransition
              key={participant.id}
              in={isInRange(currentState, index * 3 + 1, index * 3 + 2)}
              timeout={getNormalizedSpeed(200)}
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
              onExited={updateState}
            >
              <div
                className={classNames(`${props.className}__interim`)}
                style={{
                  transition: `opacity ${getNormalizedSpeed(
                    200,
                  )}ms ease-in-out`,
                }}
              >
                <ParticipantEntry participant={participant} />
              </div>
            </CSSTransition>
          ),
        )
      ) : (
        <MatchWinnerView
          className={props.className}
          isCurrentMatch={props.isCurrentMatch}
          winner={props.match.winner}
        />
      )}
    </Fragment>
  );
};
