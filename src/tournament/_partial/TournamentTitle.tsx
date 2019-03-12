import React from "react";
import { inject, observer } from "mobx-react";
import "./TournamentTitle.scss";
import { Trans } from "react-i18next";
import Config from "../../store/config/Config";

/**
 * Properties of the tournament title React component.
 */
interface TournamentTitleProps {
  /** @ignore The application config. */
  config?: Config;
}

/**
 * React component for the tournament title.
 */
export default inject("config")(
  observer(
    (props: TournamentTitleProps): JSX.Element => {
      const tournamentName: string = props.config!.name;

      return (
        <h1>
          <Trans i18nKey="tournamentView.title">
            {{ tournamentName }} Tournament
          </Trans>
        </h1>
      );
    },
  ),
);
