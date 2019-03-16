import React from "react";
import "./WinnerOverlayView.scss";
import classNames from "classnames";
import Participant from "../../../store/round/match/participant/Participant";
import WinnerInfo from "./WinnerInfo";

/**
 * Properties of the winner overlay main view React component.
 */
export interface WinnerOverlayViewProps {
  /** CSS class */
  className: string;
  /** The tournament winner. */
  winner: Participant;
}

/**
 * React component for the winner overlay main view wrapper.
 */
export default (props: WinnerOverlayViewProps): JSX.Element => (
  <div className={classNames(props.className)}>
    <WinnerInfo {...props} />
  </div>
);
