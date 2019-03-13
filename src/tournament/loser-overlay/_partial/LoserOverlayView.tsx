import React, { useEffect } from "react";
import { Observer } from "mobx-react";
import "./LoserOverlayView.scss";
import classNames from "classnames";
import Participant from "../../../store/round/match/participant/Participant";
import {
  AnimationStateHook,
  useAnimationState,
  runOnPredicate,
} from "../../../util/index";
import LoserInfo from "./LoserInfo";
import { Trans } from "react-i18next";

/**
 * Properties of the loser overlay view React component.
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
 * React component for the loser overlay view.
 */
export default (props: LoserOverlayViewProps): JSX.Element => {
  const [currentState, updateState]: AnimationStateHook = useAnimationState();

  useEffect(
    runOnPredicate(currentState === props.losers.length, props.onViewComplete),
  );

  return (
    <Observer>
      {() => (
        <div className={classNames(props.className)}>
          <h2>
            <Trans i18nKey="loserOverlay.title" count={props.losers.length}>
              Losers
            </Trans>
          </h2>
          {props.losers.map(
            (loser: Participant, index: number): JSX.Element => (
              <LoserInfo
                key={loser.name}
                className={props.className}
                show={currentState === index}
                loser={loser}
                onInfoComplete={updateState}
              />
            ),
          )}
        </div>
      )}
    </Observer>
  );
};
