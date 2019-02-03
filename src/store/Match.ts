import { observable, computed, action } from "mobx";
import Participant from "./Participant";
import Random from "random-js";
import Config from "../config/Config";

/**
 * Class containing details of a match.
 */
export default class Match {
  @observable private _participants: Participant[];
  @observable private _winner: Participant;
  private static _RANDOM_GENERATOR: Random = Config.randomGenerator;

  private _getWinner = (): Participant =>
    Match._RANDOM_GENERATOR.pick(this._participants);

  public constructor(participants: Participant[]) {
    this._participants = participants;
    this._winner = this._getWinner();
  }

  private _isNotWinner = (participant: Participant): boolean =>
    !participant.equals(this._winner);

  /**
   * Get the list of losers of the match.
   * @returns {Participant[]} The list of losers.
   */
  @computed public get losers(): Participant[] {
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
}
