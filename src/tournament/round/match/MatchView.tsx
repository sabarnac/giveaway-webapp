import React, { Component, Fragment, RefObject } from "react";
import { observer, inject } from "mobx-react";
import "./MatchView.scss";
import classNames from "classnames";
import Match from "../../../store/round/match/Match";
import Participant from "../../../store/round/match/participant/Participant";
import ParticipantEntry from "./participant/entry/ParticipantEntry";
import MatchOverlay from "./overlay/MatchOverlay";
import { isInRange } from "../../../util/index";
import { CSSTransition } from "react-transition-group";
import Config from "../../../store/config/Config";

/**
 * Properties of the match view React component.
 */
interface MatchViewProps {
  /** @ignore The application config. */
  config?: Config;
  /** Whether it is the currently ongoing match. */
  isCurrentMatch: boolean;
  /** The details of the current match. */
  match: Match;
  /** Action to call when the view has finished showing the match. */
  onMatchComplete: () => void;
}

/**
 * State of the match view React component.
 */
interface MatchViewState {
  /** The current state of the match component (for animations). */
  currentState: number;
  /** The index of the current participant being shown in the flip view. */
  currentParticipant: number;
  /** The index of the previous participant shown in the flip view. */
  oldParticipant: number;
}

/**
 * React component for the match view.
 */
@inject("config")
@observer
export default class MatchView extends Component<
  MatchViewProps,
  MatchViewState
