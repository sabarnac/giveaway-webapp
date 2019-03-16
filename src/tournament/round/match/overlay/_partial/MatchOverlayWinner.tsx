import { inject } from "mobx-react";
import { withRouter } from "react-router";
import { withTranslation } from "react-i18next";
import MatchOverlayWinner from "./MatchOverlayWinner.react";
import { createObserver } from "../../../../../util";

/**
 * React component for the match overlay winner.
 */
export default inject("config")(
  withTranslation()(withRouter(createObserver(MatchOverlayWinner))),
);
