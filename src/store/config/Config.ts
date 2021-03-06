import Participant from "../round/match/participant/Participant";
import ConfigJson from "../../config/config.json";
import i18n from "../../i18n";
import { observable, computed, action } from "mobx";
import RandomGenerator from "./RandomGenerator";
import AnimationSpeed from "./AnimationSpeed";

/**
 * Interface for JSON object representing avatar details.
 */
interface AvatarJson {
  /** The URL of the avatar. */
  url: string;
  /** The alternate text of the avatar image. */
  altText: string;
}

/**
 * Interface for JSON object representing participant details.
 */
interface ParticipantJson {
  /** The name of the participant. */
  name: string;
  /** The avatar of the participant (if present). */
  avatar?: AvatarJson;
  /** The weight of the participant (if present). */
  weight?: number;
}

/**
 * Class representing the basic configuration of the application.
 */
export default class Config {
  /** The name of the tournament. */
  private _name: string;
  /** A list of all messages. */
  private _messages: string[];
  /** The list of participants in the tournament. */
  private _allParticipants: Participant[];
  /** The number of participants per match. */
  private _participantsPerMatch: number;
  /** The languages supported by the application. */
  private _languages: string[];
  /** The current language. */
  @observable private _currentLanguage: string;
  /** The animation speed multiplier. */
  @observable private _speed: number;
  /** The list of unused messages. */
  private _unusedMessages: string[];

  /** The singleton instance of the class, or null if not yet created. */
  private static _instance: Config | null = null;

  /**
   * Returns the name of the tournament.
   * @return {string} The tournament name.
   */
  private _getName = (): string => ConfigJson.name;

  /**
   * Returns the match conclusion messages that can be used for the tournament.
   * @return {string[]} The tournament match conclusion messages.
   */
  private _getMessages = (): string[] => ConfigJson.messages;

  /**
   * Returns a created participant for the given JSON details.
   * @param {string | ParticipantJson} user The participants details.
   * @return {Participant} The created participant.
   */
  private _createParticipant = (user: string | ParticipantJson): Participant =>
    typeof user === "string"
      ? new Participant(user)
      : new Participant(
          (user as ParticipantJson).name,
          (user as ParticipantJson).avatar,
          (user as ParticipantJson).weight,
        );

  /**
   * Returns a created list of participants using the given participant details.
   * @return {Participant[]} The created participants list.
   */
  private _getParticipants = (): Participant[] =>
    ConfigJson.users.map(this._createParticipant);

  /**
   * Returns the max. number of participants that are to be present per match in the tournament.
   * @return {number} The max. number of participants per match.
   */
  private _getParticipantsPerMatch = (): number =>
    ConfigJson.participantsPerMatch;

  /**
   * Returns the list of languages supported by the application.
   * @return {string[]} The list of languages.
   */
  private _getlLanguages = (): string[] => ConfigJson.lang;

  /**
   * Returns the animation speed multiplier of the application.
   * @return {number} The animation speed multiplier.
   */
  private _getSpeed = (): number => AnimationSpeed.get("ONE") as number;

  /**
   * Returns whether a string should be prepended to a participants' name.
   * @param {number} index The index of the participant.
   * @param {number} participantSize The total number of participants.
   * @return {boolean} Whether the string should be prepended.
   */
  private _shouldPrepend = (index: number, participantSize: number): boolean =>
    index === participantSize - 1 && participantSize > 1;

  /**
   * Returns a function that can returns the participant name prepended with a string if it's the last participant, or just the name.
   * @param {number} participantSize The total number of participants.
   * @param {string} stringToPrepend The string to prepend.
   * @return {(name: string, index: number) => string} The function that will return the participants' name
   */
  private _prependToLastParticipant = (
    participantSize: number,
    stringToPrepend: string,
  ): ((name: string, index: number) => string) => (
    name: string,
    index: number,
  ): string =>
    this._shouldPrepend(index, participantSize)
      ? `${stringToPrepend} ${name}`
      : name;

  /**
   * Returns a formatted losers list.
   * @param {string[]} names The list of loser names.
   * @return {string} The formatted string.
   */
  private _formatLosers = (names: string[]): string =>
    names.map(this._prependToLastParticipant(names.length, "and")).join(", ");

  private constructor() {
    this._name = this._getName();
    this._messages = this._getMessages();
    this._unusedMessages = RandomGenerator.shuffle([...this._messages]);
    this._allParticipants = this._getParticipants();
    this._participantsPerMatch = this._getParticipantsPerMatch();
    this._languages = this._getlLanguages();
    this._currentLanguage = "en";
    this._speed = this._getSpeed();
  }

  /**
   * Get an instance of the config, which is a singleton.
   * @return {Config} The instance of a config.
   */
  public static getInstance(): Config {
    return Config._instance
      ? Config._instance
      : (Config._instance = new Config());
  }

  /**
   * Get the name of the tournament.
   * @return {string} The tournament name.
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Get the list of winner/loser messages.
   * @return {string[]} The list of mesasges.
   */
  public get messages(): string[] {
    return [...this._messages];
  }

  /**
   * Returns the formatted version of the given message.
   * @param {string} message The message to format.
   * @param {string} winnerName The name of the winner.
   * @param {string[]} loserNames The names of the losers.
   * @return {string} The formatted message.
   */
  public getFormattedMessage = (
    message: string,
    winnerName: string,
    loserNames: string[],
  ): string =>
    message
      .replace("#winner", winnerName)
      .replace("#loser", this._formatLosers(loserNames));

  /**
   * Gets a random message with the winner and loser.
   * @return {string} The formatted message.
   */
  public getRandomMessage(): string {
    if (this._unusedMessages.length === 0) {
      this._unusedMessages = RandomGenerator.shuffle([...this._messages]);
    }
    const message = RandomGenerator.pick(this._unusedMessages);
    this._unusedMessages.splice(this._unusedMessages.indexOf(message), 1);
    return message;
  }

  /**
   * Gets the index of the given message.
   * @param {string} message The message.
   * @return {number} The index of the message.
   */
  public getMessageIndex = (message: string): number =>
    this._messages.indexOf(message);

  /**
   * Get the list of all participants in the tournament.
   * @return {Participant[]} The list of all participants.
   */
  public get allParticipants(): Participant[] {
    return this._allParticipants;
  }

  /**
   * Get the number of participants per match.
   * @return {number} The number of participants per match.
   */
  public get participantsPerMatch(): number {
    return this._participantsPerMatch;
  }

  /**
   * Get the list of languages supported by the application.
   * @return {string[]} The list of languages.
   */
  public get languages(): string[] {
    return this._languages;
  }

  /**
   * Get the current application language.
   * @return {string} The current language.
   */
  @computed public get currentLanguage(): string {
    return this._currentLanguage;
  }

  /**
   * Set the current language of the application.
   * @param {string} value The new current language.
   */
  @action public setCurrentLanguage(value: string): void {
    if (this._languages.indexOf(value) !== -1) {
      this._currentLanguage = value;
      i18n.changeLanguage(value);
    } else {
      console.error(`Illegal value '${value}' for current language.`);
    }
  }

  /**
   * Get the speed multiplier for animations.
   * @return {number} The speed multiplier value.
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
      console.error(`Illegal value '${value}' for speed.`);
    }
  }
}
