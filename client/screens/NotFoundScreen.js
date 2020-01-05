import React, {Component} from "react";
import {Link} from "react-router-dom";
import {AppContext} from "../context/AppContext";
import Screen from "../components/Screen";
import Content from "../services/Content";

@AppContext
export default class NotFoundScreen extends Component {
  render() {
    return (
      <Screen name="NotFound">
        <h1>{Content.get(this.props.app.content, 'screen-not-found-title')}</h1>
        <Link to="/">{Content.get(this.props.app.content, 'screen-not-found-go-home')}</Link>
      </Screen>
    );
  }
}
