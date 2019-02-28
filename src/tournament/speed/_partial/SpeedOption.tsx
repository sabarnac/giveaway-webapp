import React from "react";
import { observer, inject } from "mobx-react";
import "./SpeedOption.scss";
import classNames from "classnames";
import Config from "../../../store/config/Config";

/**
 * Properties of the animation speed controller view React component.
 */
interface SpeedOptionProps {
  /** @ignore The application config. */
  config?: Config;
  /** The speed option value. */
  speed: number;
}

/**
 * React component for the animation speed controller.
 */
export default inject("config")(
  observer(
    (props: SpeedOptionProps): JSX.Element => (
      <button
        key={props.speed}
        className={classNames("speed-control__option", {
          "button-primary": props.speed === props.config!.speed,
        })}
        onClick={() => props.config!.setSpeed(props.speed)}
      >
        {`${props.speed}X`}
      </button>
    ),
  ),
);
