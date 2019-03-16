import React from "react";
import classNames from "classnames";
import Participant from "../../../../../../store/round/match/participant/Participant";

/**
 * Properties of the participant avatar React component.
 */
interface ParticipantAvatarViewProps {
  /** CSS class */
  className: string;
  /** The participant details. */
  participant: Participant;
}

/**
 * Function that returns a React component for the participant avatar.
 */
export default (props: ParticipantAvatarViewProps): JSX.Element | null => {
  if (props.participant.avatar === undefined) {
    return null;
  }

  return (
    <div className={classNames(`${props.className}__avatar`)}>
      <img
        src={props.participant.avatar.url}
        alt={props.participant.avatar.altText}
      />
    </div>
  );
};
