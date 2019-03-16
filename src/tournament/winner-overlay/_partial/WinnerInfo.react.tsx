import React from "react";
import "./WinnerInfo.scss";
import classNames from "classnames";
import Participant from "../../../store/round/match/participant/Participant";
import ParticipantCard from "../../round/match/participant/card/ParticipantCard";
import { Trans, WithTranslation } from "react-i18next";

/**
 * Properties of the winner info React component.
 */
export interface WinnerInfoProps extends WithTranslation {
  /** CSS class */
  className: string;
  /** The tournament winner. */
  winner: Participant;
}

/**
 * React component for the winner info.
 */
export default (props: WinnerInfoProps): JSX.Element => (
  <div className={classNames(`${props.className}__winner`)}>
    <Trans i18nKey="winnerOverlay.message">
      <ParticipantCard participant={props.winner} />
      <h3>Won The Tournament!</h3>
    </Trans>
  </div>
);
