import React from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import Participant from "../../../../../../store/round/match/participant/Participant";

/**
 * Properties of the participant card React component.
 */
interface ParticipantAvatarViewProps {
  /** CSS class */
  className: string;
  /** The participant details. */
  participant: Participant;
  /** Whether to invert the color of the participant view or not. */
  invert?: boolean;
}

/**
 * Function that returns a React component for the participant view.
 */
export default observer(
  (props: ParticipantAvatarViewProps): JSX.Element => (
    <div className={classNames(`${props.className}__avatar`)}>
      <img
        src={props.participant.avatar.url}
        alt={props.participant.avatar.altText}
      />
    </div>
  ),
);
