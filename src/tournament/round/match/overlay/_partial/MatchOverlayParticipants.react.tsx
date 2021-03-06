import React from "react";
import "./MatchOverlayParticipants.scss";
import classNames from "classnames";
import Match from "../../../../../store/round/match/Match";
import Participant from "../../../../../store/round/match/participant/Participant";
import ParticipantCard from "../../participant/card/ParticipantCard";
import { Trans, WithTranslation } from "react-i18next";

/**
 * Properties of the match overlay participants React component.
 */
export interface MatchOverlayParticipantsProps extends WithTranslation {
  /** CSS class */
  className: string;
  /** The current match details. */
  currentMatch: Match;
}

/**
 * React component for the match overlay participants.
 */
export default (props: MatchOverlayParticipantsProps): JSX.Element => (
  <div className={classNames(`${props.className}__list`)}>
    {props.currentMatch.participants
      .flatMap(
        (participant: Participant): [JSX.Element, JSX.Element] => [
          <div key={participant.id}>
            <ParticipantCard invert={true} participant={participant} />
          </div>,
          <h3
            className={classNames("versus-text")}
            key={`${participant.id} versus`}
          >
            <Trans
              i18nKey="matchOverlay.versus"
              count={props.currentMatch.participants.length}
            >
              VS
            </Trans>
          </h3>,
        ],
      )
      .slice(0, -1)}
  </div>
);
