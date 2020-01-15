import React, {Component} from "react";
import PropTypes from "prop-types";
import Screen from "../components/Screen";
import Config from "../services/Config";
import Content from "../services/Content";

export default class HomeScreen extends Component {
  static contextTypes = {
    app: PropTypes.object,
  };

  render() {
    return (
      <Screen name="Home">
        <h1>{Content.get(this.context.app.content, 'screen-home-title')}</h1>
        <p>
          APP_ENV={Config.get(this.context.app.config, 'env')}
        </p>
      </Screen>
    );
  }
}
