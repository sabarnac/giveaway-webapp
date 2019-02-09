import React, { Component } from "react";
import { observer } from "mobx-react";
import "./ParticipantEntry.scss";
import classNames from "classnames";
import Participant from "../../../store/round/match/participant/Participant";

interface ParticipantEntryProps {
  participant: Participant;
}

@observer
class ParticipantEntry extends Component<ParticipantEntryProps> {
  private getNameView = (): JSX.Element => (
    <div className={classNames("participant-entry__name")}>
      <strong>{this.props.participant.name}</strong>
    </div>
  );

  private getAvatarImage = (): JSX.Element => (
    <img
      src={this.props.participant.avatar.url}
      alt={this.props.participant.avatar.altText}
    />
  );

  private getAvatarView = (): JSX.Element => (
    <div className={classNames("participant-entry__avatar")}>
      {this.getAvatarImage()}
    </div>
  );

  public render = (): JSX.Element => {
    return (
      <div className={classNames("participant-entry")}>
        {this.getAvatarView()}
        {this.getNameView()}
      </div>
    );
  };
}

export default ParticipantEntry;
