import React from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import Participant from "../../../../../store/round/match/participant/Participant";
import ParticipantAvatarView from "./_partial/ParticipantAvatarView";
import ParticipantNameView from "./_partial/ParticipantNameView";

/**
 * Properties of the participant card React component.
 */
interface ParticipantViewProps {
  /** The participant details. */
  participant: Participant;
  /** Whether to invert the color of the participant view or not. */
  invert?: boolean;
}

/**
 * Function that returns a React component for the participant view.
 */
export default (className: string) =>
  observer(
    (props: ParticipantViewProps): JSX.Element => (
      <div
        className={classNames("participant", className, {
          "participant--invert": props.invert,
        })}
      >
        <ParticipantAvatarView className={className} {...props} />
        <ParticipantNameView className={className} {...props} />
      </div>
    ),
  );
