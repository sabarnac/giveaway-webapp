import React, { Component } from "react";
import { RouteComponentProps, Redirect } from "react-router";
import TournamentView from "./tournament/TournamentView";
import { observer } from "mobx-react";
import Tournament from "./store/Tournament";
import Round from "./store/round/Round";

interface AppRouterProps {
  tournament: Tournament;
}

interface AppRouterState {
  redirected: boolean;
}

@observer
class AppRouter extends Component<
  AppRouterProps & RouteComponentProps,
  AppRouterState
> {
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

  public render = (): JSX.Element => {
    const params: URLSearchParams = new URLSearchParams(
      this.props.location.search
    );
    return params.has("roundId") && params.has("matchId")
      ? this.getApplicationComponent(params)
      : params.has("roundId")
      ? this.getPartialRouteRedirect(params)
      : this.getUnknownRouteRedirect();
  };
}

export default AppRouter;
