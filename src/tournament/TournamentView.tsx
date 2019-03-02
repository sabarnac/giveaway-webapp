import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "./TournamentView.scss";
import classNames from "classnames";
import Tournament from "../store/Tournament";
import DevTools from "mobx-react-devtools";
import { isDevEnvironment, getMatchRedirect } from "../util";
import RoundView from "./round/RoundView";
import Round from "../store/round/Round";
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
  /** @ignore The application config. */
  config?: Config;
  /** The ID of the current round. */
  roundId: string;
  /** The ID of the current match. */
  matchId: string;
  /** The details of the tournament. */
  tournament: Tournament;
}

/**
 * State of the tournament view React component.
 */
interface TournamentViewState {
  /** The current state of the tournament component (for animations). */
  currentState: number;
  /** Whether the loser overlay has been shown for the current round. */
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
  /** Whether the component is mounted or not. */
  private _isMounted: boolean = false;

  /**
   * Moves the component to the next animation state.
   */
  private _goToNextState = (): void =>
    this._isMounted
      ? this.setState({
          ...this.state,
          currentState: this.state.currentState + 1,
        })
      : undefined;

  /**
   * Toggles whether the loser overlay was shown or not.
   */
  private _toggleLoserOverlayShown = (): void =>
    this._isMounted
      ? this.setState({
          ...this.state,
          loserOverlayShown: !this.state.loserOverlayShown,
        })
      : undefined;

  /**
   * Returns whether the given round is the current round.
   * @param {Round} round The round to check.
   * @return {boolean} Whether the given round is the current round.
   */
  private _isCurrentRound = (round: Round): boolean =>
    round.id === this.props.roundId;

  /**
   * Returns the current round details.
   * @return {Round} The current round details.
   */
  private _getCurrentRoundDetails = (): Round =>
    this.props.tournament.rounds.find(this._isCurrentRound) as Round;

  /**
   * Returns the index of current round in the tournament.
   * @return {Round} The index of the current round.
   */
  private _getCurrentRoundIndex = (): number =>
    this.props.tournament.rounds.findIndex(this._isCurrentRound);

  /**
   * Returns whether it is currently the last round.
   * @return {boolean} Whether it is currently the last round.
   */
  private _isLastRound = (): boolean =>
    this.props.tournament.lastRound.id === this.props.roundId;

  /**
   * Returns the view for the current round.
   * @return {JSX.Element} The current round view.
   */
  private _getCurrentRound = (): JSX.Element => (
    <RoundView
      key={`${this.props.roundId}-${this.props.matchId}`}
      round={this._getCurrentRoundDetails()}
      matchId={this.props.matchId}
      onRoundComplete={this._goToNextState}
    />
  );

  /**
   * Returns the current round view of the tournament, wrapped in an animation transition component.
   * @return {JSX.Element} The current round view.
   */
  private _getCurrentRoundView = (): JSX.Element => (
    <CSSTransition
      in={this.state.currentState > 0}
      timeout={500}
      classNames={{
        enter: "",
        enterActive: "round--entering",
        enterDone: "round--entered",
        exit: "",
        exitActive: "round--exiting",
        exitDone: "round--exited",
      }}
      mountOnEnter={true}
      unmountOnExit={true}
    >
      {this._getCurrentRound()}
    </CSSTransition>
  );

  /**
   * Returns the redirect for the first round if required.
   * @return {JSX.Element} The redirect, or null if it is not required.
   */
  private _getFirstRoundRedirect = (): JSX.Element | null =>
    this._getCurrentRoundIndex() === -1
      ? getMatchRedirect(
          this.props.tournament.firstRound.id,
          this.props.tournament.firstRound.firstMatch.id,
        )
      : null;

