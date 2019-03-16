import React from "react";
import AppRouter from "./AppRouter.react";
import Tournament from "./store/Tournament";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyTournament, createDummyRouterProps } from "./util/test";

describe("AppRouter Component.", (): void => {
  it("Matches snapshot.", (): void => {
    const tournament: Tournament = createDummyTournament();
    const component: ReactTestRenderer = create(
      <AppRouter tournament={tournament} {...createDummyRouterProps()} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
