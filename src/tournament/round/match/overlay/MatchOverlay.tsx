import React, { Component } from "react";
import { observer } from "mobx-react";
import "./MatchOverlay.scss";
import classNames from "classnames";
import Match from "../../../../store/round/match/Match";
import Participant from "../../../../store/round/match/participant/Participant";
import ParticipantCard from "../participant/card/ParticipantCard";
import ParticipantEntry from "../participant/entry/ParticipantEntry";
import Config from "../../../../store/config/Config";
import { CSSTransition } from "react-transition-group";
import { isInRange } from "../../../../util/index";
import { ClipLoader } from "react-spinners";
import RandomGenerator from "../../../../store/config/RandomGenerator";
import { RouteComponentProps, withRouter } from "react-router";

interface MatchOverlayProps {
  currentMatch: Match;
  onMatchComplete: () => void;
}

interface MatchOverlayState {
  message: string;
  currentState: number;
}

export const createMatchOverlayComponent = (config: Config) =>
  observer(
    class MatchOverlay extends Component<
      MatchOverlayProps & RouteComponentProps,
      MatchOverlayState
    > {
      private _isMounted: boolean = false;

      private goToNextState = (): void =>
        this._isMounted
          ? this.setState({
              ...this.state,
              currentState: this.state.currentState + 1
            })
          : undefined;

      private goToNextStateWithDelay = (): unknown =>
        setTimeout(this.goToNextState, 4000 / config.speed);

      private getParticipantList = (): JSX.Element => (
        <div className={classNames("match-overlay__list")}>
          {this.getParticipants()}
        </div>
      );

      private hasQueryParam = (name: string): boolean =>
        new URLSearchParams(this.props.location.search).has(name);

      private getParticipantAndVersusPair = (
        participant: Participant
      ): JSX.Element[] => [
        <div>
          <ParticipantCard
            invert={true}
            key={participant.name}
            participant={participant}
          />
        </div>,
        <h2
          className={classNames("versus-text")}
          key={`${participant.name} versus`}
        >
          VS
        </h2>
      ];

      private getParticipants = (): JSX.Element[] =>
        this.props.currentMatch.participants
          .map(this.getParticipantAndVersusPair)
          .flat()
          .slice(0, -1);

      private getParticipantName = (participant: Participant): string =>
        participant.name;

      private shouldAppend = (
        index: number,
        participantSize: number
      ): boolean => index === participantSize - 1 && participantSize > 1;

      private appendToLastParticipant = (
        participantSize: number,
        stringToAppend: string
      ): ((name: string, index: number) => string) => (
        name: string,
        index: number
      ): string =>
        this.shouldAppend(index, participantSize)
          ? `${stringToAppend} ${name}`
          : name;

      private formatLosers = (participants: Participant[]): string =>
        participants
          .map(this.getParticipantName)
          .map(this.appendToLastParticipant(participants.length, "and"))
          .join(", ");

      private getMessage = (): string =>
        RandomGenerator.pick(config.messages)
          .replace("#winner", this.props.currentMatch.winner.name)
          .replace("#loser", this.formatLosers(this.props.currentMatch.losers));

      private getWinner = (): JSX.Element => (
        <CSSTransition
          in={this.state.currentState === 3}
          timeout={500 / config.speed}
          classNames={{
            enter: "",
            enterActive: "match-overlay__winner--entering",
            enterDone: "match-overlay__winner--entered",
            exit: "",
            exitActive: "match-overlay__winner--exiting",
            exitDone: "match-overlay__winner--exited"
          }}
          mountOnEnter={true}
          unmountOnExit={true}
          onEntered={
            !this.hasQueryParam("stop")
              ? this.goToNextStateWithDelay
              : undefined
          }
        >
          <div
            className={classNames("match-overlay__winner")}
            style={{
              transition: `opacity ${500 / config.speed}ms ease-in-out`
            }}
          >
            <ParticipantEntry participant={this.props.currentMatch.winner} />
            <h3>Won The Match!</h3>
            <h5>
              <strong>
                <em>{this.state.message}</em>
              </strong>
            </h5>
          </div>
        </CSSTransition>
      );

      private getInterimText = (): JSX.Element => (
        <CSSTransition
          in={this.state.currentState === 1}
          timeout={500 / config.speed}
          classNames={{
            enter: "",
            enterActive: "match-overlay__interim--entering",
            enterDone: "match-overlay__interim--entered",
            exit: "",
            exitActive: "match-overlay__interim--exiting",
            exitDone: "match-overlay__interim--exited"
          }}
          mountOnEnter={true}
          unmountOnExit={true}
          onExited={this.goToNextState}
        >
          <div
            className={classNames("match-overlay__interim")}
            style={{
              transition: `opacity ${500 / config.speed}ms ease-in-out`
            }}
          >
            <h3>Selecting Winner</h3>
            <ClipLoader sizeUnit={"rem"} size={3} />
          </div>
        </CSSTransition>
      );

      public componentWillMount = (): void => {
        this.setState({ message: this.getMessage(), currentState: 0 });
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
          in={isInRange(this.state.currentState, 1, 3)}
          timeout={500 / config.speed}
          classNames={{
            enter: "",
            enterActive: "match-overlay-wrapper--entering",
            enterDone: "match-overlay-wrapper--entered",
            exit: "",
            exitActive: "match-overlay-wrapper--exiting",
            exitDone: "match-overlay-wrapper--exited"
          }}
          mountOnEnter={true}
          unmountOnExit={true}
          onExited={this.props.onMatchComplete}
        >
          <div
            className={classNames("match-overlay-wrapper")}
            style={{
              transition: `opacity ${500 / config.speed}ms ease-in-out`
            }}
          >
            <div className={classNames("match-overlay")}>
              {this.getParticipantList()}
              {this.getInterimText()}
              {this.getWinner()}
            </div>
          </div>
        </CSSTransition>
      );
    }
  );

export default withRouter(createMatchOverlayComponent(Config.instance));
