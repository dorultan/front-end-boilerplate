import React, {createContext, PureComponent} from "react";
import Api from "../services/Api";
import content from "../config/content";

const Context = createContext({});

export const AppContext = Component => props => (
  <Context.Consumer>
    {/** @var {Object} app */}
    {app => <Component {...props} app={app}/>}
  </Context.Consumer>
);

export default class AppContextProvider extends PureComponent {
  state = {
    config: {},
    content,
  };

  #getContext = () => ({
    ...this.state,
  });

  async componentDidMount() {
    const res = await Api.get('/config');
    if (res.ok) {
      this.setState({config: res.body});
    }
  }

  render() {
    return (
      <Context.Provider value={this.#getContext()}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
