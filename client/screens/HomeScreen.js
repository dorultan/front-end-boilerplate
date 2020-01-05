import React, {Component} from "react";
import {AppContext} from "../context/AppContext";
import Screen from "../components/Screen";

@AppContext
export default class HomeScreen extends Component {
  render() {
    return (
      <Screen name="Home">
        <h1>Home Screen</h1>
      </Screen>
    );
  }
}
