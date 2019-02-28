import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "./LoserOverlay.scss";
import classNames from "classnames";
import Participant from "../../store/round/match/participant/Participant";
import ParticipantCard from "../round/match/participant/card/ParticipantCard";
import Config from "../../store/config/Config";
import { CSSTransition } from "react-transition-group";
import { isInRange } from "../../util/index";

/**
 * Properties of the loser overlay React component.
 */
interface LoserOverlayProps {
  /** @ignore The application config. */
  config?: Config;
  /** The losers of a round. */
  losers: Participant[];
  /** Action to call when the overlay has finished showing the list of losers. */
  onOverlayComplete: () => void;
}

/**
 * State of the loser overlay React component.
 */
interface LoserOverlayState {
  /** The current state of the loser overlay component (for animations). */
  currentState: number;
}

/**
 * React component for the loser overlay.
 */
@inject("config")
@observer
export default class LoserOverlay extends Component<
  LoserOverlayProps,
  LoserOverlayState
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
   * Moves the component to the next animation state, after a delay of 1000 (ignoring speed multiplier).
   */
  private _goToNextStateWithDelay = (): unknown =>
    setTimeout(this._goToNextState, 1000 / this.props.config!.speed);

  /**
   * Returns whether it should show the loser at the given index in the list.
   * @return {boolean} Whether to show the loser or not.
   */
  private _shouldShowLoser = (index: number) =>
    this.state.currentState % 2 === 0 &&
    this.state.currentState / 2 - 1 === index;

  /**
   * Returns the card view for the given loser participant, wrapped in an animation transition component.
   * @return {JSX.Element} The loser participant card view.
   */
  private _getLoserEntry = (
    participant: Participant,
    index: number,
  ): JSX.Element => (
    <CSSTransition
      key={participant.name}
      in={this._shouldShowLoser(index)}
      timeout={200 / this.props.config!.speed}
      classNames={{
        enter: "",
        enterActive: "loser-overlay__loser--entering",
        enterDone: "loser-overlay__loser--entered",
        exit: "",
        exitActive: "loser-overlay__loser--exiting",
        exitDone: "loser-overlay__loser--exited",
      }}
      mountOnEnter={true}
      unmountOnExit={true}
      onEntered={this._goToNextStateWithDelay}
      onExited={this._goToNextState}
    >
      <div
        className={classNames("loser-overlay__loser")}
        style={{
          transition: `opacity ${200 / this.props.config!.speed}ms ease-in-out`,
        }}
      >
        <ParticipantCard participant={participant} />
      </div>
    </CSSTransition>
  );

  /**
   * Returns the list of views for each loser participant.
   * @return {JSX.Element[]} The views for the loser participants.
   */
  private _getParticipants = (): JSX.Element[] =>
    this.props.losers.map(this._getLoserEntry);

  /**
   * Lifecycle method that runs before component mount.
   */
  public componentWillMount = (): void => {
    this.setState({ currentState: 0 });
  };

  /**
   * Lifecycle method that runs after component mount.
   */
  public componentDidMount = (): void => {
    this._isMounted = true;
    this._goToNextState();
    this._goToNextStateWithDelay();
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
      in={isInRange(
        this.state.currentState,
        1,
        this.props.losers.length * 2 + 1,
      )}
      timeout={500 / this.props.config!.speed}
      classNames={{
        enter: "",
        enterActive: "loser-overlay-wrapper--entering",
        enterDone: "loser-overlay-wrapper--entered",
        exit: "",
        exitActive: "loser-overlay-wrapper--exiting",
        exitDone: "loser-overlay-wrapper--exited",
      }}
      mountOnEnter={true}
      unmountOnExit={true}
      onExited={this.props.onOverlayComplete}
    >
      <div
        className={classNames("loser-overlay-wrapper")}
        style={{
          transition: `opacity ${500 / this.props.config!.speed}ms ease-in-out`,
        }}
      >
        <div className={classNames("loser-overlay")}>
          <h2>Losers</h2>
          {this._getParticipants()}
        </div>
      </div>
    </CSSTransition>
  );
}
