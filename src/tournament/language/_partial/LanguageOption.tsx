import { observer, inject } from "mobx-react";
import LanguageOption from "./LanguageOption.react";

/**
 * React component for the language option.
 */
export default inject("config")(observer(LanguageOption));
