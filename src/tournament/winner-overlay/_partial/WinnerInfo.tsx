import React from "react";
import { observer } from "mobx-react";
import "./WinnerInfo.scss";
import classNames from "classnames";
import Participant from "../../../store/round/match/participant/Participant";
import ParticipantCard from "../../round/match/participant/card/ParticipantCard";

/**
 * Properties of the winner info React component.
 */
interface WinnerInfoProps {
  /** CSS class */
  className: string;
  /** The tournament winner. */
  winner: Participant;
}

/**
 * React component for the winner info.
 */
export default observer(
  (props: WinnerInfoProps): JSX.Element => (
    <div className={classNames(`${props.className}__winner`)}>
      <ParticipantCard participant={props.winner} />
      <h3>Won The Giveaway!</h3>
    </div>
  ),
);
