import React from "react";
import classNames from "classnames";
import Participant from "../../../../../store/round/match/participant/Participant";
import ParticipantAvatarView from "./_partial/ParticipantAvatarView";
import ParticipantNameView from "./_partial/ParticipantNameView";

/**
 * Properties of the participant view React component.
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
export default (className: string) => (
  props: ParticipantViewProps,
): JSX.Element => {
  const rootClassName: string = "participant";

  return (
    <div
      className={classNames(rootClassName, className, {
        [`${rootClassName}--invert`]: props.invert,
      })}
    >
      <ParticipantAvatarView className={className} {...props} />
      <ParticipantNameView className={className} {...props} />
    </div>
  );
};
