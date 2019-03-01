import React, { Component, Fragment } from "react";
import { observer, inject } from "mobx-react";
import "./RoundView.scss";
import classNames from "classnames";
import Round from "../../store/round/Round";
import Match from "../../store/round/match/Match";
import MatchView from "./match/MatchView";
import { Redirect } from "react-router";
import { CSSTransition } from "react-transition-group";
import { isInRange, getNormalizedSpeed } from "../../util/index";
import Config from "../../store/config/Config";
const inflect = require("i")();

/**
 * Properties of the round view React component.
 */
interface RoundViewProps {
  /** @ignore The application config. */
  config?: Config;
  /** The ID of the current match. */
  matchId: string;
  /** The details of the current round. */
  round: Round;
  /** Action to call when the view has finished showing the round. */
  onRoundComplete: () => void;
}

/**
 * State of the round view React component.
 */
interface RoundViewState {
  /** The current state of the round component (for animations). */
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
  /** Whether the component is mounted or not. */
  private _isMounted: boolean = false;

  /**
   * Moves the component to the next animation state.
   */
  private _goToNextState = (): void =>
    this._isMounted
      ? this.setState({ currentState: this.state.currentState + 1 })
      : undefined;

  /**
   * Calls the action for round completion, after a delay of 500 (ignoring speed multiplier).
   */
  private _onRoundCompleteWithDelay = (): unknown =>
    setTimeout(this.props.onRoundComplete, getNormalizedSpeed(500));

  /**
   * Returns the match list of the current round.
   * @return {JSX.Element} The matches list view.
   */
  private _getMatchList = (): JSX.Element => (
    <div className={classNames("round__list")}>{this._getMatches()}</div>
  );

  /**
   * Returns whether the given match is the current match.
   * @param {Match} match The match to check.
   * @return {boolean} Whether the given match is the current match.
   */
  private _isCurrentMatch = (match: Match): boolean =>
    match.id === this.props.matchId;

  /**
   * Returns the index of current match in the tournament.
   * @return {Match} The index of the current match.
   */
  private _getCurrentMatchIndex = (): number =>
    this.props.round.matches.findIndex(this._isCurrentMatch);

  /**
   * Returns whether the given match is not a future match.
   * @param {Match} match The match to check.
   * @return {boolean} Whether the given match is not a future match or not.
   */
  private _isNotFutureMatch = (_: Match, index: number): boolean =>
    index <= this._getCurrentMatchIndex();

  /**
   * Returns the view for the given match.
   * @param {Match} match The match details.
   * @return {JSX.Element} The match view.
   */
  private _getMatchView = (match: Match): JSX.Element => (
    <MatchView
      key={match.id}
      match={match}
      isCurrentMatch={this._isCurrentMatch(match)}
      onMatchComplete={this._goToNextState}
    />
  );

  /**
   * Returns the list of views of all matches of the current round.
   * @return {JSX.Element[]} The list of match views.
   */
  private _getMatches = (): JSX.Element[] =>
    this.props.round.matches
      .filter(this._isNotFutureMatch)
      .map(this._getMatchView);

  /**
   * Returns the redirect for the first match if required.
   * @return {JSX.Element} The redirect, or null if it is not required.
   */
  private _getFirstMatchRedirect = (): JSX.Element | null =>
    this._getCurrentMatchIndex() === -1 ? (
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
  private _shouldAddNextMatchRedirect = (): boolean =>
    isInRange(
      this.state.currentState,
      0,
      (this.props.round.matches.length - 1) * 2 + 1,
    ) &&
    this.state.currentState % 2 === 0 &&
    this.props.round.matches[this.state.currentState / 2].id !==
      this.props.matchId;

  /**
   * Returns the redirect for the next match if required.
   * @return {JSX.Element} The redirect, or null if it is not required.
   */
  private _getNextMatchRedirect = (): JSX.Element | null =>
    this._shouldAddNextMatchRedirect() ? (
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
  private _getRoundDetails = (): JSX.Element => (
    <CSSTransition
      in={
        isInRange(
          this.state.currentState,
          1,
          this.props.round.matches.length * 2 - 1,
        ) && this._getCurrentMatchIndex() !== -1
      }
      timeout={getNormalizedSpeed(500)}
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
      onExited={this._onRoundCompleteWithDelay}
    >
      <div
        className={classNames("round")}
        style={{
          transition: `opacity ${getNormalizedSpeed(500)}ms ease-in-out`,
        }}
      >
        <h2>{inflect.titleize(this.props.round.id)}</h2>
        {this._getMatchList()}
      </div>
    </CSSTransition>
  );

  /**
   * Lifecycle method that runs before component mount.
   */
  public componentWillMount = (): void => {
    this.setState({
      currentState:
        this._getCurrentMatchIndex() === -1
          ? 0
          : this._getCurrentMatchIndex() * 2,
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
  public componentDidUpdate = (prevProps: RoundViewProps): void => {
    if (this.props.matchId !== prevProps.matchId) {
      this.setState({ currentState: this._getCurrentMatchIndex() * 2 + 1 });
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
      key={`round-${this.props.round.id}-match-${this._getCurrentMatchIndex()}`}
    >
      {this._getRoundDetails()}
      {this._getFirstMatchRedirect()}
      {this._getNextMatchRedirect()}
    </Fragment>
  );
}
