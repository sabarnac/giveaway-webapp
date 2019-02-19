import React, { Component } from "react";
import { observer } from "mobx-react";
import "./ParticipantCard.scss";
import classNames from "classnames";
import Participant from "../../../../../store/round/match/participant/Participant";

/**
 * Properties of the participant card React component.
 */
interface ParticipantCardProps {
  /**
   * @type {Participant} The participant details.
   */
  participant: Participant;
  /**
   * @type {boolean} Whether to invert the color of the participant or not.
   */
  invert?: boolean;
}

/**
 * React component for the participant card.
 */
@observer
export default class ParticipantCard extends Component<ParticipantCardProps> {
  /**
   * Returns the name view of the participant.
   * @return {JSX.Element} The name view.
   */
  private getNameView = (): JSX.Element => (
    <div className={classNames("participant-card__name")}>
      <strong>{this.props.participant.name}</strong>
    </div>
  );

  /**
   * Returns the avatar image view of the participant.
   * @return {JSX.Element} The avatar image view.
   */
  private getAvatarImage = (): JSX.Element => (
    <img
      src={this.props.participant.avatar.url}
      alt={this.props.participant.avatar.altText}
    />
  );

  /**
   * Returns the avatar view of the participant.
   * @return {JSX.Element} The avatar view.
   */
  private getAvatarView = (): JSX.Element => (
    <div className={classNames("participant-card__avatar")}>
      {this.getAvatarImage()}
    </div>
  );

  /**
   * Renders the component.
   * @return {JSX.Element} The rendered component.
   */
  public render = (): JSX.Element => (
    <div
      className={classNames("participant", "participant-card", {
        "participant--invert": this.props.invert,
        "participant-card--invert": this.props.invert
      })}
    >
      {this.getAvatarView()}
      {this.getNameView()}
    </div>
  );
}
