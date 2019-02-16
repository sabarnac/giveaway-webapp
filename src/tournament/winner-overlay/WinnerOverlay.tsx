import React, { Component } from "react";
import { observer } from "mobx-react";
import "./WinnerOverlay.scss";
import classNames from "classnames";
import Participant from "../../store/round/match/participant/Participant";
import ParticipantCard from "../round/match/participant/card/ParticipantCard";
import Config from "../../store/config/Config";
import { CSSTransition } from "react-transition-group";

interface MatchOverlayProps {
  winner: Participant;
}

interface MatchOverlayState {
  currentState: number;
}

export const createWinnerOverlayComponent = (config: Config) =>
  observer(
    class WinnerOverlay extends Component<
      MatchOverlayProps,
      MatchOverlayState
    > {
      private _isMounted: boolean = false;

      private goToNextState = (): void =>
        this._isMounted
          ? this.setState({ currentState: this.state.currentState + 1 })
          : undefined;

      private getWinner = (): JSX.Element => (
        <div className={classNames("winner-overlay__winner")}>
          <ParticipantCard participant={this.props.winner} />
          <h3>IS THE GIVEAWAY WINNER!</h3>
        </div>
      );

      public componentWillMount = (): void => {
        this.setState({ currentState: 0 });
      };

      public componentDidMount = (): void => {
        this._isMounted = true;
        this.goToNextState();
      };

      public componentWillUnmount = (): void => {
        this._isMounted = false;
      };

      public render = (): JSX.Element => (
        <CSSTransition
          in={this.state.currentState > 0}
          timeout={500}
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
          <div className={classNames("winner-overlay-wrapper")}>
            <div className={classNames("winner-overlay")}>
              {this.getWinner()}
            </div>
          </div>
        </CSSTransition>
      );
    }
  );

export default createWinnerOverlayComponent(Config.instance);
