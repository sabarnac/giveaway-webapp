import React from "react";
import Match from "../../../../store/round/match/Match";
import MatchOverlay from "../overlay/MatchOverlay";

/**
 * Properties of the match view React component.
 */
interface MatchFinalEntryProps {
  /** The details of the current match. */
  match: Match;
  /** Whether to show the match overlay or not. */
  show: boolean;
  /** Action to call when the match overlay has completed. */
  onOverlayComplete: () => void;
}

/**
 * React component for the match view.
 */
export default (props: MatchFinalEntryProps): JSX.Element | null =>
  props.show ? (
    <MatchOverlay
      currentMatch={props.match}
      onMatchComplete={props.onOverlayComplete}
    />
  ) : null;
