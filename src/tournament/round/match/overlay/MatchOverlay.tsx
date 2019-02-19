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

/**
 * Properties of the match overlay React component.
 */
interface MatchOverlayProps {
  /**
   * @type {Config} The application config.
   */
  config?: Config;
  /**
   * @type {Match} The match details.
   */
  currentMatch: Match;
  /**
   * @type {() => void} Action to call when the view has finished showing the match.
   */
  onMatchComplete: () => void;
}

/**
 * State of the match overlay React component.
 */
interface MatchOverlayState {
  /**
   * @type {number} The current state of the match overlay component (for animations).
   */
  currentState: number;
  /**
   * @type {string} The message to be shown along with the details of the winner of the match.
   */
  message: string;
}

export default inject("config")(
  observer(
    withRouter(
      /**
       * React component for the match overlay.
       */
      class MatchOverlay extends Component<
        MatchOverlayProps & RouteComponentProps,
        MatchOverlayState
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
            ? this.setState({
                ...this.state,
                currentState: this.state.currentState + 1
              })
            : undefined;

        /**
         * Moves the component to the next animation state, after a delay of 2500 (ignoring speed multiplier).
         */
        private goToNextStateWithDelay = (): unknown =>
          setTimeout(this.goToNextState, 4000 / this.props.config!.speed);

        /**
         * Returns the participant list of the current match.
         * @return {JSX.Element} The participants list view.
         */
        private getParticipantList = (): JSX.Element => (
          <div className={classNames("match-overlay__list")}>
            {this.getParticipants()}
          </div>
        );

        /**
         * Returns whether the URL has the given query param.
         * @param {string} name The query param name.
         * @return {boolean} Whether the query param exists in the URL.
         */
        private hasQueryParam = (name: string): boolean =>
          new URLSearchParams(this.props.location.search).has(name);

        /**
         * Returns a pair of the given participant, along with a versus text.
         * @param {Participant} participant The participant details.
         * @return {[JSX.Element, JSX.Element]} The participant details and versus text pair.
         */
        private getParticipantAndVersusPair = (
          participant: Participant
        ): [JSX.Element, JSX.Element] => [
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

        /**
         * Returns the list of views of all participants of the current match.
         * @return {JSX.Element[]} The list of participant views.
         */
        private getParticipants = (): JSX.Element[] => {
          return this.props.currentMatch.participants
            .map(this.getParticipantAndVersusPair)
            .flat()
            .slice(0, -1);
        };

        /**
         * Returns the name of the given participant.
         * @return {string} The list of participant views.
         */
        private getParticipantName = (participant: Participant): string =>
          participant.name;

        /**
         * Returns the view for the match winner, wrapped in an animation transition component.
         * @return {JSX.Element} The match winner view.
         */
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

        /**
         * Returns the view for the interim text, wrapped in an animation transition component.
         * @return {JSX.Element} The match overlay interim text.
         */
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

        /**
         * Returns the name of the match winner.
         * @return {string} The winner name.
         */
        private getWinnerName = (): string =>
          this.props.currentMatch.winner.name;

        /**
         * Returns the names of the match losers.
         * @return {string[]} The losers names.
         */
        private getLoserNames = (): string[] =>
          this.props.currentMatch.losers.map(this.getParticipantName);

        /**
         * Lifecycle method that runs before component mount.
         */
        public componentWillMount = (): void => {
          this.setState({
            message: this.props.config!.getRandomMessage(
              this.getWinnerName(),
              this.getLoserNames()
            ),
            currentState: 0
          });
        };

        /**
         * Lifecycle method that runs after component mount.
         */
        public componentDidMount = (): void => {
          this._isMounted = true;
          this.goToNextState();
          this.goToNextStateWithDelay();
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
