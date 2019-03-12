import { observable, computed } from "mobx";
import { createAvatarImage } from "../../../../util";
import Avatar from "./Avatar";
const inflect = require("i")();

interface AvatarJson {
  url: string;
  altText: string;
}

/**
 * Class containing the details of a participant.
 */
export default class Participant {
  /** The ID of the participant. */
  @observable private _id: string;
  /** The name of the participant. */
  @observable private _name: string;
  /** The avatar of the participant. */
  @observable private _avatar: Avatar;
  /** The weight of the participant. */
  @observable private _weight: number;

  /** A counter for generating a unique ID for the match. */
  private static counter: number = 1;

  /**
   * Gets the avatar of the participant if present, or creates a random one,
   * @param  {string} name The name of the participant.
   * @param  {AvatarJson} avatar The avatar details of the participant, if available.
   * @return {Avatar} The generated avatar of the participant.
   */
  private _getOrCreateAvatar = (name: string, avatar?: AvatarJson): Avatar => {
    return avatar
      ? new Avatar(avatar.url, avatar.altText)
      : new Avatar(createAvatarImage(name), name);
  };

  public constructor(name: string, avatar?: AvatarJson, weight: number = 1) {
    this._id = `${Participant.counter++}`;
    this._name = name;
    this._avatar = this._getOrCreateAvatar(name, avatar);
    this._weight = weight;
  }

  /**
   * Get the participant ID.
   * @return {string} The unique ID of the participant.
   */
  @computed public get id(): string {
    return this._id;
  }

  /**
   * Gets the participant name.
   * @return {string} The participant name.
   */
  @computed public get name(): string {
    return this._name;
  }

  /**
   * Gets the capitalized name of the participant.
   * @return {string} The capitalized name.
   */
  @computed public get properName(): string {
    return inflect.titleize(this._name);
  }

  /**
   * Gets the participant avatar, if it exists.
   * @return {string} The participant avatar.
   */
  @computed public get avatar(): Avatar {
    return this._avatar;
  }

  /**
   * Gets the participant weight.
   * @return {number} The participant weight.
   */
  @computed public get weight(): number {
    return this._weight;
  }

  /**
   * Returns whether the two names are equal.
   * @param {string} name1 The first name to compare.
   * @param {string} name2 The second name to compare.
   * @return {boolean} Whether the two names are equal.
   */
  private _isSameName = (name1: string, name2: string): boolean =>
    name1 === name2;

  /**
   * Returns whether the two avatars are equal.
   * @param {Avatar} avatar1 The first avatar to compare.
   * @param {Avatar} avatar2 The second avatar to compare.
   * @return {boolean} Whether the two avatars are equal.
   */
  private _isSameAvatar = (avatar1: Avatar, avatar2: Avatar): boolean =>
    avatar1.equals(avatar2);

  /**
   * Determines whether another participant is identical to the current one.
   * @param  {Participant} otherParticipant The other participant to compare against.
   * @return {boolean} Whether the other participant is equal to the current one.
   */
  public equals = (otherParticipant: Participant): boolean =>
    this._isSameName(this._name, otherParticipant._name) &&
    this._isSameAvatar(this._avatar, otherParticipant._avatar);
}
