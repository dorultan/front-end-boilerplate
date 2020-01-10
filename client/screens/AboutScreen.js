import React, {Component} from "react";
import {AppContext} from "../context/AppContext";
import Screen from "../components/Screen";

@AppContext
export default class AboutScreen extends Component {
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
