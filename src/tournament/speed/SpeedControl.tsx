import React, { Component } from "react";
import { observer, Observer, inject } from "mobx-react";
import "./SpeedControl.scss";
import classNames from "classnames";
import Config from "../../store/config/Config";
import AnimationSpeed from "../../store/config/AnimationSpeed";

/**
 * Properties of the animation speed controller view React component.
 */
interface SpeedControlProps {
  /** @ignore The application config. */
  config?: Config;
}

/**
 * React component for the animation speed controller.
 */
@inject("config")
@observer
export default class SpeedControl extends Component<SpeedControlProps> {
  /**
   * Sets the new animation speed.
   * @param {number} speed The new animation speed.
   */
  private setSpeed = (speed: number): void =>
    this.props.config!.setSpeed(speed);

  /**
   * Returns whether the given animation speed is the current animation speed.
   * @param {number} speed The animation speed to check.
   * @return {boolean} Whether the given animation speed is the current animation speed.
   */
  private isCurrentSpeed = (speed: number): boolean =>
    speed === this.props.config!.speed;

  /**
   * Returns the option view for the given animation speed.
   * @param {number} speed The animation speed.
   * @return {JSX.Element} The animation speed option.
   */
  private getOption = (speed: number): JSX.Element => (
    <Observer
      key={speed}
      render={() => (
        <button
          key={speed}
          className={classNames("speed-control__option", {
            "button-primary": this.isCurrentSpeed(speed)
          })}
          onClick={() => this.setSpeed(speed)}
        >
          {`${speed}X`}
        </button>
      )}
    />
  );

  /**
   * Returns the list of options for all animation speeds.
   * @return {JSX.Element[]} The list of animation speed option views.
   */
  private getOptions = (): JSX.Element[] =>
    AnimationSpeed.getValues().map(this.getOption);

  /**
   * Renders the component.
   * @return {JSX.Element} The rendered component.
   */
  public render = (): JSX.Element => (
    <div className={classNames("speed-control")}>{this.getOptions()}</div>
  );
}
