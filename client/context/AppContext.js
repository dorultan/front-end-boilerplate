import React, {createContext, PureComponent} from "react";
import Api from "../services/Api";

const Context = createContext({});

export const AppContext = Component => props => (
  <Context.Consumer>
    {/** @var {Object} app */}
    {app => <Component {...props} app={app}/>}
  </Context.Consumer>
);

export default class AppContextProvider extends PureComponent {
  state = {
    //
  };

  #getContext = () => ({
    ...this.state,
  });

  async componentDidMount() {
    const res = await Api.get('/config');
    console.log('res', res);
  }

  render() {
    return (
      <Context.Provider value={this.#getContext()}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
