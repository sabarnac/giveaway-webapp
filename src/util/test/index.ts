import Match from "../../store/round/match/Match";
import Config from "../../store/config/Config";
import Participant from "../../store/round/match/participant/Participant";
import Round from "../../store/round/Round";
import Tournament from "../../store/Tournament";
import { WithTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router";
import ServiceWorkerAlertsConfig from "../../store/config/ServiceWorkerAlertsConfig";

export const createDummyParticipant = function(id: number = 1): Participant {
  return new Participant(
    `fozbaz-${id}`,
    {
      url: `foobar-${id}`,
      altText: `foobar-${id}`,
    },
    1,
  );
};

export const createDummyConfig = (): Config => {
  const mockConfig: any = {
    name: "Foobar Giveaway",
    message: ["foobar1", "foobar2", "foobar3", "foobar4"],
    allParticipants: [
      createDummyParticipant(1),
      createDummyParticipant(2),
      createDummyParticipant(3),
      createDummyParticipant(4),
    ],
    participantsPerMatch: 2,
    speed: 1,
    languages: ["en", "fr"],
    currentLanguage: "en",
    getMessageIndex: () => 0,
    getFormattedMessage: () => "formatted foobar message",
    getRandomMessage: () => "foobar message",
  };
  mockConfig.getInstance = () => mockConfig;
  return mockConfig;
};

export const createDummyServiceWorkerConfig = (): ServiceWorkerAlertsConfig => {
  const mockConfig: any = {
    added: true,
    updated: true,
  };
  mockConfig.getInstance = () => mockConfig;
  return mockConfig;
};

export const createDummyMatch = (): Match => {
  return new Match(
    createDummyConfig(),
    [createDummyParticipant(1), createDummyParticipant(2)],
    "1",
  );
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

export const createDummyTranslationProps = (): WithTranslation => ({
  t: (key: any) => key,
  tReady: true,
  i18n: {} as any,
});

export const createDummyRouterProps = (): RouteComponentProps => ({
  history: {} as any,
  location: {
    pathname: "foobar",
    search: "?foobar",
    state: null,
    hash: "foobar",
  },
  match: {
    params: {},
    isExact: false,
    path: "foobar",
    url: "foobar",
  },
});
