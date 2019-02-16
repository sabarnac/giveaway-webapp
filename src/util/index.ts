import { AnimationSpeed } from "../store/config/Config";

export const isDevEnvironment = (): boolean =>
  process.env.NODE_ENV === "development";

export const createAvatarImage = (identifier: string): string => {
  return `https://api.adorable.io/avatars/480/${identifier}`;
};

export const isInRange = (num: number, start: number, end: number): boolean =>
  num >= start && num <= end;

export const getAnimationSpeedValues = (): string[] =>
  Object.keys(AnimationSpeed).filter(
    (key: string): boolean => typeof AnimationSpeed[key as any] === "number"
  );
