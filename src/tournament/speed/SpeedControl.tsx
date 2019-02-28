import React from "react";
import "./SpeedControl.scss";
import classNames from "classnames";
import AnimationSpeed from "../../store/config/AnimationSpeed";
import SpeedOption from "./_partial/SpeedOption";

const allAnimationValues = AnimationSpeed.getValues();

/**
 * React component for the animation speed controller.
 */
export default (): JSX.Element => (
  <div className={classNames("speed-control")}>
    {allAnimationValues.map(
      (speed: number): JSX.Element => (
        <SpeedOption key={`${speed}-speed`} speed={speed} />
      ),
    )}
  </div>
);
