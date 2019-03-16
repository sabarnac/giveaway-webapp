import React from "react";
import "./LanguageControl.scss";
import classNames from "classnames";
import LanguageOption from "./_partial/LanguageOption";
import Config from "../../store/config/Config";

/**
 * Properties of the language controller React component.
 */
export interface LanguageControlProps {
  /** @ignore The application config. */
  config?: Config;
}

/**
 * React component for the language controller.
 */
export default (props: LanguageControlProps): JSX.Element => {
  const className: string = "language-control";

  return (
    <div className={classNames(className)}>
      {props.config!.languages.map(
        (language: string): JSX.Element => (
          <LanguageOption
            key={`${language}-language`}
            className={className}
            language={language}
          />
        ),
      )}
    </div>
  );
};
