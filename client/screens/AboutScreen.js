import React, {Component} from "react";
import Screen from "../components/Screen";
import {AppContext} from "../components/App";

export default class AboutScreen extends Component {
  static contextType = AppContext;

  render() {
    return (
      <Screen name="About">
        <h1>About Screen</h1>
        <p>
          Just testing...
        </p>
      </Screen>
    );
  }
}
