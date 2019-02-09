import React, { Component } from "react";
import { observer } from "mobx-react";
import "./ParticipantCard.scss";
import classNames from "classnames";
import Participant from "../../../store/round/match/participant/Participant";

interface ParticipantCardProps {
  participant: Participant;
}

@observer
class ParticipantCard extends Component<ParticipantCardProps> {
  private getNameView = (): JSX.Element => (
    <div className={classNames("participant-card__name")}>
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
    <div className={classNames("participant-card__avatar")}>
      {this.getAvatarImage()}
    </div>
  );

  public render = (): JSX.Element => {
    return (
      <div className={classNames("participant-card")}>
        {this.getAvatarView()}
        {this.getNameView()}
      </div>
    );
  };
}

export default ParticipantCard;
