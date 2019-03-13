import React from "react";
import { observer, inject } from "mobx-react";
import "./LanguageOption.scss";
import classNames from "classnames";
import Config from "../../../store/config/Config";

/**
 * Properties of the language option React component.
 */
interface LanguageOptionProps {
  /** CSS class */
  className: string;
  /** @ignore The application config. */
  config?: Config;
  /** The language option value. */
  language: string;
}

/**
 * React component for the language option.
 */
export default inject("config")(
  observer(
    (props: LanguageOptionProps): JSX.Element => (
      <button
        key={props.language}
        className={classNames(`${props.className}__option`, {
          "button-primary": props.language === props.config!.currentLanguage,
        })}
        onClick={() => props.config!.setCurrentLanguage(props.language)}
      >
        {props.language}
      </button>
    ),
  ),
);
