export let isDevEnvironment = (): boolean =>
  process.env.NODE_ENV === "development";

export let createAvatarImage = (identifier: string): string => {
  return `https://api.adorable.io/avatars/480/${identifier}`;
};

export let isInRange = (num: number, start: number, end: number): boolean =>
  num >= start && num <= end;
