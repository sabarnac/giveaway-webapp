import React from "react";
import { Observer } from "mobx-react";
import MatchOverlayInterim, {
  MatchOverlayInterimProps,
} from "./MatchOverlayInterim.react";
import { withTranslation } from "react-i18next";

/**
 * React component for the match overlay interim.
 */
export default withTranslation()((props: MatchOverlayInterimProps) => (
  <Observer>{() => <MatchOverlayInterim {...props} />}</Observer>
));
