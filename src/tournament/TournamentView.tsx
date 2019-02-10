import React, { Component, Fragment } from "react";
import { observer } from "mobx-react";
import "./TournamentView.scss";
import classNames from "classnames";
import Tournament from "../store/Tournament";
import DevTools from "mobx-react-devtools";
import { isDevEnvironment } from "../util";
import RoundView from "./round/RoundView";
import Round from "../store/round/Round";

interface TournamentViewProps {
  roundId: string;
  matchId: string;
  tournament: Tournament;
}

@observer
class TournamentView extends Component<TournamentViewProps> {
  private getMobxDevTools = (): JSX.Element | null =>
    isDevEnvironment() ? <DevTools /> : null;

  private getCurrentRoundDetails = (): Round =>
    this.props.tournament.rounds.find(
      (round: Round): boolean => round.id === this.props.roundId
    ) as Round;

  private getCurrentRound = (): JSX.Element => (
    <RoundView
      round={this.getCurrentRoundDetails()}
      matchId={this.props.matchId}
    />
  );

  public render = (): JSX.Element => (
    <Fragment>
      <div className={classNames("tournament")}>{this.getCurrentRound()}</div>
      {this.getMobxDevTools()}
    </Fragment>
  );
}

export default TournamentView;
