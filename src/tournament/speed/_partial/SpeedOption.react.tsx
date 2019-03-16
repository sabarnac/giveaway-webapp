import React from "react";
import "./SpeedOption.scss";
import classNames from "classnames";
import Config from "../../../store/config/Config";

/**
 * Properties of the animation speed option React component.
 */
export interface SpeedOptionProps {
  /** CSS class */
  className: string;
  /** @ignore The application config. */
  config?: Config;
  /** The animation speed option value. */
  speed: number;
}

/**
 * React component for the animation speed option.
 */
export default (props: SpeedOptionProps): JSX.Element => (
  <button
    key={props.speed}
    className={classNames(`${props.className}__option`, {
      "button-primary": props.speed === props.config!.speed,
    })}
    onClick={() => props.config!.setSpeed(props.speed)}
  >
    {`${props.speed}x`}
  </button>
);
