import { observer, inject } from "mobx-react";
import SpeedOption from "./SpeedOption.react";

/**
 * React component for the animation speed option.
 */
export default inject("config")(observer(SpeedOption));
