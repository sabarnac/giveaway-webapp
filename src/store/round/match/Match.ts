import { observable, computed } from "mobx";
import Participant from "./participant/Participant";
import RandomGenerator from "../../config/RandomGenerator";

/**
 * Class containing details of a match.
 */
export default class Match {
  /**
   * @type {string} The ID of the match.
   */
  @observable private _id: string;
  /**
   * @type {Participant[]} The list of participants of the match.
   */
  @observable private _participants: Participant[];
  /**
   * @type {Participant} The winner of the match.
   */
  @observable private _winner: Participant;

  /**
   * @type {number} A counter for generating a unique ID for the match.
   */
  private static counter: number = 1;

  /**
   * Picks and returns a winner of the match from the list of participants at random.
   * @returns {Participant} The participant selected as the winner.
   */
  private _getWinner = (): Participant =>
    RandomGenerator.pick(this._participants);

  public constructor(participants: Participant[]) {
    this._id = `match-${Match.counter++}`;
    this._participants = participants;
    this._winner = this._getWinner();
  }

  /**
   * Returns whether the participant is the winner of the match or not.
   * @param  {Participant} participant The participant to check.
   * @returns {boolean} Whether the participant is the winner of the match or not.
   */
  private _isNotWinner = (participant: Participant): boolean =>
    !participant.equals(this._winner);

  /**
   * Get the match ID.
   * @returns {string} The unique ID of the match.
   */
  @computed public get id(): string {
    return this._id;
  }

  /**
   * Get the list of losers of the match.
   * @returns {Participant[]} The list of losers.
   */
  @computed public get losers(): Participant[] {
    return this._participants.filter(this._isNotWinner);
  }

  /**
   * Get the list of participants in the match.
   * @returns {Participant[]} The list of participants.
   */
  @computed public get participants(): Participant[] {
    return this._participants;
  }

  /**
   * Get the winner of the match.
   * @returns {Participant} The winner.
   */
  @computed public get winner(): Participant {
    return this._winner;
  }

  /**
   * Determines whether another match is identical to the current one.
   * @param  {Match} otherMatch The other match to compare against.
   * @returns {boolean} Whether the other match is equal to the current one.
   */
  public equals = (otherMatch: Match): boolean => this._id === otherMatch._id;
}
