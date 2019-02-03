import { observable, computed, action } from "mobx";
import Participant from "./Participant";
import last from "lodash.last";
import Config from "../config/Config";
import Round from "./Round";

/**
 * Class containing the details of a tournament.
 */
export default class Tournament {
  @observable private _rounds: Round[];
  private static _PARTICIPANTS: Participant[] = Config.allParticipants;

  private _createRound = (participants: Participant[]): Round =>
    new Round(participants);

  private _getRounds = (): Round[] => {
    const rounds: Round[] = [this._createRound(Tournament._PARTICIPANTS)];
    while (!this.hasWinner) {
      rounds.push(this._createRound(this._latestRound.winners));
    }
    return rounds;
  };

  public constructor() {
    this._rounds = this._getRounds();
  }

  @computed private get _latestRound(): Round {
    return <Round>last(this._rounds);
  }

  @computed private get hasWinner(): boolean {
    return this._latestRound.winners.length === 1;
  }

  /**
   * Gets the list of rounds in the tournament.
   * @returns {Round[]} The rounds in the tournament.
   */
  public get rounds(): Round[] {
    return this._rounds;
  }

  /**
   * Gets the final winner of the tournament.
   * @returns {Participant} The final winner.
   */
  @computed public get winner(): Participant {
    return <Participant>this._latestRound.winners[0];
  }
}
