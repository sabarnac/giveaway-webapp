import React, { Fragment } from "react";
import { isDevEnvironment } from "../../util";
import DevTools from "mobx-react-devtools";

/**
 * React component for the tournament application devtools.
 */
export default (): JSX.Element | null =>
  isDevEnvironment() ? (
    <Fragment>
      <DevTools />
    </Fragment>
  ) : null;
