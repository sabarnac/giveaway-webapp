import React from "react";
import "./TournamentTitle.scss";
import {
  Trans,
  useTranslation,
  UseTranslationResponse,
  WithTranslation,
} from "react-i18next";
import Config from "../../store/config/Config";
const isString = require("is-string");

/**
 * Properties of the tournament title React component.
 */
export interface TournamentTitleProps extends WithTranslation {
  /** @ignore The application config. */
  config?: Config;
}

/**
 * React component for the tournament title.
 */
export default (props: TournamentTitleProps): JSX.Element => {
  const { t }: UseTranslationResponse = useTranslation();
  const translatedTournamentName: string = t("tournamentView.name");

  let tournamentName: string = isString(translatedTournamentName)
    ? translatedTournamentName
    : props.config!.name;

  return (
    <h1>
      <Trans i18nKey="tournamentView.title">
        {{ tournamentName }} Tournament
      </Trans>
    </h1>
  );
};
