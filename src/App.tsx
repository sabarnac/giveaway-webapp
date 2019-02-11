import React, { Component } from "react";
import {
  Switch,
  Route,
  RouteComponentProps,
  Redirect,
  withRouter
} from "react-router";
import { observer } from "mobx-react";
import Tournament from "./store/Tournament";
import Round from "./store/round/Round";
import TournamentView from "./tournament/TournamentView";

interface AppProps {
  tournament: Tournament;
}

interface AppRouteProps {
  roundId?: string;
  matchId?: string;
  firstRoundId?: string;
  firstMatchId: string;
}

class AppRedirect extends Component<AppRouteProps> {
  private getPartialRouteRedirect = (): JSX.Element => {
    return (
      <Redirect
        to={`/round/${this.props.roundId}/match/${this.props.firstMatchId}`}
      />
    );
  };

  private getUnknownRouteRedirect = (): JSX.Element => {
    return (
      <Redirect
        to={`/round/${this.props.firstRoundId}/match/${
          this.props.firstMatchId
        }`}
      />
    );
  };

  public render = (): JSX.Element =>
    this.props.roundId
      ? this.getPartialRouteRedirect()
      : this.getUnknownRouteRedirect();
}

@observer
class App extends Component<AppProps & RouteComponentProps<AppRouteProps>> {
  private getParams = (
    routeProps: RouteComponentProps<AppRouteProps>
  ): AppRouteProps => routeProps.match.params;

  private getApplicationRoute = (): JSX.Element => (
    <Route
      exact
      path="/round/:roundId/match/:matchId"
      render={this.getApplication}
    />
  );

  private getApplication = (
    props: RouteComponentProps<AppRouteProps>
  ): JSX.Element => (
    <TournamentView
      tournament={this.props.tournament}
      roundId={this.getParams(props).roundId as string}
      matchId={this.getParams(props).matchId as string}
    />
  );

  private getPartialRoute = (): JSX.Element => (
    <Route exact path="/round/:roundId" render={this.getPartialAppRedirect} />
  );

  private getPartialAppRedirect = (
    props: RouteComponentProps<AppRouteProps>
  ): JSX.Element =>
    this.getCurrentRoundDetails(this.getParams(props).roundId as string) ? (
      <AppRedirect
        roundId={this.getParams(props).roundId as string}
        firstMatchId={this.getFirstMatchIdOfCurrentRound(this.getParams(props)
          .roundId as string)}
      />
    ) : (
      this.getUnknownAppRedirect()
    );

  private getUnknownRoute = (): JSX.Element => (
    <Route exact path="*" render={this.getUnknownAppRedirect} />
  );

  private getUnknownAppRedirect = (): JSX.Element => (
    <AppRedirect
      roundId={this.getFirstRoundId()}
      firstMatchId={this.getFirstMatchIdOfCurrentRound(this.getFirstRoundId())}
    />
  );

  private getFirstRoundId = (): string => this.props.tournament.firstRound.id;

  private getIsCurrentRoundFilter = (
    roundId: string
  ): ((round: Round) => boolean) => (round: Round): boolean =>
    round.id === roundId;

  private getCurrentRoundDetails = (roundId: string): Round =>
    this.props.tournament.rounds.find(
      this.getIsCurrentRoundFilter(roundId)
    ) as Round;

  private getFirstMatchIdOfCurrentRound = (roundId: string): string =>
    this.getCurrentRoundDetails(roundId).firstMatch.id;

  public render = (): JSX.Element => (
    <Switch>
      {this.getApplicationRoute()}
      {this.getPartialRoute()}
      {this.getUnknownRoute()}
    </Switch>
  );
}

export default withRouter(App);
