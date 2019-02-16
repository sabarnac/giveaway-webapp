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
import { isInRange } from "../util/index";
import { CSSTransition } from "react-transition-group";
import WinnerOverlay from "./winner-overlay/WinnerOverlay";
import LoserOverlay from "./loser-overlay/LoserOverlay";

interface TournamentViewProps {
  roundId: string;
  matchId: string;
  tournament: Tournament;
}

interface TournamentViewState {
  currentState: number;
  loserOverlayShown: boolean;
}

@observer
class TournamentView extends Component<
  TournamentViewProps,
  TournamentViewState
> {
  private _isMounted: boolean = false;

  private goToNextState = (): void =>
    this._isMounted
      ? this.setState({
          ...this.state,
          currentState: this.state.currentState + 1
        })
      : undefined;

  private toggleLoserOverlayShown = (): void =>
    this._isMounted
      ? this.setState({
          ...this.state,
          loserOverlayShown: !this.state.loserOverlayShown
        })
      : undefined;

  private getMobxDevTools = (): JSX.Element | null =>
    isDevEnvironment() ? <DevTools /> : null;

  private isCurrentRound = (round: Round): boolean =>
    round.id === this.props.roundId;

  private getCurrentRoundDetails = (): Round =>
    this.props.tournament.rounds.find(this.isCurrentRound) as Round;

  private getCurrentRoundIndex = (): number =>
    this.props.tournament.rounds.findIndex(this.isCurrentRound);

  private isLastRound = (): boolean =>
    this.props.tournament.lastRound.id === this.props.roundId;

  private getCurrentRound = (): JSX.Element => (
    <RoundView
      key={this.props.roundId}
      round={this.getCurrentRoundDetails()}
      matchId={this.props.matchId}
      onMatchComplete={this.goToNextState}
    />
  );

  private getTournamentDetails = (): JSX.Element => (
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
      <div className={classNames("tournament")}>{this.getCurrentRound()}</div>
    </CSSTransition>
  );

  private getFirstRoundRedirect = (): JSX.Element | null =>
    this.getCurrentRoundIndex() === -1 ? (
      <Redirect to={`/round/${this.props.tournament.firstRound.id}`} />
    ) : null;

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

  private getNextRoundRedirect = (): JSX.Element | null =>
    this.shouldAddNextRoundRedirect() ? (
      <Redirect
        to={`/round/${
          this.props.tournament.rounds[this.state.currentState / 2].id
        }`}
      />
    ) : null;

  private shouldShowWinnerOverlay = (): boolean =>
    this.state.currentState >= (this.getCurrentRoundIndex() + 1) * 2 &&
    this.isLastRound();

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

  private getLoserOverlay = (): JSX.Element | null =>
    this.shouldShowLoserOverlay() && this.getCurrentRoundIndex() !== -1 ? (
      <LoserOverlay
        losers={this.getCurrentRoundDetails().losers}
        onOverlayComplete={() => this.toggleLoserOverlayShown()}
      />
    ) : null;

  public componentWillMount = (): void => {
    this.setState({
      loserOverlayShown: false,
      currentState:
        this.getCurrentRoundIndex() === -1 ? 0 : this.getCurrentRoundIndex() * 2
    });
  };

  public componentDidMount = (): void => {
    this._isMounted = true;
    this.goToNextState();
  };

  public componentDidUpdate = (prevProps: TournamentViewProps): void => {
    if (this.props.roundId !== prevProps.roundId) {
      this.setState({
        ...this.state,
        currentState: this.getCurrentRoundIndex() * 2 + 1
      });
    }
  };

  public componentWillUnmount = (): void => {
    this._isMounted = false;
  };

  public render = (): JSX.Element => {
    return (
      <Fragment key={`round-${this.getCurrentRoundIndex()}`}>
        {this.getTournamentDetails()}
        {this.getFirstRoundRedirect()}
        {this.getNextRoundRedirect()}
        {this.getLoserOverlay()}
        {this.getWinnerOverlay()}
        {this.getMobxDevTools()}
      </Fragment>
    );
  };
}

export default TournamentView;
