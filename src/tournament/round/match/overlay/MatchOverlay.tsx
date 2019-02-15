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

interface MatchOverlayProps {
  match: Match;
  onMatchComplete: () => void;
}

interface MatchOverlayState {
  currentState: number;
}

export const createMatchOverlayComponent = (config: Config) =>
  observer(
    class MatchOverlay extends Component<MatchOverlayProps, MatchOverlayState> {
      private goToNextState = (): void =>
        this.setState({ currentState: this.state.currentState + 1 });

      private goToNextStateWithDelay = (): unknown =>
        setTimeout(this.goToNextState, 4000);

      private getParticipantList = (): JSX.Element => (
        <div className={classNames("match-overlay__list")}>
          {this.getParticipants()}
        </div>
      );

      private getParticipants = (): JSX.Element[] =>
        this.props.match.participants
          .map(
            (participant: Participant): JSX.Element[] => [
              <ParticipantCard
                invert={true}
                key={participant.name}
                participant={participant}
              />,
              <h2 key={`${participant.name} versus`}>VS</h2>
            ]
          )
          .flat()
          .slice(0, -1);

      private getWinner = (): JSX.Element => (
        <CSSTransition
          in={this.state.currentState === 3}
          timeout={500}
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
          onEntered={this.goToNextStateWithDelay}
        >
          <div className={classNames("match-overlay__winner")}>
            <ParticipantEntry participant={this.props.match.winner} />
            <h3>Is The Winner!</h3>
          </div>
        </CSSTransition>
      );

      private getInterimText = (): JSX.Element => (
        <CSSTransition
          in={this.state.currentState === 1}
          timeout={500}
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
          <div className={classNames("match-overlay__interim")}>
            <h3>Selecting winner</h3>
            <ClipLoader sizeUnit={"rem"} size={3} />
          </div>
        </CSSTransition>
      );

      public componentWillMount = (): void => {
        this.setState({ currentState: 0 });
      };

      public componentDidMount = (): void => {
        this.goToNextState();
        this.goToNextStateWithDelay();
      };

      public render = (): JSX.Element => (
        <CSSTransition
          in={isInRange(this.state.currentState, 1, 3)}
          timeout={500}
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
          <div className={classNames("match-overlay-wrapper")}>
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

export default createMatchOverlayComponent(Config.instance);
