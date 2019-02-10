import React, { Component } from "react";
import { Switch, Route, RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import Tournament from "./store/Tournament";
import AppRouter from "./AppRouter";

interface AppProps {
  tournament: Tournament;
}

@observer
class App extends Component<AppProps> {
  private getRoute = (): JSX.Element => (
    <Route exact path="/" render={this.getApplication} />
  );

  private getApplication = (props: RouteComponentProps<any>): JSX.Element => (
    <AppRouter {...props} {...this.props} />
  );

  public render = (): JSX.Element => <Switch>{this.getRoute()}</Switch>;
}

export default App;
