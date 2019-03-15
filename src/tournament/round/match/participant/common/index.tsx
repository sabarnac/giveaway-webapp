import { observer } from "mobx-react";
import createParticipantViewReact from "./index.react";

/**
 * Function that returns an MobX observer React component for the participant view.
 */
export default (className: string) =>
  observer(createParticipantViewReact(className));
