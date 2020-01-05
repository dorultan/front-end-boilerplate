import React, {lazy, PureComponent, Suspense} from "react";
import {Route, Switch} from "react-router-dom";

const HomeScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "HomeScreen" */ '../screens/HomeScreen'));
const NotFoundScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "NotFoundScreen" */ '../screens/NotFoundScreen'));

const Screen = Component => props => <Component {...props}/>;

export default class App extends PureComponent {
  render() {
    return (
      <Suspense fallback="Loading...">
        <Switch>
          <Route exact path="/" component={Screen(HomeScreen)}/>
          <Route component={Screen(NotFoundScreen)}/>
        </Switch>
      </Suspense>
    );
  }
}
