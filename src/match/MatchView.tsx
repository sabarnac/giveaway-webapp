import React, { Component } from "react";
import { observer } from "mobx-react";
import "./MatchView.scss";
import classNames from "classnames";
import Match from "../store/round/match/Match";
import Participant from "../store/round/match/participant/Participant";
import ParticipantEntry from "./participant/entry/ParticipantEntry";

interface MatchViewProps {
  match: Match;
}

@observer
class MatchView extends Component<MatchViewProps> {
  private getParticipantList = (): JSX.Element => {
    return (
      <div className={classNames("match__list")}>{this.getParticipants()}</div>
    );
  };

  private getParticipants = (): JSX.Element[] => {
    return this.props.match.participants.map((participant: Participant) => (
      <ParticipantEntry key={participant.name} participant={participant} />
    ));
  };

  private getWinner = (): JSX.Element => {
    return (
      <div className={classNames("match__winner")}>
        <ParticipantEntry participant={this.props.match.winner} />
      </div>
    );
  };

  public render = (): JSX.Element => {
    return (
      <div className={classNames("match")}>
        {this.getParticipantList()}
        {this.getWinner()}
      </div>
    );
  };
}

export default MatchView;
