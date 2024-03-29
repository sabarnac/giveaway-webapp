import React from "react";
import { Observer } from "mobx-react";
import "./RoundMatchListView.scss";
import classNames from "classnames";
import Round from "../../../store/round/Round";
import Match from "../../../store/round/match/Match";
import MatchView from "../match/MatchView";

/**
 * Properties of the round match list view React component.
 */
export interface RoundMatchListViewProps {
  /** CSS class */
  className: string;
  /** The ID of the current match. */
  matchId: string;
  /** The details of the current round. */
  round: Round;
  /** Action to call when the current match is completed. */
  onCurrentMatchComplete: () => void;
}

/**
 * React component for the round match list view.
 */
export default (props: RoundMatchListViewProps): JSX.Element => {
  const currentMatchIndex: number = props.round.matches.findIndex(
    (match: Match): boolean => match.id === props.matchId,
  );

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
                  key={match.fullId}
                  match={match}
                  isCurrentMatch={match.id === props.matchId}
                  onMatchComplete={props.onCurrentMatchComplete}
                />
              ),
            )}
        </div>
      )}
    </Observer>
  );
};
