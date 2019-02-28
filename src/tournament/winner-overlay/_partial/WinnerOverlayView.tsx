import React from "react";
import { observer } from "mobx-react";
import "./WinnerOverlayView.scss";
import classNames from "classnames";
import Participant from "../../../store/round/match/participant/Participant";
import WinnerInfo from "./WinnerInfo";

/**
 * Properties of the winner overlay main view React component.
 */
interface WinnerOverlayViewProps {
  /** The tournament winner. */
  winner: Participant;
}

/**
 * React component for the winner overlay main view wrapper.
 */
export default observer(
  (props: WinnerOverlayViewProps): JSX.Element => (
    <div className={classNames("winner-overlay")}>
      <WinnerInfo winner={props.winner} />
    </div>
  ),
);
