import React from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import Participant from "../../../../../../store/round/match/participant/Participant";

/**
 * Properties of the participant name React component.
 */
interface ParticipantNameViewProps {
  /** CSS class */
  className: string;
  /** The participant details. */
  participant: Participant;
}

/**
 * Function that returns a React component for the participant name.
 */
export default observer(
  (props: ParticipantNameViewProps): JSX.Element => (
    <div className={classNames(`${props.className}__name`)}>
      <strong>{props.participant.properName}</strong>
    </div>
  ),
);
