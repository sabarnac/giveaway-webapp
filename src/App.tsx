import React, { Component } from "react";
import { Switch, Route, RouteComponentProps, Redirect } from "react-router";
import { observer } from "mobx-react";
import Tournament from "./store/Tournament";
import Round from "./store/round/Round";
import TournamentView from "./tournament/TournamentView";

interface AppProps {
  tournament: Tournament;
}

interface AppRouterState {
  redirected: boolean;
}

@observer
class App extends Component<AppProps, AppRouterState> {
  private getRoute = (): JSX.Element => (
    <Route exact path="/" render={this.getApplication} />
  );

  private getApplication = (props: RouteComponentProps<any>): JSX.Element => {
    const params: URLSearchParams = new URLSearchParams(props.location.search);
    return params.has("roundId") && params.has("matchId")
      ? this.getApplicationComponent(params)
      : params.has("roundId")
      ? this.getPartialRouteRedirect(params)
      : this.getUnknownRouteRedirect();
  };

  private getApplicationComponent = (params: URLSearchParams): JSX.Element => (
    <TournamentView
      roundId={params.get("roundId") as string}
      matchId={params.get("matchId") as string}
      tournament={this.props.tournament}
    />
  );

  private getPartialRouteRedirect = (params: URLSearchParams): JSX.Element => {
    this.setState({ redirected: true });
    return (
      <Redirect
        to={`/?roundId=${params.get(
          "roundId"
        )}&matchId=${this.getFirstMatchIdOfCurrentRound(params.get(
          "roundId"
        ) as string)}`}
      />
    );
  };

  private getUnknownRouteRedirect = (): JSX.Element => {
    this.setState({ redirected: true });
    return (
      <Redirect
        to={`/?roundId=${this.getFirstRoundId()}&matchId=${this.getFirstMatchIdOfCurrentRound(
          this.getFirstRoundId()
        )}`}
      />
    );
  };

  private getFirstRoundId = (): string => this.props.tournament.firstRound.id;

  private getFirstMatchIdOfCurrentRound = (roundId: string): string =>
    (this.props.tournament.rounds.find(
      (round: Round): boolean => round.id === roundId
    ) as Round).firstMatch.id;

  public componentWillMount = (): void => this.setState({ redirected: false });

  public render = (): JSX.Element => <Switch>{this.getRoute()}</Switch>;
}

export default App;
