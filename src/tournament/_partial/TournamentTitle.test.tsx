import React from "react";
import TournamentTitle from "./TournamentTitle.react";
import { create, ReactTestRenderer } from "react-test-renderer";
import {
  createDummyConfig,
  createDummyTranslationProps,
} from "../../util/test";

describe("TournamentTitle Component.", () => {
  it("Matches snapshot.", () => {
    const component: ReactTestRenderer = create(
      <TournamentTitle
        config={createDummyConfig()}
        {...createDummyTranslationProps()}
      />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
