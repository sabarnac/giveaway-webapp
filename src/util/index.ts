import { Dispatch, useState } from "react";
import Config from "../store/config/Config";

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
 * Type for custom animation state hook result.
 */
export type AnimationStateHookResult = [
  number,
  () => void,
  (delay: number) => void
];

/**
 * Type for void function.
 */
export type VoidFunction = () => void;

/**
 * Runs the given action at laest after the given delay.
 * @param {Function} action The action to run.
 * @param {number} delay The minimum delay to wait for.
 */
export const runOnDelay = (action: Function, delay: number): void => {
  setTimeout(action, delay);
};

/**
 * Create an animation state hook.
 * @return {AnimationStateHookResult} The current animation state, a state update method, and a delayed state update method.
 */
export const useAnimationState = (): AnimationStateHookResult => {
  const [currentState, setCurrentState]: [number, Dispatch<number>] = useState(
    0,
  );

  const updateState = (): void => setCurrentState(currentState + 1);
  const updateStateDelay = (delay: number): void =>
    runOnDelay(updateState, delay);

  return [currentState, updateState, updateStateDelay];
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
): VoidFunction => () => (predicate ? action() : undefined);
