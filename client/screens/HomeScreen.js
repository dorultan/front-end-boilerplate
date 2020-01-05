import React, {Component} from "react";
import {AppContext} from "../context/AppContext";
import Screen from "../components/Screen";
import Config from "../services/Config";
import Content from "../services/Content";

@AppContext
export default class HomeScreen extends Component {
  render() {
    return (
      <Screen name="Home">
        <h1>{Content.get(this.props.app.content, 'screen-home-title')}</h1>
        <p>
          APP_ENV={Config.get(this.props.app.config, 'env')}
        </p>
      </Screen>
    );
  }
}
