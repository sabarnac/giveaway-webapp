import { observable, computed, action } from "mobx";
import Participant from "./Participant";
import Random from "random-js";
import Config from "../config/Config";
import chunk from "lodash.chunk";
import Match from "./Match";

/**
 * Class containing the details of a round of the tournament.
 */
export default class Round {
  @observable public matches: Match[];
  private static _RANDOM_GENERATOR: Random = Config.randomGenerator;
  private static _PARTICIPANTS_PER_MATCH: number = Config.participantsPerMatch;

  private shuffleParticipants = (participants: Participant[]): Participant[] =>
    Round._RANDOM_GENERATOR.shuffle(participants);

  private createMatch = (participants: Participant[]): Match =>
    new Match(participants);

  private getMatches = (participants: Participant[]): Match[] =>
    chunk(
      this.shuffleParticipants(participants),
      Round._PARTICIPANTS_PER_MATCH,
    ).map(this.createMatch);

  public constructor(participants: Participant[]) {
    this.matches = this.getMatches(participants);
  }

  private getMatchParticipants = (match: Match): Participant[] =>
    match.participants;

  private getMatchWinner = (match: Match): Participant => match.winner;

  private getMatchLosers = (match: Match): Participant[] => match.losers;

  /**
   * Get the list of participants in the round.
   * @returns {Participant[]} The list of participants.
   */
  @computed public get participants(): Participant[] {
    return this.matches.map(this.getMatchParticipants).flat();
  }

  /**
   * Get the list of winners in the round.
   * @returns {Participant[]} The list of winners.
   */
  @computed public get winners(): Participant[] {
    return this.matches.map(this.getMatchWinner);
  }

  /**
   * Get the list of losers in the round.
   * @returns {Participant[]} The list of losers.
   */
  @computed public get losers(): Participant[] {
    return this.matches.map(this.getMatchLosers).flat();
  }
}
