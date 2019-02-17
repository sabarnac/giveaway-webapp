import React, { Component } from "react";
import { observer, Observer, inject } from "mobx-react";
import "./SpeedControl.scss";
import classNames from "classnames";
import Config, { AnimationSpeed } from "../../store/config/Config";

interface SpeedControlProps {
  config?: Config;
}

@inject("config")
@observer
export default class SpeedControl extends Component<SpeedControlProps> {
  private setSpeed = (speed: number): void =>
    this.props.config!.setSpeed(speed);

  private isCurrentSpeed = (speed: number): boolean =>
    speed === this.props.config!.speed;

  private getOption = (speed: number) => (
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

  private getOptions = (): JSX.Element[] =>
    AnimationSpeed.getValues().map(this.getOption);

  /**
   * Renders the component.
   * @returns {JSX.Element} The rendered component.
   */
  public render = (): JSX.Element => (
    <div className={classNames("speed-control")}>{this.getOptions()}</div>
  );
}
