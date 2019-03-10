import React from "react";
import { observer, inject } from "mobx-react";
import "./MatchOverlayParticipants.scss";
import classNames from "classnames";
import Match from "../../../../../store/round/match/Match";
import Participant from "../../../../../store/round/match/participant/Participant";
import ParticipantCard from "../../participant/card/ParticipantCard";

/**
 * Properties of the match overlay participants React component.
 */
interface MatchOverlayParticipantsProps {
  /** CSS class */
  className: string;
  /** The current match details. */
  currentMatch: Match;
}

/**
 * React component for the match overlay participants.
 */
export default inject("config")(
  observer(
    (props: MatchOverlayParticipantsProps): JSX.Element => (
      <div className={classNames(`${props.className}__list`)}>
        {props.currentMatch.participants
          .flatMap(
            (participant: Participant): [JSX.Element, JSX.Element] => [
              <div key={participant.name}>
                <ParticipantCard invert={true} participant={participant} />
              </div>,
              <h3
                className={classNames("versus-text")}
                key={`${participant.name} versus`}
              >
                VS
              </h3>,
            ],
          )
          .slice(0, -1)}
      </div>
    ),
  ),
);
