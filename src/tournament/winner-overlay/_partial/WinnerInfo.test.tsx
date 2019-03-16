import React from "react";
import WinnerInfo from "./WinnerInfo.react";
import { create, ReactTestRenderer } from "react-test-renderer";
import Participant from "../../../store/round/match/participant/Participant";
import {
  createDummyParticipant,
  createDummyTranslationProps,
} from "../../../util/test";

describe("WinnerInfo Component.", () => {
  it("Matches snapshot.", () => {
    const participant: Participant = createDummyParticipant(0);
    const component: ReactTestRenderer = create(
      <WinnerInfo
        className="foobar"
        winner={participant}
        {...createDummyTranslationProps()}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