  /**
   * Returns whether the next round redirect should be added to the view.
   * @return {boolean} Whether the redirect should be shown.
   */
  private _shouldAddNextRoundRedirect = (): boolean =>
    isInRange(
      this.state.currentState,
      0,
      (this.props.tournament.rounds.length - 1) * 2 + 1,
    ) &&
    this.state.loserOverlayShown &&
    this.state.currentState % 2 === 0 &&
    this.props.tournament.rounds[this.state.currentState / 2].id !==
      this.props.roundId;

  /**
   * Returns the redirect for the next round if required.
   * @return {JSX.Element} The redirect, or null if it is not required.
   */
  private _getNextRoundRedirect = (): JSX.Element | null =>
    this._shouldAddNextRoundRedirect()
      ? getMatchRedirect(
          this.props.tournament.rounds[this.state.currentState / 2].id,
          this.props.tournament.rounds[this.state.currentState / 2].firstMatch
            .id,
        )
      : null;

  /**
   * Returns whether the winner overlay should be shown.
   * @return {boolean} Whether the overlay should be shown.
   */
  private _shouldShowWinnerOverlay = (): boolean =>
    this.state.currentState >= (this._getCurrentRoundIndex() + 1) * 2 &&
    this._isLastRound();

  /**
   * Returns the winner overlay, wrapped in an animation transition component.
   * @return {JSX.Element} The winner overlay.
   */
  private _getWinnerOverlay = (): JSX.Element => (
    <CSSTransition
      in={this._shouldShowWinnerOverlay()}
      timeout={500}
      classNames={{
        enter: "",
        enterActive: "round--entering",
        enterDone: "round--entered",
        exit: "",
        exitActive: "round--exiting",
        exitDone: "round--exited",
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
  private _shouldShowLoserOverlay = (): boolean =>
    isInRange(
      this.state.currentState,
      0,
      (this.props.tournament.rounds.length - 1) * 2 + 1,
    ) &&
    !this.state.loserOverlayShown &&
    this.state.currentState % 2 === 0 &&
    this.props.tournament.rounds[this.state.currentState / 2].id !==
      this.props.roundId &&
    !this._isLastRound();

  /**
   * Returns the loser overlay if it is supposed to be shown.
   * @return {JSX.Element | null} The loser overlay, or null if it should not be shown.
   */
  private _getLoserOverlay = (): JSX.Element | null =>
    this._shouldShowLoserOverlay() && this._getCurrentRoundIndex() !== -1 ? (
      <LoserOverlay
        losers={this._getCurrentRoundDetails().losers}
        onOverlayComplete={() => this._toggleLoserOverlayShown()}
      />
    ) : null;

  /**
   * Lifecycle method that runs before component mount.
   */
  public componentWillMount = (): void => {
    this.setState({
      loserOverlayShown: false,
      currentState:
        this._getCurrentRoundIndex() === -1
          ? 0
          : this._getCurrentRoundIndex() * 2,
    });
  };

  /**
   * Lifecycle method that runs after component mount.
   */
  public componentDidMount = (): void => {
    this._isMounted = true;
    this._goToNextState();
  };

  /**
   * Lifecycle method that runs after component update.
   */
  public componentDidUpdate = (prevProps: TournamentViewProps): void => {
    if (this.props.roundId !== prevProps.roundId) {
      this.setState({
        ...this.state,
        currentState: this._getCurrentRoundIndex() * 2 + 1,
      });
    } else if (this.props.matchId !== prevProps.matchId) {
      this.setState({
        ...this.state,
        currentState: this._getCurrentRoundIndex() * 2 + 1,
        loserOverlayShown: false,
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
        key={`round-${this._getCurrentRoundIndex()}`}
        className={classNames("tournament")}
      >
        <h1>{this.props.config!.name} Tournament</h1>
        {this._getCurrentRoundView()}
        {this._getFirstRoundRedirect()}
        {this._getNextRoundRedirect()}
        {this._getLoserOverlay()}
        {this._getWinnerOverlay()}
        <SpeedControl />
        {isDevEnvironment() ? <DevTools /> : null}
      </div>
    );
  };
}
