import React, { Component } from "react";
import { observer } from "mobx-react";
import "./MatchView.scss";
import classNames from "classnames";
import Match from "../../../store/round/match/Match";
import Participant from "../../../store/round/match/participant/Participant";
import ParticipantEntry from "./participant/entry/ParticipantEntry";

interface MatchViewProps {
  isCurrentMatch: boolean;
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
    return this.props.match.participants.map(
      (participant: Participant): JSX.Element => (
        <ParticipantEntry key={participant.name} participant={participant} />
      )
    );
  };

  private getWinner = (): JSX.Element => {
    return (
      <div className={classNames("match__winner", "match__winner--final")}>
        <ParticipantEntry participant={this.props.match.winner} />
      </div>
    );
  };

  private getParticipant = (id: number): JSX.Element => {
    return (
      <div className={classNames("match__winner", "match__winner--deciding")}>
        <ParticipantEntry participant={this.props.match.participants[id]} />
      </div>
    );
  };

  public render = (): JSX.Element => {
    return (
      <div className={classNames("match")}>
        {this.getParticipantList()}
        {this.props.isCurrentMatch ? this.getParticipant(0) : this.getWinner()}
      </div>
    );
  };
}

export default MatchView;
