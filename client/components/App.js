import React, {lazy, Component, Suspense} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Loading from "./Loading";
import PropTypes from "prop-types";
import content from "../config/content";
import Api from "../services/Api";

const HomeScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "HomeScreen" */ '../screens/HomeScreen'));
const AboutScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "AboutScreen" */ '../screens/AboutScreen'));
const NotFoundScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "NotFoundScreen" */ '../screens/NotFoundScreen'));

const Screen = Component => props => <Component {...props}/>;

export default class App extends Component {
  static childContextTypes = {
    app: PropTypes.object,
  };

  state = {
    loading: true,
    config: {},
    content,
  };

  getChildContext() {
    return {
      app: {
        ...this.state,
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
    if (this.state.loading) {
      return <Loading>Loading...</Loading>;
    }

    return (
      <Router>
        <Suspense fallback={<Loading>Loading...</Loading>}>
          <Switch>
            <Route exact path="/" component={Screen(HomeScreen)}/>
            <Route exact path="/about" component={Screen(AboutScreen)}/>
            <Route component={Screen(NotFoundScreen)}/>
          </Switch>
        </Suspense>
      </Router>
    );
  }
}
