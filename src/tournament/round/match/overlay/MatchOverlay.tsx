import React, { Component } from "react";
import { observer, inject } from "mobx-react";
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
import { RouteComponentProps, withRouter } from "react-router";

interface MatchOverlayProps {
  config?: Config;
  currentMatch: Match;
  onMatchComplete: () => void;
}

interface MatchOverlayState {
  message: string;
  currentState: number;
}

export default inject("config")(
  observer(
    withRouter(
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
          setTimeout(this.goToNextState, 4000 / this.props.config!.speed);

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
          <div key={participant.name}>
            <ParticipantCard invert={true} participant={participant} />
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

        private getWinner = (): JSX.Element => (
          <CSSTransition
            in={this.state.currentState === 3}
            timeout={500 / this.props.config!.speed}
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
                transition: `opacity ${500 /
                  this.props.config!.speed}ms ease-in-out`
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
            timeout={500 / this.props.config!.speed}
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
                transition: `opacity ${500 /
                  this.props.config!.speed}ms ease-in-out`
              }}
            >
              <h3>Selecting Winner</h3>
              <ClipLoader sizeUnit={"rem"} size={3} />
            </div>
          </CSSTransition>
        );

        private getWinnerName = (): string =>
          this.props.currentMatch.winner.name;

        private getLoserNames = (): string[] =>
          this.props.currentMatch.losers.map(this.getParticipantName);

        public componentWillMount = (): void => {
          this.setState({
            message: this.props.config!.getRandomMessage(
              this.getWinnerName(),
              this.getLoserNames()
            ),
            currentState: 0
          });
        };

        public componentDidMount = (): void => {
          this._isMounted = true;
          this.goToNextState();
          this.goToNextStateWithDelay();
        };

        public componentWillUnmount = (): void => {
          this._isMounted = false;
        };

        /**
         * Renders the component.
         * @returns {JSX.Element} The rendered component.
         */
        public render = (): JSX.Element => (
          <CSSTransition
            in={isInRange(this.state.currentState, 1, 3)}
            timeout={500 / this.props.config!.speed}
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
                transition: `opacity ${500 /
                  this.props.config!.speed}ms ease-in-out`
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
    )
  )
);
