import React, {Component} from "react";
import {Link} from "react-router-dom";
import {AppContext} from "../context/AppContext";
import Screen from "../components/Screen";

@AppContext
export default class NotFoundScreen extends Component {
  render() {
    return (
      <Screen name="NotFound">
        <h1>Page Not Found</h1>
        <Link to="/">Go Home</Link>
      </Screen>
    );
  }
}
