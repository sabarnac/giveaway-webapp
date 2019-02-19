import { observable, computed } from "mobx";
import Participant from "./round/match/participant/Participant";
import last from "lodash.last";
import Config from "./config/Config";
import Round from "./round/Round";

/**
 * Class containing the details of a tournament.
 */
export default class Tournament {
  /**
   * @type {Participant[]} The list of rounds of the tournament.
   */
  @observable private _rounds: Round[];

  /**
   * @type {Config} The config of the application.
   */
  private _config: Config;

  /**
   * Creates a round with the given list of participants
   * @param  {Participant[]} participants The list of participants to create the round with.
   * @return {Round} The created round.
   */
  private _createRound = (participants: Participant[]): Round =>
    new Round(this._config, participants);

  /**
   * Returns a list of rounds with all the participants of the tournament.
   * @return {Round[]} The list of created rounds.
   */
  private _getRounds = (): Round[] => {
    this._rounds = [this._createRound(this._config.allParticipants)];
    while (!this._hasWinner) {
      this._rounds.push(this._createRound(this.lastRound.winners));
    }
    return this._rounds;
  };

  public constructor(config: Config) {
    this._config = config;

    this._rounds = this._getRounds();
  }

  /**
   * Returns whether the tournament has a final winner or not.
   * @return {boolean} Whether the tournament has a final winner or not.
   */
  @computed private get _hasWinner(): boolean {
    return this.lastRound.winners.length === 1;
  }

  /**
   * Get the first round of the tournament.
   * @return {Round} The first round.
   */
  @computed public get firstRound(): Round {
    return <Round>this._rounds[0];
  }

  /**
   * Get the last round of the tournament.
   * @return {Round} The last round.
   */
  @computed public get lastRound(): Round {
    return <Round>last(this._rounds);
  }

  /**
   * Gets the list of rounds in the tournament.
   * @return {Round[]} The rounds in the tournament.
   */
  @computed public get rounds(): Round[] {
    return this._rounds;
  }

  /**
   * Gets the final winner of the tournament.
   * @return {Participant} The final winner, or null if there is none.
   */
  @computed public get winner(): Participant {
    return <Participant>this.lastRound.winners[0];
  }
}
