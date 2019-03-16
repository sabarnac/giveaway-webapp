import React from "react";
import { Observer } from "mobx-react";
import MatchOverlay, { MatchOverlayProps } from "./MatchOverlay.react";

/**
 * React component for the match overlay.
 */
export default (props: MatchOverlayProps): JSX.Element => (
  <Observer>{() => <MatchOverlay {...props} />}</Observer>
);
