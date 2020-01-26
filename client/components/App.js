import React, {Component, createContext, lazy, Suspense} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Loading from "./Loading";
import PropTypes from "prop-types";
import content from "../config/content";
import Api from "../services/Api";

const HomeScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "HomeScreen" */ '../screens/HomeScreen'));
const AboutScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "AboutScreen" */ '../screens/AboutScreen'));
const NotFoundScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "NotFoundScreen" */ '../screens/NotFoundScreen'));

export const AppContext = createContext({});

export default class App extends Component {
  #toggleLoading = loading => this.setState({loading});

  state = {
    loading: false,
    config: {},
    content,
    toggleLoading: this.#toggleLoading,
  };

  async componentDidMount() {
    const res = await Api.get('/config');
    if (res.ok) {
      this.setState({config: res.body, loading: false});
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading>Loading...</Loading>;
    }

    return (
      <AppContext.Provider value={this.state}>
        <Router>
          <Suspense fallback={<Loading>Loading now...</Loading>}>
            <Switch>
              <Route exact path="/" component={HomeScreen}/>
              <Route exact path="/about" component={AboutScreen}/>
              <Route component={NotFoundScreen}/>
            </Switch>
          </Suspense>
        </Router>
      </AppContext.Provider>
    );
  }
}
