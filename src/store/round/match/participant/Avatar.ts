/**
 * Class containing the details of a participants' avatar.
 */
export default class Avatar {
  /** The URL of the avatar image. */
  private _url: string;
  /** The alternate text for the image. */
  private _altText: string;

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
