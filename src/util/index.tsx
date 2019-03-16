import React, { ComponentType } from "react";
import { Dispatch, useState } from "react";
import Config from "../store/config/Config";
import { Redirect } from "react-router";
import { Observer } from "mobx-react";

/**
 * Returns if it is currently a dev environment.
 * @return {boolean} Whether it is currently a dev environment.
 */
export const isDevEnvironment = (): boolean =>
  process.env.NODE_ENV === "development";

/**
 * Returns a random avatar image URL.
 * @param {string} identifier The identifier to generate the avatar URL against.
 * @return {string} The avatar URL.
 */
export const createAvatarImage = (identifier: string): string => {
  return `https://api.adorable.io/avatars/480/${identifier}`;
};

/**
 * Checks if the number is within the range.
 * @param {number} num The number to check.
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @return {boolean} Whether the number is within the range.
 */
export const isInRange = (num: number, start: number, end: number): boolean =>
  num >= start && num <= end;

/**
 * Type for custom animation state hook.
 */
export type AnimationStateHook = [
  number,
  () => void,
  (delay: number) => void,
  (state: number) => void
];

/**
 * Type for show overlay state hook.
 */
export type ShowOverlayHook = [boolean, (newValue: boolean) => void];

/**
 * Type for void function.
 */
export type VoidFunction = () => void;

/**
 * Runs the given action at least after the given delay.
 * @param {Function} action The action to run.
 * @param {number} delay The minimum delay to wait for.
 */
export const runOnDelay = (action: Function, delay: number): number =>
  setTimeout(action, delay);

/**
 * Create an animation state hook.
 * @return {AnimationStateHook} The current animation state, a state update method, and a delayed state update method.
 */
export const useAnimationState = (start: number = 0): AnimationStateHook => {
  const [currentState, setState]: [number, Dispatch<number>] = useState(start);

  const updateState = (): void => setState(currentState + 1);
  const updateStateDelay = (delay: number): VoidFunction => {
    const delayId: number = runOnDelay(updateState, delay);
    return () => clearTimeout(delayId);
  };

  return [currentState, updateState, updateStateDelay, setState];
};

/**
 * Normalize the given animation time by the animation speed multiplier.
 * @param {number} time The animation time to normalize.
 * @return {number} The normalized animation speed
 */
export const getNormalizedSpeed = (time: number): number =>
  time / Config.getInstance().speed;

/**
 * Runs the given action if the predicate is true.
 * @param {boolean} predicate The predicate to check.
 * @param {Function} action The action to run.
 */
export const runOnPredicate = (
  predicate: boolean,
  action: Function,
): VoidFunction | (() => VoidFunction) => (): void | VoidFunction =>
  predicate ? action() : undefined;

/**
 * Returns a redirect component for a given round and match.
 * @param {string} roundId The ID of the round to redirect to.
 * @param {string} matchId The ID of the match to redirect to.
 * @return {JSX.Element} The redirect element.
 */
export const getMatchRedirect = (roundId?: string, matchId?: string) => (
  <Redirect to={`/round/${roundId}/match/${matchId}`} />
);

/**
 * Returns a HOC with the given component wrapped by a MobX Observer component.
 * @param {ComponentType<T>} Component The component that should be under an observer.
 * @returns {(props: T) => JSX.Element} A HOC that wraps the given component under an observer.
 */
export const createObserver = <T extends {}>(
  Component: ComponentType<T>,
): ((props: T) => JSX.Element) => (props: T): JSX.Element => (
  <Observer>{() => <Component {...props} />}</Observer>
);
