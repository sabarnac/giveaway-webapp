import React from "react";
import { observer, inject } from "mobx-react";
import "./WinnerOverlayWrapper.scss";
import classNames from "classnames";
import Participant from "../../../store/round/match/participant/Participant";
import Config from "../../../store/config/Config";
import WinnerOverlayView from "./WinnerOverlayView";

/**
 * Properties of the winner overlay wrapper React component.
 */
interface WinnerOverlayWrapperProps {
  /** @ignore The application config. */
  config?: Config;
  /** The tournament winner. */
  winner: Participant;
}

/**
 * React component for the winner overlay wrapper.
 */
export default inject("config")(
  observer(
    (props: WinnerOverlayWrapperProps): JSX.Element => (
      <div
        className={classNames("winner-overlay-wrapper")}
        style={{
          transition: `opacity ${500 / props.config!.speed}ms ease-in-out`,
        }}
      >
        <WinnerOverlayView winner={props.winner} />
      </div>
    ),
  ),
);
