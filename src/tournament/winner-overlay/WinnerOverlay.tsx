import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import "./WinnerOverlay.scss";
import classNames from "classnames";
import Participant from "../../store/round/match/participant/Participant";
import ParticipantCard from "../round/match/participant/card/ParticipantCard";
import Config from "../../store/config/Config";
import { CSSTransition } from "react-transition-group";

/**
 * Properties of the winner overlay React component.
 */
interface WinnerOverlayProps {
  /** @ignore The application config. */
  config?: Config;
  /** The tournament winner. */
  winner: Participant;
}

/**
 * State of the winner overlay React component.
 */
interface WinnerOverlayState {
  /** The current state of the winner overlay component (for animations). */
  currentState: number;
}

/**
 * React component for the winner overlay.
 */
@inject("config")
@observer
export default class WinnerOverlay extends Component<
  WinnerOverlayProps,
  WinnerOverlayState
> {
  /** Whether the component is mounted or not. */
  private _isMounted: boolean = false;

  /**
   * Moves the component to the next animation state.
   */
  private goToNextState = (): void =>
    this._isMounted
      ? this.setState({ currentState: this.state.currentState + 1 })
      : undefined;

  /**
   * Returns the card view for the winner participant.
   * @return {JSX.Element} The winner participant card view.
   */
  private getWinner = (): JSX.Element => (
    <div className={classNames("winner-overlay__winner")}>
      <ParticipantCard participant={this.props.winner} />
      <h3>Won The Giveaway!</h3>
    </div>
  );

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
    this.goToNextState();
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
      in={this.state.currentState > 0}
      timeout={500 / this.props.config!.speed}
      classNames={{
        enter: "",
        enterActive: "winner-overlay-wrapper--entering",
        enterDone: "winner-overlay-wrapper--entered",
        exit: "",
        exitActive: "winner-overlay-wrapper--exiting",
        exitDone: "winner-overlay-wrapper--exited"
      }}
      mountOnEnter={true}
      unmountOnExit={true}
    >
      <div
        className={classNames("winner-overlay-wrapper")}
        style={{
          transition: `opacity ${500 / this.props.config!.speed}ms ease-in-out`
        }}
      >
        <div className={classNames("winner-overlay")}>{this.getWinner()}</div>
      </div>
    </CSSTransition>
  );
}
