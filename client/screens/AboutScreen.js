import React, {Component} from "react";
import PropTypes from "prop-types";
import Screen from "../components/Screen";

export default class AboutScreen extends Component {
  static contextTypes = {
    app: PropTypes.object,
  };

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
