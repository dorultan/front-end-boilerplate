import React, {lazy, PureComponent, Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import Loading from "./Loading";

const HomeScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "HomeScreen" */ '../screens/HomeScreen'));
const AboutScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "AboutScreen" */ '../screens/AboutScreen'));
const NotFoundScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "NotFoundScreen" */ '../screens/NotFoundScreen'));

const Screen = Component => props => <Component {...props}/>;

export default class App extends PureComponent {
  render() {
    return (
      <Suspense fallback={<Loading>Loading...</Loading>}>
        <Switch>
          <Route exact path="/" component={Screen(HomeScreen)}/>
          <Route exact path="/about" component={Screen(AboutScreen)}/>
          <Route component={Screen(NotFoundScreen)}/>
        </Switch>
      </Suspense>
    );
  }
}
