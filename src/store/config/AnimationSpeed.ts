/**
 * Class the provides possible animation speeds.
 */
export default class AnimationSpeed {
  /** A map of possible speeds, and their multiplier values. */
  private static _SPEED_MAP: Map<string, number> = new Map([
    ["HALF", 0.5],
    ["ONE", 1],
    ["ONE_POINT_FIVE", 1.5],
    ["TWO", 2],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20]
  ]);

  /**
   * Returns the speed multiplier of the given key.
   * @param  {string} key The key whose speed multiplier to return.
   * @return {number | undefined} The speed multiplier, or undefined if it doesn't exist.
   */
  public static get = (key: string): number | undefined =>
    AnimationSpeed._SPEED_MAP.get(key);

  /**
   * Returns the list of possible speed multiplier values.
   * @return {number[]} The list of speed multiplier values.
   */
  public static getValues = (): number[] =>
    Array.from(AnimationSpeed._SPEED_MAP.values());

  /**
   * Returns the list of possible speed multiplier keys.
   * @return {string[]} The list of speed multiplier keys.
   */
  public static getKeys = (): string[] =>
    Array.from(AnimationSpeed._SPEED_MAP.keys());

  /**
   * Returns whether the speed multiplier key exists.
   * @param  {string} key The key to check.
   * @return {boolean} Whether the speed multiplier key exists or not.
   */
  public static hasKey = (key: string): boolean =>
    AnimationSpeed._SPEED_MAP.has(key);

  /**
   * Returns whether the speed multiplier value exists.
   * @param  {number} value The value to check.
   * @return {boolean} Whether the speed multiplier value exists or not.
   */
  public static hasValue = (value: number): boolean =>
    AnimationSpeed.getValues().indexOf(value) !== -1;

  /**
   * Returns the list of possible speed multiplier keys and values.
   * @return {[string, number][]} Returns the list of speed multiplier keys and values.
   */
  public static getEntries = (): [string, number][] =>
    Array.from(AnimationSpeed._SPEED_MAP.entries());
}
