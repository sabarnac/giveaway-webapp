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
  /** @ignore The application config. */
  config?: Config;
  /** The match details. */
  currentMatch: Match;
  /** Action to call when the view has finished showing the match. */
  onMatchComplete: () => void;
}

/**
 * State of the match overlay React component.
 */
interface MatchOverlayState {
  /** The current state of the match overlay component (for animations). */
  currentState: number;
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
        /** Whether the component is mounted or not. */
        private _isMounted: boolean = false;

        /**
         * Moves the component to the next animation state.
         */
        private _goToNextState = (): void =>
          this._isMounted
            ? this.setState({
                ...this.state,
                currentState: this.state.currentState + 1,
              })
            : undefined;

        /**
         * Moves the component to the next animation state, after a delay of 2500 (ignoring speed multiplier).
         */
        private _goToNextStateWithDelay = (): unknown =>
          setTimeout(this._goToNextState, 4000 / this.props.config!.speed);

        /**
         * Returns the participant list of the current match.
         * @return {JSX.Element} The participants list view.
         */
        private _getParticipantList = (): JSX.Element => (
          <div className={classNames("match-overlay__list")}>
            {this._getParticipants()}
          </div>
        );

        /**
         * Returns whether the URL has the given query param.
         * @param {string} name The query param name.
         * @return {boolean} Whether the query param exists in the URL.
         */
        private _hasQueryParam = (name: string): boolean =>
          new URLSearchParams(this.props.location.search).has(name);

        /**
         * Returns a pair of the given participant, along with a versus text.
         * @param {Participant} participant The participant details.
         * @return {[JSX.Element, JSX.Element]} The participant details and versus text pair.
         */
        private _getParticipantAndVersusPair = (
          participant: Participant,
        ): [JSX.Element, JSX.Element] => [
          <div key={participant.name}>
            <ParticipantCard invert={true} participant={participant} />
          </div>,
          <h3
            className={classNames("versus-text")}
            key={`${participant.name} versus`}
          >
            VS
          </h3>,
        ];

        /**
         * Returns the list of views of all participants of the current match.
         * @return {JSX.Element[]} The list of participant views.
         */
        private _getParticipants = (): JSX.Element[] => {
          return this.props.currentMatch.participants
            .map(this._getParticipantAndVersusPair)
            .flat()
            .slice(0, -1);
        };

        /**
         * Returns the view for the match winner, wrapped in an animation transition component.
         * @return {JSX.Element} The match winner view.
         */
        private _getWinner = (): JSX.Element => (
          <CSSTransition
            in={this.state.currentState === 3}
            timeout={500 / this.props.config!.speed}
            classNames={{
              enter: "",
              enterActive: "match-overlay__winner--entering",
              enterDone: "match-overlay__winner--entered",
              exit: "",
              exitActive: "match-overlay__winner--exiting",
              exitDone: "match-overlay__winner--exited",
            }}
            mountOnEnter={true}
            unmountOnExit={true}
            onEntered={
              !this._hasQueryParam("stop")
                ? this._goToNextStateWithDelay
                : undefined
            }
          >
            <div
              className={classNames("match-overlay__winner")}
              style={{
                transition: `opacity ${500 /
                  this.props.config!.speed}ms ease-in-out`,
              }}
            >
              <ParticipantEntry participant={this.props.currentMatch.winner} />
              <h3>Won The Match!</h3>
              <h5>
                <strong>
                  <em>{this.props.currentMatch.message}</em>
                </strong>
              </h5>
            </div>
          </CSSTransition>
        );

        /**
         * Returns the view for the interim text, wrapped in an animation transition component.
         * @return {JSX.Element} The match overlay interim text.
         */
        private _getInterimText = (): JSX.Element => (
          <CSSTransition
            in={this.state.currentState === 1}
            timeout={500 / this.props.config!.speed}
            classNames={{
              enter: "",
              enterActive: "match-overlay__interim--entering",
              enterDone: "match-overlay__interim--entered",
              exit: "",
              exitActive: "match-overlay__interim--exiting",
              exitDone: "match-overlay__interim--exited",
            }}
            mountOnEnter={true}
            unmountOnExit={true}
            onExited={this._goToNextState}
          >
            <div
              className={classNames("match-overlay__interim")}
              style={{
                transition: `opacity ${500 /
                  this.props.config!.speed}ms ease-in-out`,
              }}
            >
              <h3>Selecting Winner</h3>
              <ClipLoader sizeUnit={"rem"} size={3} />
            </div>
          </CSSTransition>
        );

        /**
         * Lifecycle method that runs before component mount.
         */
        public componentWillMount = (): void => {
          this.setState({
            currentState: 0,
          });
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
            in={isInRange(this.state.currentState, 1, 3)}
            timeout={500 / this.props.config!.speed}
            classNames={{
              enter: "",
              enterActive: "match-overlay-wrapper--entering",
              enterDone: "match-overlay-wrapper--entered",
              exit: "",
              exitActive: "match-overlay-wrapper--exiting",
              exitDone: "match-overlay-wrapper--exited",
            }}
            mountOnEnter={true}
            unmountOnExit={true}
            onExited={this.props.onMatchComplete}
          >
            <div
              className={classNames("match-overlay-wrapper")}
              style={{
                transition: `opacity ${500 /
                  this.props.config!.speed}ms ease-in-out`,
              }}
            >
              <div className={classNames("match-overlay")}>
                {this._getParticipantList()}
                {this._getInterimText()}
                {this._getWinner()}
              </div>
            </div>
          </CSSTransition>
        );
      },
    ),
  ),
);
