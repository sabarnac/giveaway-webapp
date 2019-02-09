import React, { Component, Fragment } from "react";
import { observer } from "mobx-react";
import "./TournamentView.scss";
import classNames from "classnames";
import Tournament from "./store/Tournament";
import DevTools from "mobx-react-devtools";
import { isDevEnvironment } from "./util";
import ParticipantEntry from "./participant/entry/ParticipantEntry";

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
          <ParticipantEntry participant={this.props.tournament.winner} />
        </div>
        {this.getMobxDevTools()}
      </Fragment>
    );
  };
}

export default TournamentView;
