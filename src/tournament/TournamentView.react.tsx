import React, { useState, useEffect } from "react";
import "./TournamentView.scss";
import classNames from "classnames";
import Tournament from "../store/Tournament";
import {
  AnimationStateHook,
  useAnimationState,
  ShowOverlayHook,
  runOnPredicate,
  getMatchRedirect,
} from "../util";
import RoundView from "./round/RoundView";
import Round from "../store/round/Round";
import WinnerOverlay from "./winner-overlay/WinnerOverlay";
import SpeedControl from "./speed/SpeedControl";
import AppDevTools from "./_partial/AppDevTools";
import LoserOverlayView from "./_partial/LoserOverlayView";
import TournamentTitle from "./_partial/TournamentTitle";
import LanguageControl from "./language/LanguageControl";
import ServiceWorkerUpdateAlert from "../service-worker/ServiceWorkerUpdateAlert";
import ServiceWorkerAddAlert from "../service-worker/ServiceWorkerAddAlert";

/**
 * Properties of the tournament view React component.
 */
export interface TournamentViewProps {
  /** The ID of the current round. */
  roundId: string;
  /** The ID of the current match. */
  matchId: string;
  /** The details of the tournament. */
  tournament: Tournament;
}

/**
 * Returns a redirect to the given round and match if required.
 * @param {boolean} required Whether the redirect is required or not.
 * @param {Tournament} tournament The details of the tournament.
 * @param {number} roundIndex The index of the round to redirect to.
 * @param {number} matchIndex The index of the match to redirect to.
 * @return {JSX.Element | null} The redirect if it is required, or null if it is not.
 */
export const getRoundRedirectIfRequired = (
  required: boolean = false,
  tournament: Tournament,
  roundIndex: number,
  matchIndex: number,
): JSX.Element | null =>
  required
    ? getMatchRedirect(
        tournament.rounds[roundIndex].id,
        tournament.rounds[roundIndex].matches[matchIndex].id,
      )
    : null;

/**
 * React component for the tournament view.
 */
export default (props: TournamentViewProps): JSX.Element => {
  const currentRoundIndex: number = props.tournament.rounds.findIndex(
    (round: Round): boolean => round.id === props.roundId,
  );
  const isLastRound: boolean = props.tournament.lastRound.id === props.roundId;

  const [showOverlay, setShowOverlay]: ShowOverlayHook = useState(false);

  const [
    currentState,
    updateState,
    ,
    setState,
  ]: AnimationStateHook = useAnimationState();
  const shouldNextRedirect: boolean =
    currentState > 0 &&
    currentRoundIndex + 1 !== currentState &&
    currentState <= props.tournament.rounds.length;

  useEffect(
    runOnPredicate(currentState === 0, () => setState(currentRoundIndex + 1)),
  );

  return (
    <div
      key={`round-${currentRoundIndex}`}
      className={classNames("tournament")}
    >
      <TournamentTitle />
      <RoundView
        key={`${props.roundId}`}
        show={currentState === currentRoundIndex + 1}
        round={props.tournament.rounds[currentRoundIndex]}
        matchId={props.matchId}
        onRoundComplete={() => setShowOverlay(true)}
      />
      <LoserOverlayView
        show={showOverlay && !isLastRound}
        round={props.tournament.rounds[currentRoundIndex]}
        onOverlayComplete={() => {
          setShowOverlay(false);
          updateState();
        }}
      />
      <WinnerOverlay
        show={showOverlay && isLastRound}
        winner={props.tournament.winner}
      />
      {getRoundRedirectIfRequired(
        currentRoundIndex === -1,
        props.tournament,
        0,
        0,
      )}
      {getRoundRedirectIfRequired(
        shouldNextRedirect,
        props.tournament,
        Math.max(currentRoundIndex, currentState - 1),
        0,
      )}
      <SpeedControl />
      <LanguageControl />
      <ServiceWorkerAddAlert />
      <ServiceWorkerUpdateAlert />
      <AppDevTools />
    </div>
  );
};
