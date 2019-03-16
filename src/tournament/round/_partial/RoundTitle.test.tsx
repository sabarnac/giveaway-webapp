import React from "react";
import RoundTitle from "./RoundTitle.react";
import Round from "../../../store/round/Round";
import { create, ReactTestRenderer } from "react-test-renderer";
import {
  createDummyRound,
  createDummyTranslationProps,
} from "../../../util/test";

describe("RoundTitle Component.", () => {
  it("Roundes snapshot.", () => {
    const round: Round = createDummyRound();
    const component: ReactTestRenderer = create(
      <RoundTitle round={round} {...createDummyTranslationProps()} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
