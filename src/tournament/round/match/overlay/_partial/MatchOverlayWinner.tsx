import React from "react";
import { Observer, inject } from "mobx-react";
import { withRouter } from "react-router";
import { withTranslation } from "react-i18next";
import MatchOverlayWinner, {
  MatchOverlayWinnerProps,
} from "./MatchOverlayWinner.react";

/**
 * React component for the match overlay winner.
 */
export default inject("config")(
  withTranslation()(
    withRouter((props: MatchOverlayWinnerProps) => (
      <Observer>{() => <MatchOverlayWinner {...props} />}</Observer>
    )),
  ),
);
