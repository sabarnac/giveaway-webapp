import React from "react";
import { observer } from "mobx-react";
import "./ParticipantCard.scss";
import classNames from "classnames";
import Participant from "../../../../../store/round/match/participant/Participant";

/**
 * Properties of the participant card React component.
 */
interface ParticipantCardProps {
  /** The participant details. */
  participant: Participant;
  /** Whether to invert the color of the participant view or not. */
  invert?: boolean;
}

/**
 * React component for the participant card.
 */
export default observer(
  (props: ParticipantCardProps): JSX.Element => (
    <div
      className={classNames("participant", "participant-card", {
        "participant--invert": props.invert,
        "participant-card--invert": props.invert
      })}
    >
      <div className={classNames("participant-card__avatar")}>
        <img
          src={props.participant.avatar.url}
          alt={props.participant.avatar.altText}
        />
      </div>
      <div className={classNames("participant-card__name")}>
        <strong>{props.participant.properName}</strong>
      </div>
    </div>
  )
);
