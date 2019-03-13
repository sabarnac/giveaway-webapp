import React from "react";
import "./LanguageControl.scss";
import { observer, inject } from "mobx-react";
import classNames from "classnames";
import LanguageOption from "./_partial/LanguageOption";
import Config from "../../store/config/Config";

/**
 * Properties of the language controller React component.
 */
interface LanguageControlProps {
  /** @ignore The application config. */
  config?: Config;
}

/**
 * React component for the language controller.
 */
export default inject("config")(
  observer(
    (props: LanguageControlProps): JSX.Element => (
      <div className={classNames("language-control")}>
        {props.config!.languages.map(
          (language: string): JSX.Element => (
            <LanguageOption key={`${language}-language`} language={language} />
          ),
        )}
      </div>
    ),
  ),
);
