import React, { Component } from "react";
import { hot } from "react-hot-loader";

import store from "./store";
import { UserActionCreators } from "./reducers/user";
import { RepositoriesActionCreators } from "./reducers/repositories";

import { fetchUser, fetchUserRepositories } from "./connectors/githubConnector";

import "./App.css";

class App extends Component {
  async componentDidMount() {
    const username = "LacourVincent";
    const [user, repositories] = await Promise.all([fetchUser(username), fetchUserRepositories(username)]);
    store.dispatch(UserActionCreators.initUser(user));
    store.dispatch(RepositoriesActionCreators.initRepositories(repositories));
  }

  render() {
    return (
      <div className="App">
        <h1> Hello world!</h1>
      </div>
    );
  }
}

export default hot(module)(App);
