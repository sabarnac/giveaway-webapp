import React from "react";
import { observer } from "mobx-react";
import "./ParticipantEntry.scss";
import classNames from "classnames";
import Participant from "../../../../../store/round/match/participant/Participant";

/**
 * Properties of the participant entry React component.
 */
interface ParticipantEntryProps {
  /** The participant details. */
  participant: Participant;
  /** Whether to invert the color of the participant view or not. */
  invert?: boolean;
}

/**
 * React component for the participant entry.
 */
export default observer(
  (props: ParticipantEntryProps): JSX.Element => (
    <div
      className={classNames("participant", "participant-entry", {
        "participant--invert": props.invert,
        "participant-entry--invert": props.invert
      })}
    >
      <div className={classNames("participant-entry__avatar")}>
        <img
          src={props.participant.avatar.url}
          alt={props.participant.avatar.altText}
        />
      </div>
      <div className={classNames("participant-entry__name")}>
        <strong>{props.participant.properName}</strong>
      </div>
    </div>
  )
);
