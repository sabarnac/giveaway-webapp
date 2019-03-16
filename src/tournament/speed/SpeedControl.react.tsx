import React from "react";
import "./SpeedControl.scss";
import classNames from "classnames";
import AnimationSpeed from "../../store/config/AnimationSpeed";
import SpeedOption from "./_partial/SpeedOption";

const allAnimationValues = AnimationSpeed.getValues();

/**
 * React component for the animation speed controller.
 */
export default (props: {}): JSX.Element => {
  const className: string = "speed-control";

  return (
    <div className={classNames(className)}>
      {allAnimationValues.map(
        (speed: number): JSX.Element => (
          <SpeedOption
            className={className}
            key={`${speed}-speed`}
            speed={speed}
          />
        ),
      )}
    </div>
  );
};
