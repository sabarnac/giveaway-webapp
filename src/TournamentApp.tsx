import React, { Component } from "react";
import logo from "./logo.png";
import { observer } from "mobx-react";
import "./TournamentApp.css";
import Tournament from "./store/Tournament";

interface TournamentProps {
  tournament: Tournament;
}

@observer
class TournamentApp extends Component<TournamentProps> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default TournamentApp;
