import React, { useEffect } from "react";
import { Observer } from "mobx-react";
import "./LoserOverlayView.scss";
import classNames from "classnames";
import Participant from "../../../store/round/match/participant/Participant";
import {
  AnimationStateHookResult,
  useAnimationState,
  runOnPredicate,
} from "../../../util/index";
import LoserInfo from "./LoserInfo";

/**
 * Properties of the loser overlay React component.
 */
interface LoserOverlayViewProps {
  /** CSS class */
  className: string;
  /** The losers of a round. */
  losers: Participant[];
  /** Action to call when the overlay has finished showing the list of losers. */
  onViewComplete: () => void;
}

/**
 * React component for the loser overlay.
 */
export default (props: LoserOverlayViewProps): JSX.Element => {
  const [
    currentState,
    updateState,
  ]: AnimationStateHookResult = useAnimationState();

  useEffect(
    runOnPredicate(currentState === props.losers.length, props.onViewComplete),
  );

  return (
    <Observer>
      {() => (
        <div className={classNames(props.className)}>
          <h2>Losers</h2>
          {props.losers.map(
            (participant: Participant, index: number): JSX.Element => (
              <LoserInfo
                key={participant.name}
                className={props.className}
                show={currentState === index}
                participant={participant}
                onInfoComplete={updateState}
              />
            ),
          )}
        </div>
      )}
    </Observer>
  );
};
