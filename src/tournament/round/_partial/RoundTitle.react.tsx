import React from "react";
import "./RoundTitle.scss";
import Round from "../../../store/round/Round";
import { Trans, WithTranslation } from "react-i18next";

/**
 * Properties of the round title React component.
 */
interface RoundTitleProps extends WithTranslation {
  /** The details of the current round. */
  round: Round;
}

/**
 * React component for the round title.
 */
export default (props: RoundTitleProps): JSX.Element => {
  const roundId: string = props.round.id;
  return (
    <h2>
      <Trans i18nKey="roundView.title">Round {{ roundId }}</Trans>
    </h2>
  );
};
