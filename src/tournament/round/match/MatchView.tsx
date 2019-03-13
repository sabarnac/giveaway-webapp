import React, { useEffect, useRef, MutableRefObject } from "react";
import { Observer } from "mobx-react";
import "./MatchView.scss";
import classNames from "classnames";
import Match from "../../../store/round/match/Match";
import {
  getNormalizedSpeed,
  runOnDelay,
  AnimationStateHook,
  useAnimationState,
  runOnPredicate,
} from "../../../util/index";
import { CSSTransition } from "react-transition-group";
import MatchFinalEntry from "./_partial/MatchFinalEntry";
import MatchParticipantList from "./_partial/MatchParticipantList";
import MatchOverlay from "./overlay/MatchOverlay";

/**
 * Properties of the match view React component.
 */
interface MatchViewProps {
  /** Whether it is the currently ongoing match. */
  isCurrentMatch: boolean;
  /** The details of the current match. */
  match: Match;
  /** Action to call when the view has finished showing the match. */
  onMatchComplete: () => void;
}

/**
 * React component for the match view.
 */
export default (props: MatchViewProps): JSX.Element | null => {
  if (props.match === undefined) {
    return null;
  }

  const className: string = "match";
  const isActualMatch: boolean = props.match.participants.length > 1;

  const [
    currentState,
    updateState,
    updateStateDelay,
    setState,
  ]: AnimationStateHook = useAnimationState(props.isCurrentMatch ? 0 : 3);

  const onMatchComplete = () => {
    setState(3);
    props.isCurrentMatch
      ? runOnDelay(() => {
          props.isCurrentMatch ? props.onMatchComplete() : undefined;
        }, getNormalizedSpeed(1000))
      : undefined;
  };

  useEffect(runOnPredicate(currentState === 0, updateState));
  useEffect(
    runOnPredicate(
      currentState === 1 && isActualMatch && props.isCurrentMatch,
      () => updateStateDelay(getNormalizedSpeed(200)),
    ),
  );
  useEffect(
    runOnPredicate(currentState === 1 && !isActualMatch, onMatchComplete),
  );

  const matchRef: MutableRefObject<HTMLDivElement> = useRef(null as any);

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
          onEntering={() =>
            matchRef.current.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            })
          }
          onExited={props.onMatchComplete}
        >
          <div
            ref={matchRef}
            className={classNames(className, {
              [`${className}--completed`]: !props.isCurrentMatch,
            })}
            style={{
              transition: `opacity ${getNormalizedSpeed(500)}ms ease-in-out`,
            }}
          >
            <MatchParticipantList className={className} match={props.match} />
            <MatchFinalEntry
              className={className}
              isCurrentMatch={props.isCurrentMatch && currentState < 3}
              isActualMatch={isActualMatch}
              match={props.match}
            />
            <MatchOverlay
              currentMatch={props.match}
              show={currentState === 2 && props.isCurrentMatch}
              onOverlayComplete={onMatchComplete}
            />
          </div>
        </CSSTransition>
      )}
    </Observer>
  );
};
