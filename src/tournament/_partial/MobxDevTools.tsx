import React from "react";
import { isDevEnvironment } from "../../util";
import DevTools from "mobx-react-devtools";

/**
 * React component for the animation speed controller.
 */
export default (): JSX.Element | null =>
  isDevEnvironment() ? <DevTools /> : null;
