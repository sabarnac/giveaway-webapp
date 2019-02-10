import Match from "../../store/round/match/Match";
import Config from "../../store/config/Config";
import Participant, {
  Avatar
} from "../../store/round/match/participant/Participant";
import Round from "../../store/round/Round";
import Tournament from "../../store/Tournament";

export const createDummyParticipant = function(id: number = 1): Participant {
  return new Participant(
    `fozbaz-${id}`,
    new Avatar(`foobar-${id}`, `barfoo-${id}`)
  );
};

export const createDummyMatch = (): Match => {
  return new Match(Config.instance, [
    createDummyParticipant(1),
    createDummyParticipant(2)
  ]);
};

export const createDummyRound = (): Round => {
  return new Round(Config.instance, [
    createDummyParticipant(1),
    createDummyParticipant(2),
    createDummyParticipant(3),
    createDummyParticipant(4),
    createDummyParticipant(5),
    createDummyParticipant(6)
  ]);
};

export const createDummyTournament = (): Tournament => {
  return new Tournament(Config.instance);
};
