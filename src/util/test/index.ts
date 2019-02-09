import Match from "../../store/round/match/Match";
import Config from "../../store/config/Config";
import Participant, {
  Avatar
} from "../../store/round/match/participant/Participant";

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
