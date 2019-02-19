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

/**
 * Properties of the round view React component.
 */
interface RoundViewProps {
  /**
   * @type {Config} The application config.
   */
  config?: Config;
  /**
   * @type {string} The ID of the current match.
   */
  matchId: string;
  /**
   * @type {Round} The details of the current round.
   */
  round: Round;
  /**
   * @type {() => void} Action to call when the view has finished showing the round.
   */
  onRoundComplete: () => void;
}

/**
 * State of the round view React component.
 */
interface RoundViewState {
  /**
   * @type {number} The current state of the round component (for animations).
   */
  currentState: number;
}

/**
 * React component for the round view.
 */
@inject("config")
@observer
export default class RoundView extends Component<
  RoundViewProps,
  RoundViewState
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
      ? this.setState({ currentState: this.state.currentState + 1 })
      : undefined;

  /**
   * Calls the action for round completion, after a delay of 500 (ignoring speed multiplier).
   */
  private onRoundCompleteWithDelay = (): unknown =>
    setTimeout(this.props.onRoundComplete, 500 / this.props.config!.speed);

  /**
   * Returns the match list of the current round.
   * @return {JSX.Element} The matches list view.
   */
  private getMatchList = (): JSX.Element => (
    <div className={classNames("round__list")}>{this.getMatches()}</div>
  );

  /**
   * Returns whether the given match is the current match.
   * @param {Match} match The match to check.
   * @return {boolean} Whether the given match is the current match.
   */
  private isCurrentMatch = (match: Match): boolean =>
    match.id === this.props.matchId;

  /**
   * Returns the index of current match in the tournament.
   * @return {Match} The index of the current match.
   */
  private getCurrentMatchIndex = (): number =>
    this.props.round.matches.findIndex(this.isCurrentMatch);

  /**
   * Returns whether the given match is not a future match.
   * @param {Match} match The match to check.
   * @return {boolean} Whether the given match is not a future match or not.
   */
  private isNotFutureMatch = (_: Match, index: number): boolean =>
    index <= this.getCurrentMatchIndex();

  /**
   * Returns the view for the given match.
   * @param {Match} match The match details.
   * @return {JSX.Element} The match view.
   */
  private getMatchView = (match: Match): JSX.Element => (
    <MatchView
      key={match.id}
      match={match}
      isCurrentMatch={this.isCurrentMatch(match)}
      onMatchComplete={this.goToNextState}
    />
  );

  /**
   * Returns the list of views of all matches of the current round.
   * @return {JSX.Element[]} The list of match views.
   */
  private getMatches = (): JSX.Element[] =>
    this.props.round.matches
      .filter(this.isNotFutureMatch)
      .map(this.getMatchView);

  /**
   * Returns the redirect for the first match if required.
   * @return {JSX.Element} The redirect, or null if it is not required.
   */
  private getFirstMatchRedirect = (): JSX.Element | null =>
    this.getCurrentMatchIndex() === -1 ? (
      <Redirect
        to={`/round/${this.props.round.id}/match/${
          this.props.round.firstMatch.id
        }`}
      />
    ) : null;

  /**
   * Returns whether the next match redirect should be added to the view.
   * @return {boolean} Whether the redirect should be shown.
   */
  private shouldAddNextMatchRedirect = (): boolean =>
    isInRange(
      this.state.currentState,
      0,
      (this.props.round.matches.length - 1) * 2 + 1
    ) &&
    this.state.currentState % 2 === 0 &&
    this.props.round.matches[this.state.currentState / 2].id !==
      this.props.matchId;

  /**
   * Returns the redirect for the next match if required.
   * @return {JSX.Element} The redirect, or null if it is not required.
   */
  private getNextMatchRedirect = (): JSX.Element | null =>
    this.shouldAddNextMatchRedirect() ? (
      <Redirect
        to={`/round/${this.props.round.id}/match/${
          this.props.round.matches[this.state.currentState / 2].id
        }`}
      />
    ) : null;

  /**
   * Returns the details of the current round, wrapped in an animation transition component.
   * @return {JSX.Element} The current round view.
   */
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
      onExited={this.onRoundCompleteWithDelay}
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

  /**
   * Lifecycle method that runs before component mount.
   */
  public componentWillMount = (): void => {
    this.setState({
      currentState:
        this.getCurrentMatchIndex() === -1 ? 0 : this.getCurrentMatchIndex() * 2
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
  public componentDidUpdate = (prevProps: RoundViewProps): void => {
    if (this.props.matchId !== prevProps.matchId) {
      this.setState({ currentState: this.getCurrentMatchIndex() * 2 + 1 });
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
