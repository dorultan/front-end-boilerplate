import React, {Component, lazy, Suspense} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Loading from "./Loading";
import PropTypes from "prop-types";
import content from "../config/content";
import Api from "../services/Api";

const HomeScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "HomeScreen" */ '../screens/HomeScreen'));
const AboutScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "AboutScreen" */ '../screens/AboutScreen'));
const NotFoundScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "NotFoundScreen" */ '../screens/NotFoundScreen'));

export default class App extends Component {
  static childContextTypes = {
    app: PropTypes.object,
  };

  state = {
    loading: true,
    config: {},
    content,
  };

  #toggleLoading = loading => this.setState({loading});

  getChildContext() {
    return {
      app: {
        ...this.state,
        toggleLoading: this.#toggleLoading,
      },
    };
  }

  async componentDidMount() {
    const res = await Api.get('/config');
    if (res.ok) {
      this.setState({config: res.body, loading: false});
    }
  }

  render() {
    console.log('App.render');

    if (this.state.loading) {
      return <Loading>Loading...</Loading>;
    }

    return (
      <Router>
        <Suspense fallback={<Loading>Loading...</Loading>}>
          <Switch>
            <Route exact path="/" component={HomeScreen}/>
            <Route exact path="/about" component={AboutScreen}/>
            <Route component={NotFoundScreen}/>
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
