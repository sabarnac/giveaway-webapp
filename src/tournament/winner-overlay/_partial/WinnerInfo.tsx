import React from "react";
import { observer } from "mobx-react";
import "./WinnerInfo.scss";
import classNames from "classnames";
import Participant from "../../../store/round/match/participant/Participant";
import ParticipantCard from "../../round/match/participant/card/ParticipantCard";
import { Trans } from "react-i18next";

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
      <h3>
        <Trans i18nKey="winnerOverlay.message">Won The Giveaway!</Trans>
      </h3>
    </div>
  ),
);
