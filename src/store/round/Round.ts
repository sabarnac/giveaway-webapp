import { observable, computed } from "mobx";
import Participant from "./match/participant/Participant";
import Config from "../config/Config";
import chunk from "lodash.chunk";
import Match from "./match/Match";
import last from "lodash.last";
import RandomGenerator from "../config/RandomGenerator";

/**
 * Class containing the details of a round of the tournament.
 */
export default class Round {
  @observable private _id: string;
  @observable private _matches: Match[];

  private static counter: number = 1;

  private _config: Config;

  private _shuffleParticipants = (participants: Participant[]): Participant[] =>
    RandomGenerator.shuffle(participants);

  private _createMatch = (participants: Participant[]): Match =>
    new Match(participants);

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

  private _getMatchParticipants = (match: Match): Participant[] =>
    match.participants;

  private _getMatchWinner = (match: Match): Participant => match.winner;

  private _getMatchLosers = (match: Match): Participant[] => match.losers;

  /**
   * Get the match ID.
   * @returns {string} The unique ID of the match.
   */
  @computed public get id(): string {
    return this._id;
  }

  /**
   * Get the list of matches in the round.
   * @returns {Match[]} The list of matches.
   */
  @computed public get matches(): Match[] {
    return this._matches;
  }

  /**
   * Get the first match of the round.
   * @returns {Match} The first match.
   */
  @computed public get firstMatch(): Match {
    return this._matches[0];
  }

  /**
   * Get the last match of the round.
   * @returns {Match} The last match.
   */
  @computed public get lastMatch(): Match {
    return <Match>last(this._matches);
  }

  /**
   * Get the list of participants in the round.
   * @returns {Participant[]} The list of participants.
   */
  @computed public get participants(): Participant[] {
    return this._matches.map(this._getMatchParticipants).flat();
  }

  /**
   * Get the list of winners in the round.
   * @returns {Participant[]} The list of winners.
   */
  @computed public get winners(): Participant[] {
    return this._matches.map(this._getMatchWinner);
  }

  /**
   * Get the list of losers in the round.
   * @returns {Participant[]} The list of losers.
   */
  @computed public get losers(): Participant[] {
    return this._matches.map(this._getMatchLosers).flat();
  }
}
