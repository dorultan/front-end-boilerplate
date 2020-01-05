import React, {createContext, PureComponent} from "react";
import Api from "../services/Api";
import Loading from "../components/Loading";

const Context = createContext({});

export const AppContext = Component => props => (
  <Context.Consumer>
    {/** @var {Object} app */}
    {app => <Component {...props} app={app}/>}
  </Context.Consumer>
);

export default class AppContextProvider extends PureComponent {
  state = {
    loading: true,
    config: {},
  };

  #getContext = () => ({
    ...this.state,
  });

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
      <Context.Provider value={this.#getContext()}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
