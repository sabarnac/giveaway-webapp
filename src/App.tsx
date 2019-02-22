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

/**
 * Properties of the Application React component.
 */
interface AppProps {
  /** The details of the tournament. */
  tournament: Tournament;
}

/**
 * Route related properties of the Application React component.
 */
interface AppRouteProps {
  /** The ID of the current round. */
  roundId?: string;
  /** The ID of the current match. */
  matchId?: string;
  /** The ID of the first round of the tournament. */
  firstRoundId?: string;
  /** The ID of the first match of the tournament. */
  firstMatchId: string;
}

/**
 * React component that returns a redirect depending upon what route properties are present.
 */
class AppRedirect extends Component<AppRouteProps> {
  /**
   * Returns the redirect when only a partial route is provided.
   * @return {JSX.Element} The partial route redirect.
   */
  private getPartialRouteRedirect = (): JSX.Element => (
    <Redirect
      to={`/round/${this.props.roundId}/match/${this.props.firstMatchId}`}
    />
  );

  /**
   * Returns the redirect when only a unknown route is provided.
   * @return {JSX.Element} The unknown route redirect.
   */
  private getUnknownRouteRedirect = (): JSX.Element => (
    <Redirect
      to={`/round/${this.props.firstRoundId}/match/${this.props.firstMatchId}`}
    />
  );

  /**
   * Renders the component.
   * @return {JSX.Element} The rendered component.
   */
  public render = (): JSX.Element =>
    this.props.roundId
      ? this.getPartialRouteRedirect()
      : this.getUnknownRouteRedirect();
}

/**
 * React component for the application.
 */
@observer
class App extends Component<AppProps & RouteComponentProps<AppRouteProps>> {
  /**
   * Returns the route params.
   * @return {AppRouteProps} The route params.
   */
  private getParams = (
    routeProps: RouteComponentProps<AppRouteProps>
  ): AppRouteProps => routeProps.match.params;

  /**
   * Returns the route for the application.
   * @return {JSX.Element} The application route.
   */
  private getApplicationRoute = (): JSX.Element => (
    <Route
      exact
      path="/round/:roundId/match/:matchId"
      render={this.getApplication}
    />
  );

  /**
   * Returns the main tournament.
   * @return {JSX.Element} The main tournament.
   */
  private getApplication = (
    props: RouteComponentProps<AppRouteProps>
  ): JSX.Element => (
    <TournamentView
      tournament={this.props.tournament}
      roundId={this.getParams(props).roundId as string}
      matchId={this.getParams(props).matchId as string}
    />
  );

  /**
   * Returns the route for a partial redirect.
   * @return {JSX.Element} The partial redirect route.
   */
  private getPartialRoute = (): JSX.Element => (
    <Route exact path="/round/:roundId" render={this.getPartialAppRedirect} />
  );

  /**
   * Returns the application redirect for the partial redirect.
   * @return {JSX.Element} The application redirect.
   */
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

  /**
   * Returns the route for an unknown redirect.
   * @return {JSX.Element} The unknown redirect route.
   */
  private getUnknownRoute = (): JSX.Element => (
    <Route exact path="*" render={this.getUnknownAppRedirect} />
  );

  /**
   * Returns the application redirect for the unknown redirect.
   * @return {JSX.Element} The application redirect.
   */
  private getUnknownAppRedirect = (): JSX.Element => (
    <AppRedirect
      roundId={this.getFirstRoundId()}
      firstMatchId={this.getFirstMatchIdOfCurrentRound(this.getFirstRoundId())}
    />
  );

  /**
   * Returns the ID of the first round.
   * @return {string} The first round ID.
   */
  private getFirstRoundId = (): string => this.props.tournament.firstRound.id;

  /**
   * Returns a filter for finding the current round.
   * @param {string} roundId The ID of the current round.
   * @return {(round: Round) => boolean} The filter function.
   */
  private getIsCurrentRoundFilter = (
    roundId: string
  ): ((round: Round) => boolean) => (round: Round): boolean =>
    round.id === roundId;

  /**
   * Returns the details of the round of the given ID.
   * @param {string} roundId The ID of the round.
   * @return {Round} The round details.
   */
  private getCurrentRoundDetails = (roundId: string): Round =>
    this.props.tournament.rounds.find(
      this.getIsCurrentRoundFilter(roundId)
    ) as Round;

  /**
   * Returns the ID of the first match of the given round.
   * @param {string} roundId The ID of the round.
   * @return {string} The first match ID.
   */
  private getFirstMatchIdOfCurrentRound = (roundId: string): string =>
    this.getCurrentRoundDetails(roundId).firstMatch.id;

  /**
   * Renders the component.
   * @return {JSX.Element} The rendered component.
   */
  public render = (): JSX.Element => (
    <Switch>
      {this.getApplicationRoute()}
      {this.getPartialRoute()}
      {this.getUnknownRoute()}
    </Switch>
  );
}

export default withRouter(App);
