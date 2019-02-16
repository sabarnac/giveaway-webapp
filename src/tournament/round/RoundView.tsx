import React, { Component, Fragment } from "react";
import { observer, inject } from "mobx-react";
import "./RoundView.scss";
import classNames from "classnames";
import Round from "../../store/round/Round";
import Match from "../../store/round/match/Match";
import MatchView from "./match/MatchView";
import { Redirect } from "react-router";
import { CSSTransition } from "react-transition-group";
import { isInRange } from "../../util/index";
import Config from "../../store/config/Config";

interface RoundViewProps {
  config?: Config;
  matchId: string;
  round: Round;
  onMatchComplete: () => void;
}

interface RoundViewState {
  currentState: number;
}

@inject("config")
@observer
export default class RoundView extends Component<
  RoundViewProps,
  RoundViewState
> {
  private _isMounted: boolean = false;

  private goToNextState = (): void =>
    this._isMounted
      ? this.setState({ currentState: this.state.currentState + 1 })
      : undefined;

  private onMatchCompleteWithDelay = (): unknown =>
    setTimeout(this.props.onMatchComplete, 500 / this.props.config!.speed);

  private getMatchList = (): JSX.Element => (
    <div className={classNames("round__list")}>{this.getMatches()}</div>
  );

  private isCurrentMatch = (match: Match): boolean =>
    match.id === this.props.matchId;

  private getCurrentMatchIndex = (): number =>
    this.props.round.matches.findIndex(this.isCurrentMatch);

  private isNotFutureMatch = (_: Match, index: number): boolean =>
    index <= this.getCurrentMatchIndex();

  private getMatchView = (match: Match): JSX.Element => (
    <MatchView
      key={match.id}
      match={match}
      isCurrentMatch={this.isCurrentMatch(match)}
      onMatchComplete={this.goToNextState}
    />
  );

  private getMatches = (): JSX.Element[] =>
    this.props.round.matches
      .filter(this.isNotFutureMatch)
      .map(this.getMatchView);

  private getFirstMatchRedirect = (): JSX.Element | null =>
    this.getCurrentMatchIndex() === -1 ? (
      <Redirect
        to={`/round/${this.props.round.id}/match/${
          this.props.round.firstMatch.id
        }`}
      />
    ) : null;

  private shouldAddNextMatchRedirect = (): boolean =>
    isInRange(
      this.state.currentState,
      0,
      (this.props.round.matches.length - 1) * 2 + 1
    ) &&
    this.state.currentState % 2 === 0 &&
    this.props.round.matches[this.state.currentState / 2].id !==
      this.props.matchId;

  private getNextMatchRedirect = (): JSX.Element | null =>
    this.shouldAddNextMatchRedirect() ? (
      <Redirect
        to={`/round/${this.props.round.id}/match/${
          this.props.round.matches[this.state.currentState / 2].id
        }`}
      />
    ) : null;

  private getRoundDetails = (): JSX.Element => (
    <CSSTransition
      in={
        isInRange(
          this.state.currentState,
          1,
          this.props.round.matches.length * 2 - 1
        ) && this.getCurrentMatchIndex() !== -1
      }
      timeout={500 / this.props.config!.speed}
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
      onExited={this.onMatchCompleteWithDelay}
    >
      <div
        className={classNames("round")}
        style={{
          transition: `opacity ${500 / this.props.config!.speed}ms ease-in-out`
        }}
      >
        {this.getMatchList()}
      </div>
    </CSSTransition>
  );

  public componentWillMount = (): void => {
    this.setState({
      currentState:
        this.getCurrentMatchIndex() === -1 ? 0 : this.getCurrentMatchIndex() * 2
    });
  };

  public componentDidMount = (): void => {
    this._isMounted = true;
    this.goToNextState();
  };

  public componentDidUpdate = (prevProps: RoundViewProps): void => {
    if (this.props.matchId !== prevProps.matchId) {
      this.setState({ currentState: this.getCurrentMatchIndex() * 2 + 1 });
    }
  };

  public componentWillUnmount = (): void => {
    this._isMounted = false;
  };

  public render = (): JSX.Element => (
    <Fragment
      key={`round-${this.props.round.id}-match-${this.getCurrentMatchIndex()}`}
    >
      {this.getRoundDetails()}
      {this.getFirstMatchRedirect()}
      {this.getNextMatchRedirect()}
    </Fragment>
  );
}
