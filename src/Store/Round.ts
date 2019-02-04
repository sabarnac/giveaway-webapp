import { observable, computed } from "mobx";
import Participant from "./Participant";
import Config from "./Config/Config";
import chunk from "lodash.chunk";
import Match from "./Match";

/**
 * Class containing the details of a round of the tournament.
 */
export default class Round {
  @observable public matches: Match[];

  private _config: Config;

  private _shuffleParticipants = (participants: Participant[]): Participant[] =>
    this._config.randomGenerator.shuffle(participants);

  private _createMatch = (participants: Participant[]): Match =>
    new Match(this._config, participants);

  private _getMatches = (participants: Participant[]): Match[] =>
    chunk(
      this._shuffleParticipants(participants),
      this._config.participantsPerMatch,
    ).map(this._createMatch);

  public constructor(config: Config, participants: Participant[]) {
    this._config = config;

    this.matches = this._getMatches(participants);
  }

  private _getMatchParticipants = (match: Match): Participant[] =>
    match.participants;

  private _getMatchWinner = (match: Match): Participant => match.winner;

  private _getMatchLosers = (match: Match): Participant[] => match.losers;

  /**
   * Get the list of participants in the round.
   * @returns {Participant[]} The list of participants.
   */
  @computed public get participants(): Participant[] {
    return this.matches.map(this._getMatchParticipants).flat();
  }

  /**
   * Get the list of winners in the round.
   * @returns {Participant[]} The list of winners.
   */
  @computed public get winners(): Participant[] {
    return this.matches.map(this._getMatchWinner);
  }

  /**
   * Get the list of losers in the round.
   * @returns {Participant[]} The list of losers.
   */
  @computed public get losers(): Participant[] {
    return this.matches.map(this._getMatchLosers).flat();
  }
}
