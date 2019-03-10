import React from "react";
import { observer } from "mobx-react";
import Round from "../../store/round/Round";
import LoserOverlay from "../loser-overlay/LoserOverlay";

/**
 * Properties of the tournament loser overlay view React component.
 */
interface LoserOverlayViewProps {
  /** The details of the current round. */
  round: Round;
  /** Whether to show the loser overlay or not. */
  show: boolean;
  /** Action to call when the view has finished showing the losers. */
  onOverlayComplete: () => void;
}

/**
 * React component for the loser overlay view.
 */
export default observer(
  (props: LoserOverlayViewProps): JSX.Element | null => {
    return props.show ? (
      <LoserOverlay
        losers={props.round.losers}
        onOverlayComplete={props.onOverlayComplete}
      />
    ) : null;
  },
);