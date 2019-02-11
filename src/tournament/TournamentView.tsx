import React, { Component, Fragment } from "react";
import { observer } from "mobx-react";
import "./TournamentView.scss";
import classNames from "classnames";
import Tournament from "../store/Tournament";
import DevTools from "mobx-react-devtools";
import { isDevEnvironment } from "../util";
import RoundView from "./round/RoundView";
import Round from "../store/round/Round";
import { Redirect } from "react-router";

interface TournamentViewProps {
  roundId: string;
  matchId: string;
  tournament: Tournament;
}

@observer
class TournamentView extends Component<TournamentViewProps> {
  private getMobxDevTools = (): JSX.Element | null =>
    isDevEnvironment() ? <DevTools /> : null;

  private isCurrentRound = (round: Round): boolean =>
    round.id === this.props.roundId;

  private getCurrentRoundDetails = (): Round =>
    this.props.tournament.rounds.find(this.isCurrentRound) as Round;

  private getCurrentRound = (): JSX.Element => (
    <RoundView
      key={this.props.roundId}
      round={this.getCurrentRoundDetails()}
      matchId={this.props.matchId}
    />
  );

  public render = (): JSX.Element =>
    this.getCurrentRoundDetails() !== null ? (
      <Fragment>
        <div className={classNames("tournament")}>{this.getCurrentRound()}</div>
        {this.getMobxDevTools()}
      </Fragment>
    ) : (
      <Redirect
        to={`/round/${this.props.tournament.firstRound.id}/match/${
          this.props.tournament.firstRound.firstMatch.id
        }`}
      />
    );
}

export default TournamentView;
