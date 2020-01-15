import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Screen from "../components/Screen";
import Content from "../services/Content";

export default class NotFoundScreen extends Component {
  static contextTypes = {
    app: PropTypes.object,
  };

  render() {
    return (
      <Screen name="NotFound">
        <h1>{Content.get(this.context.app.content, 'screen-not-found-title')}</h1>
        <Link to="/">{Content.get(this.context.app.content, 'screen-not-found-go-home')}</Link>
      </Screen>
    );
  }
}
