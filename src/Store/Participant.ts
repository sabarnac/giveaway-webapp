import { observable, computed } from "mobx";
import { createAvatarImage } from "../util";

/**
 * Class containing the details of a participants' avatar.
 */
export class Avatar {
  @observable private _url: string;
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

  private _isSameUrl = (url1: string, url2: string): boolean => url1 === url2;

  private _isSameAltText = (altText1: string, altText2: string): boolean =>
    altText1 === altText2;

  /**
   * Determines whether another avatar is identical to the current one.
   * @param  {Avatar} otherAvatar The other avatar to compare against.
   * @returns {boolean} Whether the other avatar is equal to the current one.
   */
  public equals = (otherAvatar: Avatar): boolean =>
    this._isSameUrl(this._url, otherAvatar._url) &&
    this._isSameAltText(this._altText, otherAvatar._altText);
}

/**
 * Class containing the details of a participant.
 */
export default class Participant {
  @observable private _name: string;
  @observable private _avatar: Avatar;

  private _getOrCreateAvatar = (name: string, avatar?: Avatar): Avatar => {
    return avatar || new Avatar(createAvatarImage(name), name);
  };

  public constructor(name: string, avatar?: Avatar) {
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
   * @returns {string} The capitalized name.
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

  private _isSameName = (name1: string, name2: string): boolean =>
    name1 === name2;

  private _isSameAvatar = (avatar1: Avatar, avatar2: Avatar): boolean =>
    avatar1.equals(avatar2);

  /**
   * Determines whether another participant is identical to the current one.
   * @param  {Participant} otherParticipant The other participant to compare against.
   * @returns {boolean} Whether the other participant is equal to the current one.
   */
  public equals = (otherParticipant: Participant): boolean =>
    this._isSameName(this._name, otherParticipant._name) &&
    this._isSameAvatar(this._avatar, otherParticipant._avatar);
}
