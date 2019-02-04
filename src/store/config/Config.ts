import Participant, { Avatar } from "../Participant";
import ConfigJson from "./config.json";
import Random, { Engine } from "random-js";
import { observable, action } from "mobx";

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
export enum AnimationSpeed {
  HALF = 0.5,
  ONE = 1,
  ONE_POINT_FIVE = 1.5,
  TWO = 2,
  FIVE = 5,
  TEN = 10,
  TWENTY = 20,
}

/**
 * Class representing the basic configuration of the application.
 */
class Config {
  @observable private _randomGenerator: Random;
  @observable private _messages: string[];
  @observable private _allParticipants: Participant[];
  @observable private _participantsPerMatch: number;
  @observable private _speed: AnimationSpeed;

  private _getRandomGenerator = (): Random => {
    const randomEngine: Engine = Random.engines.mt19937();
    return new Random(randomEngine);
  };

  private _getMessage = (): string[] => ConfigJson.messages;

  private _createParticipant = (user: string | ParticipantJson): Participant =>
    typeof user === "string"
      ? new Participant(user)
      : new Participant(
          (<ParticipantJson>user).name,
          this._createAvatar((<ParticipantJson>user).avatar),
        );

  private _createAvatar = (avatar?: AvatarJson): Avatar | undefined =>
    avatar ? new Avatar(avatar.url, avatar.altText) : undefined;

  private _getParticipants = (): Participant[] =>
    ConfigJson.users.map(this._createParticipant);

  private _getParticipantsPerMatch = (): number =>
    ConfigJson.participantsPerMatch;

  private _getSpeed = (): AnimationSpeed => AnimationSpeed.ONE;

  constructor() {
    this._randomGenerator = this._getRandomGenerator();
    this._messages = this._getMessage();
    this._allParticipants = this._getParticipants();
    this._participantsPerMatch = this._getParticipantsPerMatch();
    this._speed = this._getSpeed();
  }

  /**
   * Get the random generator.
   * @return {Random}
   */
  public get randomGenerator(): Random {
    return this._randomGenerator;
  }

  /**
   * Get the list of winner/loser messages.
   * @return {string[]}
   */
  public get messages(): string[] {
    return this._messages;
  }

  /**
   * Get the list of all participants in the giveaway.
   * @return {Participant[]}
   */
  public get allParticipants(): Participant[] {
    return this._allParticipants;
  }

  /**
   * Get the number of participants per match.
   * @return {AnimationSpeed}
   */
  public get participantsPerMatch(): AnimationSpeed {
    return this._participantsPerMatch;
  }

  /**
   * Get the speed multiplier for animations.
   * @return {AnimationSpeed}
   */
  public get speed(): AnimationSpeed {
    return this._speed;
  }

  /**
   * Set the speed multiplier for animations.
   * @param {AnimationSpeed} value The new speed multiplier value.
   * @returns {AnimationSpeed} The set speed multiplier value.
   */
  @action public setSpeed = (value: AnimationSpeed): AnimationSpeed =>
    (this._speed = value);
}

export default new Config();
