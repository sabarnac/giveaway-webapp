import React from "react";
import App from "./App";
import Tournament from "./store/Tournament";
import { create, ReactTestRenderer } from "react-test-renderer";
import { createDummyTournament } from "./util/test";

describe("App Component.", (): void => {
  it("Matches snapshot.", (): void => {
    const tournament: Tournament = createDummyTournament();
    const component: ReactTestRenderer = create(
      <App tournament={tournament} />
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
