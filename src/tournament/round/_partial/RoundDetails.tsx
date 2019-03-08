import React, { useEffect } from "react";
import { Observer } from "mobx-react";
import "./RoundDetails.scss";
import classNames from "classnames";
import Round from "../../../store/round/Round";
import Match from "../../../store/round/match/Match";
import { CSSTransition } from "react-transition-group";
import {
  getNormalizedSpeed,
  AnimationStateHook,
  useAnimationState,
  runOnPredicate,
} from "../../../util/index";
import RoundMatchListView from "./RoundMatchListView";
const inflect = require("i")();

/**
 * Properties of the round view React component.
 */
interface RoundViewProps {
  /** CSS class */
  className: string;
  /** The ID of the current match. */
  matchId: string;
  /** The details of the current round. */
  round: Round;
  /** Whether to show the round details or not. */
  show: boolean;
  /** Action to call when the view has finished showing the round. */
  onRoundMatchComplete: () => void;
}

/**
 * React component for the round view.
 */
export default (props: RoundViewProps): JSX.Element => {
  const [currentState, updateState]: AnimationStateHook = useAnimationState();
  const currentMatchIndex: number = props.round.matches.findIndex(
    (match: Match): boolean => match.id === props.matchId,
  );

  useEffect(runOnPredicate(currentState === 0, updateState));
  useEffect(runOnPredicate(currentState === 2, props.onRoundMatchComplete), [
    currentState,
  ]);

  return (
    <Observer>
      {() => (
        <CSSTransition
          in={currentState > 0 && currentMatchIndex !== -1 && props.show}
          timeout={getNormalizedSpeed(500)}
          classNames={{
            enter: "",
            enterActive: `${props.className}--entering`,
            enterDone: `${props.className}--entered`,
            exit: "",
            exitActive: `${props.className}--exiting`,
            exitDone: `${props.className}--exited`,
          }}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <div
            className={classNames(props.className)}
            style={{
              transition: `opacity ${getNormalizedSpeed(500)}ms ease-in-out`,
            }}
          >
            <h2>{inflect.titleize(props.round.id)}</h2>
            <RoundMatchListView
              className={props.className}
              round={props.round}
              matchId={props.matchId}
              onListComplete={updateState}
            />
          </div>
        </CSSTransition>
      )}
    </Observer>
  );
};