> {
  /** Whether the component is mounted or not. */
  private _isMounted: boolean = false;
  /** A DOM reference to the match view. */
  private _matchRef: RefObject<any> = React.createRef();

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
   * Moves the component to the next random participant.
   */
  private goToNextRandomParticipant = (): void =>
    this._isMounted
      ? this.setState({
          ...this.state,
          currentParticipant:
            this.state.currentState === 3
              ? -2
              : (this.state.oldParticipant + 1) %
                this.props.match.participants.length
        })
      : undefined;

  /**
   * Moves the component to a non-existing participant, after a delay of 200 (ignoring speed multiplier).
   */
  private goToNoParticipantWithDelay = (): unknown =>
    setTimeout(
      () =>
        this._isMounted && this.state.currentParticipant !== -2
          ? this.setState({
              ...this.state,
              currentParticipant: -1,
              oldParticipant: this.state.currentParticipant
            })
          : null,
      200 / this.props.config!.speed
    );

  /**
   * Moves the component to the next random participant, after a delay of 200 (ignoring speed multiplier).
   */
  private goToNextRandomParticipantWithDelay = (): unknown =>
    setTimeout(this.goToNextRandomParticipant, 200 / this.props.config!.speed);

  /**
   * Moves the component to the next animation state, after a delay of 2500 (ignoring speed multiplier).
   */
  private goToNextStateWithDelay = (): unknown =>
    setTimeout(this.goToNextState, 2500 / this.props.config!.speed);

  /**
   * Calls the action for match completion, after a delay of 500 (ignoring speed multiplier).
   */
  private onMatchCompleteWithDelay = (): unknown =>
    setTimeout(this.props.onMatchComplete, 1000 / this.props.config!.speed);

  /**
   * Returns the participant list of the current match.
   * @return {JSX.Element} The participants list view.
   */
  private getParticipantList = (): JSX.Element => (
    <div className={classNames("match__list")}>{this.getParticipants()}</div>
  );

  /**
   * Returns the view for the given participant.
   * @param {Participant} participant The participant details.
   * @return {JSX.Element} The participant view.
   */
  private getParticipant = (participant: Participant): JSX.Element => (
    <ParticipantEntry key={participant.name} participant={participant} />
  );

  /**
   * Returns the list of views of all participants of the current match.
   * @return {JSX.Element[]} The list of participant views.
   */
  private getParticipants = (): JSX.Element[] =>
    this.props.match.participants.map(this.getParticipant);

  /**
   * Returns the view for the match winner, wrapped in an animation transition component.
   * @return {JSX.Element} The match winner view.
   */
  private getWinner = (): JSX.Element => (
    <CSSTransition
      in={this.state.currentParticipant === -2}
      timeout={200 / this.props.config!.speed}
      classNames={{
        enter: "",
        enterActive: "match__winner--entering",
        enterDone: "match__winner--entered",
        exit: "",
        exitActive: "match__winner--exiting",
        exitDone: "match__winner--exited"
      }}
      mountOnEnter={true}
      unmountOnExit={true}
      onEntered={this.onMatchCompleteWithDelay}
    >
      <div
        className={classNames("match__winner", {
          "match__winner--completed":
            !this.props.isCurrentMatch || !this.isAnActualMatch()
        })}
        style={{
          transition: `opacity ${200 / this.props.config!.speed}ms ease-in-out`
        }}
      >
        <ParticipantEntry participant={this.props.match.winner} />
      </div>
    </CSSTransition>
  );

  /**
   * Returns the view for the interim final participant view for a given participant, wrapped in an animation transition component.
   * @param {Participant} participant The participant details.
   * @param {number} index The index of the participant in the list.
   * @return {JSX.Element} The match final participant interim view.
   */
  private getParticipantFinalEntry = (
    participant: Participant,
    index: number
  ): JSX.Element => (
    <CSSTransition
      key={participant.name}
      in={
        isInRange(this.state.currentState, 1, 2) &&
        this.state.currentParticipant === index
      }
      timeout={200 / this.props.config!.speed}
      classNames={{
        enter: "",
        enterActive: "match__interim--entering",
        enterDone: "match__interim--entered",
        exit: "",
        exitActive: "match__interim--exiting",
        exitDone: "match__interim--exited"
      }}
      mountOnEnter={true}
      unmountOnExit={true}
      onEntered={this.goToNoParticipantWithDelay}
      onExited={this.goToNextRandomParticipant}
    >
      <div
        className={classNames("match__interim")}
        style={{
          transition: `opacity ${200 / this.props.config!.speed}ms ease-in-out`
        }}
      >
        <ParticipantEntry participant={participant} />
      </div>
    </CSSTransition>
  );

  /**
   * Returns the view for the final participant view.
   * @return {JSX.Element} The final participant view.
   */
  private getFinalEntry = (): JSX.Element => (
    <Fragment>
      {this.props.match.participants.map(this.getParticipantFinalEntry)}
      {this.getWinner()}
    </Fragment>
  );

  /**
   * Returns the match overlay for the current match.
   * @return {JSX.Element} The match overlay.
   */
  private getMatchOverlay = (): JSX.Element | null =>
    this.state.currentState === 2 ? (
      <MatchOverlay
        currentMatch={this.props.match}
        onMatchComplete={this.goToNextState}
      />
    ) : null;

  /**
   * Returns whether the current match is an actual match (has more than one participant).
   * @return {boolean} The match overlay.
   */
  private isAnActualMatch = (): boolean =>
    this.props.match.participants.length > 1;

  /**
   * Lifecycle method that runs before component mount.
   */
  public componentWillMount = (): void => {
    this.isAnActualMatch() && this.props.isCurrentMatch
      ? this.setState({
          currentParticipant: -1,
          oldParticipant: -1,
          currentState: 0
        })
      : this.props.isCurrentMatch
      ? this.setState({
          currentParticipant: -2,
          oldParticipant: -2,
          currentState: 0
        })
      : this.setState({
          currentParticipant: -2,
          oldParticipant: -2,
          currentState: 5
        });
  };

  /**
   * Lifecycle method that runs after component mount.
   */
  public componentDidMount = (): void => {
    this._isMounted = true;
    if (this.isAnActualMatch() && this.props.isCurrentMatch) {
      this.goToNextState();
      this.goToNextStateWithDelay();
      this.goToNextRandomParticipantWithDelay();
    } else if (!this.isAnActualMatch()) {
      this.goToNextState();
      this.onMatchCompleteWithDelay();
    }
  };

  /**
   * Lifecycle method that runs before component unmount.
   */
  public componentWillUnmount = (): void => {
    this._isMounted = false;
  };

  /**
   * Renders the component, wrapped in an animation transition component.
   * @return {JSX.Element} The rendered component.
   */
  public render = (): JSX.Element => (
    <CSSTransition
      in={isInRange(this.state.currentState, 1, 5)}
      timeout={500 / this.props.config!.speed}
      classNames={{
        enter: "",
        enterActive: "match--entering",
        enterDone: "match--entered",
        exit: "",
        exitActive: "match--exiting",
        exitDone: "match--exited"
      }}
      mountOnEnter={true}
      unmountOnExit={true}
      onEntering={() =>
        this._matchRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        })
      }
      onExited={this.props.onMatchComplete}
    >
      <div
        ref={this._matchRef}
        className={classNames("match", {
          "match--completed": !this.props.isCurrentMatch
        })}
        style={{
          transition: `opacity ${500 / this.props.config!.speed}ms ease-in-out`
        }}
      >
        {this.getParticipantList()}
        {this.getFinalEntry()}
        {this.getMatchOverlay()}
      </div>
    </CSSTransition>
  );
}