import React, {Component} from "react";
import {Link} from "react-router-dom";
import Screen from "../components/Screen";
import Content from "../services/Content";
import {AppContext} from "../components/App";

export default class NotFoundScreen extends Component {
  static contextType = AppContext;

  render() {
    return (
      <Screen name="NotFound">
        <h1>{Content.get(this.context.content, 'screen-not-found-title')}</h1>
        <Link to="/">{Content.get(this.context.content, 'screen-not-found-go-home')}</Link>
      </Screen>
    );
  }
}
