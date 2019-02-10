import React, { Component } from "react";
import { observer } from "mobx-react";
import "./RoundView.scss";
import classNames from "classnames";
import Round from "../../store/round/Round";
import Match from "../../store/round/match/Match";
import MatchView from "./match/MatchView";

interface RoundViewProps {
  matchId: string;
  round: Round;
}

@observer
class RoundView extends Component<RoundViewProps> {
  private getMatchList = (): JSX.Element => {
    return <div className={classNames("round__list")}>{this.getMatches()}</div>;
  };

  private getCurrentMatchIndex = (): number =>
    this.props.round.matches.findIndex(
      (match: Match): boolean => match.id === this.props.matchId
    );

  private getMatches = (): JSX.Element[] => {
    const currentMatchIndex: number = this.getCurrentMatchIndex();

    return this.props.round.matches
      .filter(
        (match: Match, index: number): boolean => index <= currentMatchIndex
      )
      .map(
        (match: Match): JSX.Element => (
          <MatchView
            key={match.id}
            match={match}
            isCurrentMatch={match.id === this.props.matchId}
          />
        )
      );
  };

  public render = (): JSX.Element => {
    return <div className={classNames("round")}>{this.getMatchList()}</div>;
  };
}

export default RoundView;
