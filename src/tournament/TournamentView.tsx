import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "./TournamentView.scss";
import classNames from "classnames";
import Tournament from "../store/Tournament";
import DevTools from "mobx-react-devtools";
import { isDevEnvironment } from "../util";
import RoundView from "./round/RoundView";
import Round from "../store/round/Round";
import { Redirect } from "react-router";
import { isInRange } from "../util/index";
import { CSSTransition } from "react-transition-group";
import WinnerOverlay from "./winner-overlay/WinnerOverlay";
import LoserOverlay from "./loser-overlay/LoserOverlay";
import SpeedControl from "./speed/SpeedControl";
import Config from "../store/config/Config";

/**
 * Properties of the tournament view React component.
 */
interface TournamentViewProps {
  /**
   * @type {Config} The application config.
   */
  config?: Config;
  /**
   * @type {string} The ID of the current round.
   */
  roundId: string;
  /**
   * @type {string} The ID of the current match.
   */
  matchId: string;
  /**
   * @type {Tournamnent} The details of the tournament.
   */
  tournament: Tournament;
}

/**
 * State of the tournament view React component.
 */
interface TournamentViewState {
  /**
   * @type {number} The current state of the tournament component (for animations).
   */
  currentState: number;
  /**
   * @type {boolean} Whether the loser overlay has been shown for the current round.
   */
  loserOverlayShown: boolean;
}

/**
 * React component for the tournament view.
 */
@inject("config")
@observer
export default class TournamentView extends Component<
  TournamentViewProps,
  TournamentViewState
