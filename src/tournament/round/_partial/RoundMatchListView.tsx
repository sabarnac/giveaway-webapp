import React, { useEffect } from "react";
import { Observer } from "mobx-react";
import "./RoundMatchListView.scss";
import classNames from "classnames";
import Round from "../../../store/round/Round";
import Match from "../../../store/round/match/Match";
import MatchView from "../match/MatchView";
import {
  useAnimationState,
  AnimationStateHook,
  runOnPredicate,
} from "../../../util";

/**
 * Properties of the round view React component.
 */
interface RoundMatchListViewProps {
  /** CSS class */
  className: string;
  /** The ID of the current match. */
  matchId: string;
  /** The details of the current round. */
  round: Round;
  /** Action to call when the view has finished showing the round. */
  onListComplete: () => void;
}

/**
 * React component for the round view.
 */
export default (props: RoundMatchListViewProps): JSX.Element => {
  const [currentState, updateState]: AnimationStateHook = useAnimationState();
  const currentMatchIndex: number = props.round.matches.findIndex(
    (match: Match): boolean => match.id === props.matchId,
  );

  useEffect(runOnPredicate(currentState === 0, updateState));
  useEffect(runOnPredicate(currentState === 2, props.onListComplete), [
    currentState,
  ]);

  return (
    <Observer>
      {() => (
        <div className={classNames(`${props.className}__list`)}>
          {props.round.matches
            .filter(
              (_: Match, index: number): boolean => index <= currentMatchIndex,
            )
            .map(
              (match: Match): JSX.Element => (
                <MatchView
                  key={match.id}
                  match={match}
                  isCurrentMatch={match.id === props.matchId}
                  onMatchComplete={updateState}
                />
              ),
            )}
        </div>
      )}
    </Observer>
  );
};
