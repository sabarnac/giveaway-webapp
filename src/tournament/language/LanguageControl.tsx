import { inject } from "mobx-react";
import LanguageControl from "./LanguageControl.react";

/**
 * React component for the language controller.
 */
export default inject("config")(LanguageControl);
