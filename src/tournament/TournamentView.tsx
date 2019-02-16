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

interface TournamentViewProps {
  roundId: string;
  matchId: string;
  tournament: Tournament;
}

interface TournamentViewState {
  currentState: number;
}

@observer
class TournamentView extends Component<
  TournamentViewProps,
  TournamentViewState
> {
  private _isMounted: boolean = false;

  private goToNextState = (): void =>
    this._isMounted
      ? this.setState({ currentState: this.state.currentState + 1 })
      : undefined;

  private getMobxDevTools = (): JSX.Element | null =>
    isDevEnvironment() ? <DevTools /> : null;

  private isCurrentRound = (round: Round): boolean =>
    round.id === this.props.roundId;

  private getCurrentRoundDetails = (): Round =>
    this.props.tournament.rounds.find(this.isCurrentRound) as Round;

  private getCurrentRoundIndex = (): number =>
    this.props.tournament.rounds.findIndex(this.isCurrentRound);

  private getCurrentRound = (): JSX.Element => (
    <RoundView
      key={this.props.roundId}
      round={this.getCurrentRoundDetails()}
      matchId={this.props.matchId}
      onMatchComplete={this.goToNextState}
    />
  );

  public componentWillMount = (): void => {
    this.setState({
      currentState:
        this.getCurrentRoundIndex() === -1 ? 0 : this.getCurrentRoundIndex() * 2
    });
  };

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

  private getWinnerOverlay = (): JSX.Element => (
    <CSSTransition
      in={this.state.currentState >= (this.getCurrentRoundIndex() + 1) * 2}
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

  public componentDidMount = (): void => {
    this._isMounted = true;
    this.goToNextState();
  };

  public componentDidUpdate = (prevProps: TournamentViewProps): void => {
    if (this.props.roundId !== prevProps.roundId) {
      this.setState({ currentState: this.getCurrentRoundIndex() * 2 + 1 });
    }
  };

  public componentWillUnmount = (): void => {
    this._isMounted = false;
  };

  public render = (): JSX.Element => {
    return (
      <React.Fragment key={`round-${this.getCurrentRoundIndex()}`}>
        {this.getTournamentDetails()}
        {this.getFirstRoundRedirect()}
        {this.getNextRoundRedirect()}
        {this.getWinnerOverlay()}
        {this.getMobxDevTools()}
      </React.Fragment>
    );
  };
}

export default TournamentView;
