import React, { Component } from "react";
import { observer } from "mobx-react";
import "./RoundView.scss";
import classNames from "classnames";
import Round from "../../store/round/Round";
import Match from "../../store/round/match/Match";
import MatchView from "./match/MatchView";
import { Redirect } from "react-router";

interface RoundViewProps {
  matchId: string;
  round: Round;
}

@observer
class RoundView extends Component<RoundViewProps> {
  private getMatchList = (): JSX.Element => {
    return <div className={classNames("round__list")}>{this.getMatches()}</div>;
  };

  private isCurrentMatch = (match: Match): boolean =>
    match.id === this.props.matchId;

  private getCurrentMatchIndex = (): number =>
    this.props.round.matches.findIndex(this.isCurrentMatch);

  private isNotFutureMatch = (_: Match, index: number): boolean =>
    index <= this.getCurrentMatchIndex();

  private getMatchView = (match: Match): JSX.Element => (
    <MatchView
      key={match.id}
      match={match}
      isCurrentMatch={this.isCurrentMatch(match)}
    />
  );

  private getMatches = (): JSX.Element[] =>
    this.props.round.matches
      .filter(this.isNotFutureMatch)
      .map(this.getMatchView);

  public render = (): JSX.Element =>
    this.getCurrentMatchIndex() !== -1 ? (
      <div className={classNames("round")}>{this.getMatchList()}</div>
    ) : (
      <Redirect
        to={`/round/${this.props.round.id}/match/${
          this.props.round.firstMatch.id
        }`}
      />
    );
}

export default RoundView;
