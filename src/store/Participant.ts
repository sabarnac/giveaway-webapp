import { observable, computed } from "mobx";

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
  public get url(): string {
    return this._url;
  }

  /**
   * Gets the avatar image alternate text.
   * @return {string} The avatar image alternate text.
   */
  public get altText(): string {
    return this._altText;
  }

  private isSameUrl = (url1: string, url2: string): boolean => url1 === url2;

  private isSameAltText = (altText1: string, altText2: string): boolean =>
    altText1 === altText2;

  /**
   * Determines whether another avatar is identical to the current one.
   * @param  {Avatar} otherAvatar The other avatar to compare against.
   * @returns {boolean} Whether the other avatar is equal to the current one.
   */
  public equals = (otherAvatar: Avatar): boolean =>
    this.isSameUrl(this._url, otherAvatar._url) &&
    this.isSameAltText(this._altText, otherAvatar._altText);
}

/**
 * Class containing the details of a participant.
 */
export default class Participant {
  @observable private _name: string;
  @observable private _avatar?: Avatar;

  public constructor(name: string, avatar?: Avatar) {
    this._name = name;
    this._avatar = avatar;
  }

  /**
   * Gets the participant name.
   * @return {string} The participant name.
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Gets the participant avatar, if it exists.
   * @return {string | null} The participant avatar, or null if there isn't one.
   */
  public get avatar(): Avatar | null {
    return this._avatar || null;
  }

  /**
   * Gets whether the participant has an avatar or not.
   * @returns {boolean} Whether the participant has an avatar or not.
   */
  @computed public get hasAvatar(): boolean {
    return !!this._avatar;
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

  private isSameName = (name1: string, name2: string): boolean =>
    name1 === name2;

  private isSameAvatar = (avatar1?: Avatar, avatar2?: Avatar): boolean =>
    avatar1 && avatar2
      ? avatar1.equals(avatar2)
      : !avatar1 && !avatar2
      ? true
      : false;

  /**
   * Determines whether another participant is identical to the current one.
   * @param  {Participant} otherParticipant The other participant to compare against.
   * @returns {boolean} Whether the other participant is equal to the current one.
   */
  public equals = (otherParticipant: Participant): boolean =>
    this.isSameName(this._name, otherParticipant._name) &&
    this.isSameAvatar(this._avatar, otherParticipant._avatar);
}
