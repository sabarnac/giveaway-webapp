import React, { Component, Fragment } from "react";
import { observer } from "mobx-react";
import "./TournamentView.scss";
import classNames from "classnames";
import Tournament from "./store/Tournament";
import DevTools from "mobx-react-devtools";
import { isDevEnvironment } from "./util";
import MatchView from "./match/MatchView";

interface TournamentViewProps {
  tournament: Tournament;
}

@observer
class TournamentView extends Component<TournamentViewProps> {
  private getMobxDevTools = (): JSX.Element | null =>
    isDevEnvironment() ? <DevTools /> : null;

  public render = (): JSX.Element => {
    return (
      <Fragment>
        <div className={classNames("tournament")}>
          <MatchView match={this.props.tournament.rounds[0].matches[0]} />
        </div>
        {this.getMobxDevTools()}
      </Fragment>
    );
  };
}

export default TournamentView;
