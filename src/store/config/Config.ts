import Participant, { Avatar } from "../round/match/participant/Participant";
import ConfigJson from "./config.json";
import { observable, computed, action } from "mobx";

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
 * Enumeration of possible animation speeds.
 */
export class AnimationSpeed {
  private static _SPEED_MAP: Map<string, number> = new Map([
    ["HALF", 0.5],
    ["ONE", 1],
    ["ONE_POINT_FIVE", 1.5],
    ["TWO", 2],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20]
  ]);

  public static get = (key: string): number | undefined =>
    AnimationSpeed._SPEED_MAP.get(key);

  public static getValues = (): number[] =>
    Array.from(AnimationSpeed._SPEED_MAP.values());

  public static getKeys = (): string[] =>
    Array.from(AnimationSpeed._SPEED_MAP.keys());

  public static hasKey = (key: string): boolean =>
    AnimationSpeed._SPEED_MAP.has(key);

  public static hasValue = (value: number): boolean =>
    AnimationSpeed.getValues().indexOf(value) !== -1;

  public static getEntries = (): [string, number][] =>
    Array.from(AnimationSpeed._SPEED_MAP.entries());
}

/**
 * Class representing the basic configuration of the application.
 */
export default class Config {
  @observable private _messages: string[];
  @observable private _allParticipants: Participant[];
  @observable private _participantsPerMatch: number;
  @observable private _speed: number;

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

  private constructor() {
    this._messages = this._getMessages();
    this._allParticipants = this._getParticipants();
    this._participantsPerMatch = this._getParticipantsPerMatch();
    this._speed = this._getSpeed();
  }

  public static getInstance(): Config {
    return Config._instance
      ? Config._instance
      : (Config._instance = new Config());
  }

  /**
   * Get the list of winner/loser messages.
   * @return {string[]}
   */
  @computed public get messages(): string[] {
    return [...this._messages];
  }

  /**
   * Get the list of all participants in the giveaway.
   * @return {Participant[]}
   */
  @computed public get allParticipants(): Participant[] {
    return this._allParticipants;
  }

  /**
   * Get the number of participants per match.
   * @return {number}
   */
  @computed public get participantsPerMatch(): number {
    return this._participantsPerMatch;
  }

  /**
   * Get the speed multiplier for animations.
   * @return {number}
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
