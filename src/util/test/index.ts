import Match from "../../store/round/match/Match";
import Config from "../../store/config/Config";
import Participant from "../../store/round/match/participant/Participant";
import Round from "../../store/round/Round";
import Tournament from "../../store/Tournament";

export const createDummyParticipant = function(id: number = 1): Participant {
  return new Participant(`fozbaz-${id}`);
};

export const createDummyConfig = (): Config => {
  const mockConfig: any = {
    message: ["foobar1", "foobar2", "foobar3", "foobar4"],
    allParticipants: [
      createDummyParticipant(1),
      createDummyParticipant(2),
      createDummyParticipant(3),
      createDummyParticipant(4),
    ],
    participantsPerMatch: 2,
    speed: 1,
    getRandomMessage: () => "foobar message",
  };
  mockConfig.getInstance = () => mockConfig;
  return mockConfig;
};

export const createDummyMatch = (): Match => {
  return new Match(createDummyConfig(), [
    createDummyParticipant(1),
    createDummyParticipant(2),
  ]);
};

export const createDummyRound = (): Round => {
  return new Round(createDummyConfig(), [
    createDummyParticipant(1),
    createDummyParticipant(2),
    createDummyParticipant(3),
    createDummyParticipant(4),
    createDummyParticipant(5),
    createDummyParticipant(6),
  ]);
};

export const createDummyTournament = (): Tournament => {
  return new Tournament(createDummyConfig());
};
