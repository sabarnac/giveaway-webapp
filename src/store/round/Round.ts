import { observable, computed } from "mobx";
import Participant from "./match/participant/Participant";
import Config from "../config/Config";
import chunk from "lodash.chunk";
import Match from "./match/Match";
import last from "lodash.last";
import RandomGenerator from "../config/RandomGenerator";

/**
 * Class containing the details of a round.
 */
export default class Round {
  /** The ID of the round. */
  @observable private _id: string;
  /** The list of matches of the round. */
  @observable private _matches: Match[];

  /** A counter for generating a unique ID for the match. */
  private static counter: number = 1;

  /** The config of the application. */
  private _config: Config;

  /**
   * Returns a shuffled list of the given participants.
   * @param  {Participant[]} participants The list of participants to shuffle.
   * @return {Participant[]} The shuffled list.
   */
  private _shuffleParticipants = (participants: Participant[]): Participant[] =>
    RandomGenerator.shuffle(participants);

  /**
   * Creates a match with the given list of participants
   * @param  {Participant[]} participants The list of participants to create the match with.
   * @return {Match} The created match.
   */
  private _createMatch = (participants: Participant[]): Match =>
    new Match(participants);

  /**
   * Returns a list of matches with all the participants of the round.
   * @param  {Participant[]} participants The list of participants to create the matches with.
   * @return {Match[]} The list of created matches.
   */
  private _getMatches = (participants: Participant[]): Match[] =>
    chunk(
      this._shuffleParticipants(participants),
      this._config.participantsPerMatch
    ).map(this._createMatch);

  public constructor(config: Config, participants: Participant[]) {
    this._config = config;

    this._id = `round-${Round.counter++}`;
    this._matches = this._getMatches(participants);
  }

  /**
   * Returns the list of participants of a given match.
   * @param  {Match} match The match whose participants to get.
   * @return {Participant[]} The list of participants of the match.
   */
  private _getMatchParticipants = (match: Match): Participant[] =>
    match.participants;

  /**
   * Returns the winner of a given match.
   * @param  {Match} match The match whose winner to get.
   * @return {Participant[]} The winner of the match.
   */
  private _getMatchWinner = (match: Match): Participant => match.winner;

  /**
   * Returns the list of losers of a given match.
   * @param  {Match} match The match whose losers to get.
   * @return {Participant[]} The list of losers of the match.
   */
  private _getMatchLosers = (match: Match): Participant[] => match.losers;

  /**
   * Get the match ID.
   * @return {string} The unique ID of the match.
   */
  @computed public get id(): string {
    return this._id;
  }

  /**
   * Get the list of matches in the round.
   * @return {Match[]} The list of matches.
   */
  @computed public get matches(): Match[] {
    return this._matches;
  }

  /**
   * Get the first match of the round.
   * @return {Match} The first match.
   */
  @computed public get firstMatch(): Match {
    return this._matches[0];
  }

  /**
   * Get the last match of the round.
   * @return {Match} The last match.
   */
  @computed public get lastMatch(): Match {
    return <Match>last(this._matches);
  }

  /**
   * Get the list of participants in the round.
   * @return {Participant[]} The list of participants.
   */
  @computed public get participants(): Participant[] {
    return this._matches.map(this._getMatchParticipants).flat();
  }

  /**
   * Get the list of winners in the round.
   * @return {Participant[]} The list of winners.
   */
  @computed public get winners(): Participant[] {
    return this._matches.map(this._getMatchWinner);
  }

  /**
   * Get the list of losers in the round.
   * @return {Participant[]} The list of losers.
   */
  @computed public get losers(): Participant[] {
    return this._matches.map(this._getMatchLosers).flat();
  }
}
