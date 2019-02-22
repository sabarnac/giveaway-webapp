export const isDevEnvironment = (): boolean =>
  process.env.NODE_ENV === "development";

export const createAvatarImage = (identifier: string): string => {
  return `https://api.adorable.io/avatars/480/${identifier}`;
};

export const isInRange = (num: number, start: number, end: number): boolean =>
  num >= start && num <= end;