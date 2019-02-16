import React, { Component } from "react";
import { observer, Observer, inject } from "mobx-react";
import "./SpeedControl.scss";
import classNames from "classnames";
import Config, { AnimationSpeed } from "../../store/config/Config";
import { getAnimationSpeedValues } from "../../util";

interface SpeedControlProps {
  config?: Config;
}

@inject("config")
@observer
export default class SpeedControl extends Component<SpeedControlProps> {
  private setSpeed = (speed: string): void =>
    (this.props.config!.speed = (AnimationSpeed as any)[speed]);

  private isCurrentSpeed = (speed: string): boolean =>
    (AnimationSpeed as any)[speed] === this.props.config!.speed;

  private getSpeedValue = (speed: string): AnimationSpeed =>
    (AnimationSpeed as any)[speed];

  private getOption = (speed: string) => (
    <Observer>
      {() => (
        <button
          key={speed}
          className={classNames("speed-control__option", {
            "button-primary": this.isCurrentSpeed(speed)
          })}
          onClick={() => this.setSpeed(speed)}
        >
          {`${this.getSpeedValue(speed)}X`}
        </button>
      )}
    </Observer>
  );

  private getOptions = (): JSX.Element[] =>
    getAnimationSpeedValues().map(this.getOption);

  public render = (): JSX.Element => {
    return (
      <div className={classNames("speed-control")}>{this.getOptions()}</div>
    );
  };
}
