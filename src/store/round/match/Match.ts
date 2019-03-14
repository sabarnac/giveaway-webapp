import Participant from "./participant/Participant";
import RandomGenerator from "../../config/RandomGenerator";
import Config from "../../config/Config";
const gcd = require("gcd");

/**
 * Class containing details of a match.
 */
export default class Match {
  /** The ID of the match. */
  private _id: string;
  /** The ID of the round the match is a part of. */
  private _roundId: string;
  /** The list of participants of the match. */
  private _participants: Participant[];
  /** The winner of the match. */
  private _winner: Participant;
  /** The match conclusion message. */
  private _message: string;
  /** The GCD of all participant weights. */
  private _participantWeightGcd: number;

  /** The config of the application. */
  private _config: Config;

  /** A counter for generating a unique ID for the match. */
  private static counter: { [k: string]: number } = {};

  /**
   * Returns the weight of the given participant.
   * @param {Participant} participant The participant to get the weight of.
   * @return {number} The participant weight.
   */
  private _getParticipantWeight = (participant: Participant): number =>
    participant.weight;

  /**
   * Returns the GCD of the weights of all participants of the match.
   * @return {number} The GCD of the participant weights.
   */
  private _getParticipantWeightsGcd = (): number =>
    this._participants
      .map(this._getParticipantWeight)
      .reduce(
        (prevGcd: number, weight: number): number => gcd(prevGcd, weight),
      );

  /**
   * Returns a list of cloned participants whose count is the weight of the participant divided by the GCD of weights of all participants in the list.
   * @param {Participant} participant The participant to clone.
   * @return {Participant[]} The list of cloned participants.
   */
  private _cloneParticipantByWeight = (
    participant: Participant,
  ): Participant[] => {
    const participants: Participant[] = [];
    for (let i = 0; i < participant.weight / this._participantWeightGcd; i++) {
      participants.push(participant);
    }
    return participants;
  };

  /**
   * Picks and returns a winner of the match from the list of participants at random, with participant weight factored in.
   * @return {Participant} The participant selected as the winner.
   */
  private _getWinner = (): Participant =>
    RandomGenerator.pick(
      this._participants.flatMap(this._cloneParticipantByWeight),
    );

  /**
   * Returns a random conclusion message for the match.
   * @return {string} The conclusion message.
   */
  private _getMessage = (): string => this._config.getRandomMessage();

  /**
   * Returns a unique ID for the match based on the round it belongs to.
   * @param {string} roundId The ID of the round the match belongs to.
   * @return {string} The unique match ID.
   */
  private _getMatchId = (roundId: string): string => {
    if (!Match.counter[roundId]) {
      Match.counter[roundId] = 1;
    }
    return `${Match.counter[roundId]++}`;
  };

  public constructor(
    config: Config,
    participants: Participant[],
    roundId: string,
  ) {
    this._config = config;

    this._id = `${this._getMatchId(roundId)}`;
    this._roundId = roundId;
    this._participants = participants;
    this._participantWeightGcd = this._getParticipantWeightsGcd();
    this._winner = this._getWinner();
    this._message = this._getMessage();
  }

  /**
   * Returns whether the participant is the winner of the match or not.
   * @param  {Participant} participant The participant to check.
   * @return {boolean} Whether the participant is the winner of the match or not.
   */
  private _isNotWinner = (participant: Participant): boolean =>
    !participant.equals(this._winner);

  /**
   * Get the match ID.
   * @return {string} The unique ID of the match within the context of the round it belongs to.
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Get the complete match ID (prepended with round ID).
   * @return {string} The unique complete ID of the match.
   */
  public get fullId(): string {
    return `${this._roundId}:${this._id}`;
  }

  /**
   * Get the list of losers of the match.
   * @return {Participant[]} The list of losers.
   */
  public get losers(): Participant[] {
    return this._participants.filter(this._isNotWinner);
  }

  /**
   * Get the list of participants in the match.
   * @return {Participant[]} The list of participants.
   */
  public get participants(): Participant[] {
    return this._participants;
  }

  /**
   * Get the winner of the match.
   * @return {Participant} The winner.
   */
  public get winner(): Participant {
    return this._winner;
  }

  /**
   * Get the conslusion message of the match.
   * @return {string} The message.
   */
  public get message(): string {
    return this._message;
  }
}