> {
  /**
   * @type {boolean} Whether the component is mounted or not.
   */
  private _isMounted: boolean = false;

  /**
   * Moves the component to the next animation state.
   */
  private goToNextState = (): void =>
    this._isMounted
      ? this.setState({
          ...this.state,
          currentState: this.state.currentState + 1
        })
      : undefined;

  /**
   * Toggles whether the loser overlay was shown or not.
   */
  private toggleLoserOverlayShown = (): void =>
    this._isMounted
      ? this.setState({
          ...this.state,
          loserOverlayShown: !this.state.loserOverlayShown
        })
      : undefined;

  /**
   * Returns the devtools for MobX, if it is the dev environment.
   * @return {JSX.Element | null} The MobX devtools, or null if it is not the dev environment.
   */
  private getMobxDevTools = (): JSX.Element | null =>
    isDevEnvironment() ? <DevTools /> : null;

  /**
   * Returns the animation speed controller.
   * @return {JSX.Element} The animation speed controller.
   */
  private getSpeedControl = (): JSX.Element => <SpeedControl />;

  /**
   * Returns whether the given round is the current round.
   * @param {Round} round The round to check.
   * @return {boolean} Whether the given round is the current round.
   */
  private isCurrentRound = (round: Round): boolean =>
    round.id === this.props.roundId;

  /**
   * Returns the current round details.
   * @return {Round} The current round details.
   */
  private getCurrentRoundDetails = (): Round =>
    this.props.tournament.rounds.find(this.isCurrentRound) as Round;

  /**
   * Returns the index of current round in the tournament.
   * @return {Round} The index of the current round.
   */
  private getCurrentRoundIndex = (): number =>
    this.props.tournament.rounds.findIndex(this.isCurrentRound);

  /**
   * Returns whether it is currently the last round.
   * @return {boolean} Whether it is currently the last round.
   */
  private isLastRound = (): boolean =>
    this.props.tournament.lastRound.id === this.props.roundId;

  /**
   * Returns the view for the current round.
   * @return {JSX.Element} The current round view.
   */
  private getCurrentRound = (): JSX.Element => (
    <RoundView
      key={this.props.roundId}
      round={this.getCurrentRoundDetails()}
      matchId={this.props.matchId}
      onRoundComplete={this.goToNextState}
    />
  );

  /**
   * Returns the current round view of the tournament, wrapped in an animation transition component.
   * @return {JSX.Element} The current round view.
   */
  private getCurrentRoundView = (): JSX.Element => (
    <CSSTransition
      in={this.state.currentState > 0}
      timeout={500}
      classNames={{
        enter: "",
        enterActive: "round--entering",
        enterDone: "round--entered",
        exit: "",
        exitActive: "round--exiting",
        exitDone: "round--exited"
      }}
      mountOnEnter={true}
      unmountOnExit={true}
    >
      {this.getCurrentRound()}
    </CSSTransition>
  );

  /**
   * Returns the redirect for the first round if required.
   * @return {JSX.Element} The redirect, or null if it is not required.
   */
  private getFirstRoundRedirect = (): JSX.Element | null =>
    this.getCurrentRoundIndex() === -1 ? (
      <Redirect to={`/round/${this.props.tournament.firstRound.id}`} />
    ) : null;

  /**
   * Returns whether the next round redirect should be added to the view.
   * @return {boolean} Whether the redirect should be shown.
   */
  private shouldAddNextRoundRedirect = (): boolean =>
    isInRange(
      this.state.currentState,
      0,
      (this.props.tournament.rounds.length - 1) * 2 + 1
    ) &&
    this.state.loserOverlayShown &&
    this.state.currentState % 2 === 0 &&
    this.props.tournament.rounds[this.state.currentState / 2].id !==
      this.props.roundId;

  /**
   * Returns the redirect for the next round if required.
   * @return {JSX.Element} The redirect, or null if it is not required.
   */
  private getNextRoundRedirect = (): JSX.Element | null =>
    this.shouldAddNextRoundRedirect() ? (
      <Redirect
        to={`/round/${
          this.props.tournament.rounds[this.state.currentState / 2].id
        }`}
      />
    ) : null;

  /**
   * Returns whether the winner overlay should be shown.
   * @return {boolean} Whether the overlay should be shown.
   */
  private shouldShowWinnerOverlay = (): boolean =>
    this.state.currentState >= (this.getCurrentRoundIndex() + 1) * 2 &&
    this.isLastRound();

  /**
   * Returns the winner overlay, wrapped in an animation transition component.
   * @return {JSX.Element} The winner overlay.
   */
  private getWinnerOverlay = (): JSX.Element => (
    <CSSTransition
      in={this.shouldShowWinnerOverlay()}
      timeout={500}
      classNames={{
        enter: "",
        enterActive: "round--entering",
        enterDone: "round--entered",
        exit: "",
        exitActive: "round--exiting",
        exitDone: "round--exited"
      }}
      mountOnEnter={true}
      unmountOnExit={true}
    >
      <WinnerOverlay winner={this.props.tournament.winner} />
    </CSSTransition>
  );

  /**
   * Returns whether the loser overlay should be shown.
   * @return {boolean} Whether the overlay should be shown.
   */
  private shouldShowLoserOverlay = (): boolean =>
    isInRange(
      this.state.currentState,
      0,
      (this.props.tournament.rounds.length - 1) * 2 + 1
    ) &&
    !this.state.loserOverlayShown &&
    this.state.currentState % 2 === 0 &&
    this.props.tournament.rounds[this.state.currentState / 2].id !==
      this.props.roundId &&
    !this.isLastRound();

  /**
   * Returns the loser overlay if it is supposed to be shown.
   * @return {JSX.Element | null} The loser overlay, or null if it should not be shown.
   */
  private getLoserOverlay = (): JSX.Element | null =>
    this.shouldShowLoserOverlay() && this.getCurrentRoundIndex() !== -1 ? (
      <LoserOverlay
        losers={this.getCurrentRoundDetails().losers}
        onOverlayComplete={() => this.toggleLoserOverlayShown()}
      />
    ) : null;

  /**
   * Lifecycle method that runs before component mount.
   */
  public componentWillMount = (): void => {
    this.setState({
      loserOverlayShown: false,
      currentState:
        this.getCurrentRoundIndex() === -1 ? 0 : this.getCurrentRoundIndex() * 2
    });
  };

  /**
   * Lifecycle method that runs after component mount.
   */
  public componentDidMount = (): void => {
    this._isMounted = true;
    this.goToNextState();
  };

  /**
   * Lifecycle method that runs after component update.
   */
  public componentDidUpdate = (prevProps: TournamentViewProps): void => {
    if (this.props.roundId !== prevProps.roundId) {
      this.setState({
        ...this.state,
        currentState: this.getCurrentRoundIndex() * 2 + 1
      });
    } else if (this.props.matchId !== prevProps.matchId) {
      this.setState({
        ...this.state,
        currentState: this.getCurrentRoundIndex() * 2 + 1,
        loserOverlayShown: false
      });
    }
  };

  /**
   * Lifecycle method that runs before component unmount.
   */
  public componentWillUnmount = (): void => {
    this._isMounted = false;
  };

  /**
   * Renders the component.
   * @return {JSX.Element} The rendered component.
   */
  public render = (): JSX.Element => {
    return (
      <div
        key={`round-${this.getCurrentRoundIndex()}`}
        className={classNames("tournament")}
      >
        <h1>{this.props.config!.name} Tournament</h1>
        {this.getCurrentRoundView()}
        {this.getFirstRoundRedirect()}
        {this.getNextRoundRedirect()}
        {this.getLoserOverlay()}
        {this.getWinnerOverlay()}
        {this.getSpeedControl()}
        {this.getMobxDevTools()}
      </div>
    );
  };
}
