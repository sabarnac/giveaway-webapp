import React from "react";
import AppRouter from "./AppRouter";
import Tournament from "./store/Tournament";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyTournament } from "./util/test";

describe("AppRouter Component.", (): void => {
  it("Matches snapshot.", (): void => {
    const tournament: Tournament = createDummyTournament();
    const component: ReactTestRenderer = create(
      <AppRouter tournament={tournament} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
