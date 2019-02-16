import React, { Component, Fragment } from "react";
import { observer, inject } from "mobx-react";
import "./LoserOverlay.scss";
import classNames from "classnames";
import Participant from "../../store/round/match/participant/Participant";
import ParticipantCard from "../round/match/participant/card/ParticipantCard";
import Config from "../../store/config/Config";
import { CSSTransition } from "react-transition-group";
import { isInRange } from "../../util/index";

interface LoserOverlayProps {
  config?: Config;
  losers: Participant[];
  onOverlayComplete: () => void;
}

interface LoserOverlayState {
  currentState: number;
}

@inject("config")
@observer
export default class LoserOverlay extends Component<
  LoserOverlayProps,
  LoserOverlayState
> {
  private _isMounted: boolean = false;

  private goToNextState = (): void =>
    this._isMounted
      ? this.setState({ currentState: this.state.currentState + 1 })
      : undefined;

  private goToNextStateWithDelay = (): unknown =>
    setTimeout(this.goToNextState, 1000 / this.props.config!.speed);

  private getParticipantList = (): JSX.Element => (
    <Fragment>{this.getParticipants()}</Fragment>
  );

  private shouldShowLoser = (index: number) =>
    this.state.currentState % 2 === 0 &&
    this.state.currentState / 2 - 1 === index;

  private getLoserEntry = (
    participant: Participant,
    index: number
  ): JSX.Element => (
    <CSSTransition
      key={participant.name}
      in={this.shouldShowLoser(index)}
      timeout={200 / this.props.config!.speed}
      classNames={{
        enter: "",
        enterActive: "loser-overlay__loser--entering",
        enterDone: "loser-overlay__loser--entered",
        exit: "",
        exitActive: "loser-overlay__loser--exiting",
        exitDone: "loser-overlay__loser--exited"
      }}
      mountOnEnter={true}
      unmountOnExit={true}
      onEntered={this.goToNextStateWithDelay}
      onExited={this.goToNextState}
    >
      <div
        className={classNames("loser-overlay__loser")}
        style={{
          transition: `opacity ${200 / this.props.config!.speed}ms ease-in-out`
        }}
      >
        <ParticipantCard participant={participant} />
      </div>
    </CSSTransition>
  );

  private getParticipants = (): JSX.Element[] =>
    this.props.losers.map(this.getLoserEntry);

  public componentWillMount = (): void => {
    this.setState({ currentState: 0 });
  };

  public componentDidMount = (): void => {
    this._isMounted = true;
    this.goToNextState();
    this.goToNextStateWithDelay();
  };

  public componentWillUnmount = (): void => {
    this._isMounted = false;
  };

  public render = (): JSX.Element => (
    <CSSTransition
      in={isInRange(
        this.state.currentState,
        1,
        this.props.losers.length * 2 + 1
      )}
      timeout={500 / this.props.config!.speed}
      classNames={{
        enter: "",
        enterActive: "loser-overlay-wrapper--entering",
        enterDone: "loser-overlay-wrapper--entered",
        exit: "",
        exitActive: "loser-overlay-wrapper--exiting",
        exitDone: "loser-overlay-wrapper--exited"
      }}
      mountOnEnter={true}
      unmountOnExit={true}
      onExited={this.props.onOverlayComplete}
    >
      <div
        className={classNames("loser-overlay-wrapper")}
        style={{
          transition: `opacity ${500 / this.props.config!.speed}ms ease-in-out`
        }}
      >
        <div className={classNames("loser-overlay")}>
          <h2>Losers</h2>
          {this.getParticipantList()}
        </div>
      </div>
    </CSSTransition>
  );
}
