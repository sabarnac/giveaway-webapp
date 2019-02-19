import { observable, computed } from "mobx";
import { createAvatarImage } from "../../../../util";

interface AvatarJson {
  url: string;
  altText: string;
}

/**
 * Class containing the details of a participants' avatar.
 */
export class Avatar {
  /**
   * @type {string} The URL of the avatar image.
   */
  @observable private _url: string;
  /**
   * @type {string} The alternate text for the image.
   */
  @observable private _altText: string;

  public constructor(url: string, altText: string) {
    this._url = url;
    this._altText = altText;
  }

  /**
   * Gets the avatar URL.
   * @return {string} The avatar URL.
   */
  @computed public get url(): string {
    return this._url;
  }

  /**
   * Gets the avatar image alternate text.
   * @return {string} The avatar image alternate text.
   */
  @computed public get altText(): string {
    return this._altText;
  }

  /**
   * Returns whether the two given URLs are equal.
   * @param {string} url1 The first URL to compare.
   * @param {string} url2 The second URL to compare.
   * @return {boolean} Whether the two URLs are equal.
   */
  private _isSameUrl = (url1: string, url2: string): boolean => url1 === url2;

  /**
   * Returns whether the two alternate texts are equal.
   * @param {string} altText1 The first alternate text to compare.
   * @param {string} altText2 The second alternate text to compare.
   * @return {boolean} Whether the two alternate texts are equal.
   */
  private _isSameAltText = (altText1: string, altText2: string): boolean =>
    altText1 === altText2;

  /**
   * Determines whether another avatar is identical to the current one.
   * @param  {Avatar} otherAvatar The other avatar to compare against.
   * @return {boolean} Whether the other avatar is equal to the current one.
   */
  public equals = (otherAvatar: Avatar): boolean =>
    this._isSameUrl(this._url, otherAvatar._url) &&
    this._isSameAltText(this._altText, otherAvatar._altText);
}

/**
 * Class containing the details of a participant.
 */
export default class Participant {
  /**
   * @type {string} The name of the participant.
   */
  @observable private _name: string;
  /**
   * @type {Avatar} The avatar of the participant
   */
  @observable private _avatar: Avatar;

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

  public constructor(name: string, avatar?: AvatarJson) {
    this._name = name;
    this._avatar = this._getOrCreateAvatar(name, avatar);
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
    return this._name.replace(/\w\S*/g, (subText: string) => {
      return subText.charAt(0).toUpperCase() + subText.substr(1).toLowerCase();
    });
  }

  /**
   * Gets the participant avatar, if it exists.
   * @return {string} The participant avatar.
   */
  @computed public get avatar(): Avatar {
    return this._avatar;
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
