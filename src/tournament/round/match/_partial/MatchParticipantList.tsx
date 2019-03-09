import React from "react";
import { observer } from "mobx-react";
import "./MatchParticipantList.scss";
import classNames from "classnames";
import Match from "../../../../store/round/match/Match";
import Participant from "../../../../store/round/match/participant/Participant";
import ParticipantEntry from "../participant/entry/ParticipantEntry";

/**
 * Properties of the match view React component.
 */
interface MatchParticipantListProps {
  /** The details of the current match. */
  match: Match;
}

/**
 * React component for the match view.
 */
export default observer(
  (props: MatchParticipantListProps): JSX.Element => (
    <div className={classNames("match__list")}>
      {props.match.participants.map(
        (participant: Participant): JSX.Element => (
          <ParticipantEntry key={participant.name} participant={participant} />
        ),
      )}
    </div>
  ),
);
