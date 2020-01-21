import React, {Component} from "react";
import Screen from "../components/Screen";
import Config from "../services/Config";
import Content from "../services/Content";
import {AppContext} from "../components/App";

export default class HomeScreen extends Component {
  static contextType = AppContext;

  render() {
    return (
      <Screen name="Home">
        <h1>{Content.get(this.context.content, 'screen-home-title')}</h1>
        <p>
          APP_ENV={Config.get(this.context.config, 'env')}
        </p>
      </Screen>
    );
  }
}
