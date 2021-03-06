import React from "react";
import "./MatchParticipantList.scss";
import classNames from "classnames";
import Match from "../../../../store/round/match/Match";
import Participant from "../../../../store/round/match/participant/Participant";
import ParticipantEntry from "../participant/entry/ParticipantEntry";

/**
 * Properties of the match participant list React component.
 */
export interface MatchParticipantListProps {
  /** CSS class */
  className: string;
  /** The details of the current match. */
  match: Match;
}

/**
 * React component for the match participant list.
 */
export default (props: MatchParticipantListProps): JSX.Element => (
  <div className={classNames(`${props.className}__list`)}>
    {props.match.participants.map(
      (participant: Participant): JSX.Element => (
        <ParticipantEntry key={participant.id} participant={participant} />
      ),
    )}
  </div>
);
