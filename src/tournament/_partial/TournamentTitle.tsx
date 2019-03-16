import { inject } from "mobx-react";
import { withTranslation } from "react-i18next";
import TournamentTitle from "./TournamentTitle.react";

/**
 * React component for the tournament title.
 */
export default withTranslation()(inject("config")(TournamentTitle));
