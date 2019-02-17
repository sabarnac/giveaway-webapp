import Participant, { Avatar } from "../round/match/participant/Participant";
import ConfigJson from "./config.json";
import { observable, computed, action } from "mobx";
import RandomGenerator from "./RandomGenerator";

/**
 * Interface for JSON object representing avatar details.
 */
interface AvatarJson {
  url: string;
  altText: string;
}

/**
 * Interface for JSON object representing participant details.
 */
interface ParticipantJson {
  name: string;
  avatar?: AvatarJson;
}

/**
 * Class the provides possible animation speeds.
 */
export class AnimationSpeed {
  /**
   * @type {Map<string, number>} A map of possible speeds, and their multiplier values.
   */
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
   * @returns {number | undefined} The speed multiplier, or undefined if it doesn't exist.
   */
  public static get = (key: string): number | undefined =>
    AnimationSpeed._SPEED_MAP.get(key);

  /**
   * Returns the list of possible speed multiplier values.
   * @returns {number[]} The list of speed multiplier values.
   */
  public static getValues = (): number[] =>
    Array.from(AnimationSpeed._SPEED_MAP.values());

  /**
   * Returns the list of possible speed multiplier keys.
   * @returns {string[]} The list of speed multiplier keys.
   */
  public static getKeys = (): string[] =>
    Array.from(AnimationSpeed._SPEED_MAP.keys());

  /**
   * Returns whether the speed multiplier key exists.
   * @param  {string} key The key to check.
   * @returns {boolean} Whether the speed multiplier key exists or not.
   */
  public static hasKey = (key: string): boolean =>
    AnimationSpeed._SPEED_MAP.has(key);

  /**
   * Returns whether the speed multiplier value exists.
   * @param  {number} value The value to check.
   * @returns {boolean} Whether the speed multiplier value exists or not.
   */
  public static hasValue = (value: number): boolean =>
    AnimationSpeed.getValues().indexOf(value) !== -1;

  /**
   * Returns the list of possible speed multiplier keys and values.
   * @returns {[string, number][]} Returns the list of speed multiplier keys and values.
   */
  public static getEntries = (): [string, number][] =>
    Array.from(AnimationSpeed._SPEED_MAP.entries());
}

/**
 * Class representing the basic configuration of the application.
 */
export default class Config {
  /**
   * @type {Map<string, number>} A map of possible speeds, and their multiplier values.
   */
  @observable private _messages: string[];
  @observable private _allParticipants: Participant[];
  @observable private _participantsPerMatch: number;
  @observable private _speed: number;
  private _unusedMessages: string[];
  private _usedMessages: string[];

  private static _instance: Config | null = null;

  private _getMessages = (): string[] => ConfigJson.messages;

  private _createParticipant = (user: string | ParticipantJson): Participant =>
    typeof user === "string"
      ? new Participant(user)
      : new Participant(
          (<ParticipantJson>user).name,
          this._createAvatar((<ParticipantJson>user).avatar)
        );

  private _createAvatar = (avatar?: AvatarJson): Avatar | undefined =>
    avatar ? new Avatar(avatar.url, avatar.altText) : undefined;

  private _getParticipants = (): Participant[] =>
    ConfigJson.users.map(this._createParticipant);

  private _getParticipantsPerMatch = (): number =>
    ConfigJson.participantsPerMatch;

  private _getSpeed = (): number => AnimationSpeed.get("ONE") as number;

  private _shouldAppend = (index: number, participantSize: number): boolean =>
    index === participantSize - 1 && participantSize > 1;

  private _appendToLastParticipant = (
    participantSize: number,
    stringToAppend: string
  ): ((name: string, index: number) => string) => (
    name: string,
    index: number
  ): string =>
    this._shouldAppend(index, participantSize)
      ? `${stringToAppend} ${name}`
      : name;

  private _formatLosers = (names: string[]): string =>
    names.map(this._appendToLastParticipant(names.length, "and")).join(", ");

  private constructor() {
    this._messages = this._getMessages();
    this._unusedMessages = RandomGenerator.shuffle([...this._messages]);
    this._usedMessages = [];
    this._allParticipants = this._getParticipants();
    this._participantsPerMatch = this._getParticipantsPerMatch();
    this._speed = this._getSpeed();
  }

  /**
   * Get an instance of the config, which is a singleton.
   * @returns {Config} The instance of a config.
   */
  public static getInstance(): Config {
    return Config._instance
      ? Config._instance
      : (Config._instance = new Config());
  }

  /**
   * Get the list of winner/loser messages.
   * @returns {string[]} The list of mesasges.
   */
  @computed public get messages(): string[] {
    return [...this._messages];
  }

  /**
   * Gets a random message with the winner and loser.
   * @param {string} winnerName The name of the winner.
   * @param {string[]} loserNames The names of the losers.
   * @returns {string} The formatted message.
   */
  public getRandomMessage(winnerName: string, loserNames: string[]): string {
    if (this._usedMessages.length === 0) {
      this._unusedMessages = RandomGenerator.shuffle([...this._messages]);
      this._usedMessages = [];
    }
    const message = RandomGenerator.pick(this._unusedMessages);
    this._unusedMessages.splice(this._unusedMessages.indexOf(message));
    this._usedMessages.push(message);
    return message
      .replace("#winner", winnerName)
      .replace("#loser", this._formatLosers(loserNames));
  }

  /**
   * Get the list of all participants in the tournament.
   * @returns {Participant[]} The list of all participants.
   */
  @computed public get allParticipants(): Participant[] {
    return this._allParticipants;
  }

  /**
   * Get the number of participants per match.
   * @returns {number} The number of participants per match.
   */
  @computed public get participantsPerMatch(): number {
    return this._participantsPerMatch;
  }

  /**
   * Get the speed multiplier for animations.
   * @returns {number} The speed multiplier value.
   */
  @computed public get speed(): number {
    return this._speed;
  }

  /**
   * Set the speed multiplier for animations.
   * @param {number} value The new speed multiplier value.
   */
  @action public setSpeed(value: number): void {
    if (AnimationSpeed.hasValue(value)) {
      this._speed = value;
    } else {
      console.error(`Illegal value '${value}' for speed`);
    }
  }
}
