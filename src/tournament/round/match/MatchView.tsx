import React, { Component } from "react";
import { observer } from "mobx-react";
import "./MatchView.scss";
import classNames from "classnames";
import Match from "../../../store/round/match/Match";
import Participant from "../../../store/round/match/participant/Participant";
import ParticipantEntry from "./participant/entry/ParticipantEntry";
import MatchOverlay from "./overlay/MatchOverlay";
import { isInRange } from "../../../util/index";
import { CSSTransition } from "react-transition-group";
import Config from "../../../store/config/Config";

interface MatchViewProps {
  isCurrentMatch: boolean;
  match: Match;
  onMatchComplete: () => void;
}

interface MatchViewState {
  currentState: number;
  currentParticipant: number;
  oldParticipant: number;
}

export const createMatchViewComponent = (config: Config) =>
  observer(
    class MatchView extends Component<MatchViewProps, MatchViewState> {
      private _isMounted: boolean = false;

      private goToNextState = (): void =>
        this._isMounted
          ? this.setState({
              ...this.state,
              currentState: this.state.currentState + 1
            })
          : undefined;

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
          200
        );

      private goToNextRandomParticipantWithDelay = (): unknown =>
        setTimeout(this.goToNextRandomParticipant, 200);

      private goToNextStateWithDelay = (): unknown =>
        setTimeout(this.goToNextState, 2500);

      private onMatchCompleteWithDelay = (): unknown =>
        setTimeout(this.props.onMatchComplete, 1000);

      private getParticipantList = (): JSX.Element => (
        <div className={classNames("match__list")}>
          {this.getParticipants()}
        </div>
      );

      private getParticipant = (participant: Participant): JSX.Element => (
        <ParticipantEntry key={participant.name} participant={participant} />
      );

      private getParticipants = (): JSX.Element[] =>
        this.props.match.participants.map(this.getParticipant);

      private getWinner = (): JSX.Element => (
        <CSSTransition
          in={this.state.currentParticipant === -2}
          timeout={200}
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
          >
            <ParticipantEntry participant={this.props.match.winner} />
          </div>
        </CSSTransition>
      );

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
          timeout={200}
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
          <div className={classNames("match__interim")}>
            <ParticipantEntry participant={participant} />
          </div>
        </CSSTransition>
      );

      private getFinalEntry = (): JSX.Element => (
        <React.Fragment>
          {this.props.match.participants.map(this.getParticipantFinalEntry)}
          {this.getWinner()}
        </React.Fragment>
      );

      private getMatchOverlay = (): JSX.Element | null =>
        this.state.currentState === 2 ? (
          <MatchOverlay
            match={this.props.match}
            onMatchComplete={this.goToNextState}
          />
        ) : null;

      private isAnActualMatch = (): boolean =>
        this.props.match.participants.length > 1;

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

      public componentWillUnmount = (): void => {
        this._isMounted = false;
      };

      public render = (): JSX.Element => {
        return (
          <CSSTransition
            in={isInRange(this.state.currentState, 1, 5)}
            timeout={500}
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
            onExited={this.props.onMatchComplete}
          >
            <div
              className={classNames("match", {
                "match--completed": !this.props.isCurrentMatch
              })}
            >
              {this.getParticipantList()}
              {this.getFinalEntry()}
              {this.getMatchOverlay()}
            </div>
          </CSSTransition>
        );
      };
    }
  );

export default createMatchViewComponent(Config.instance);
