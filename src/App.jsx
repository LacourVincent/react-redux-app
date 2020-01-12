import React, { useState } from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import store from "./store";
import { UserActionCreators, getUser } from "./reducers/user";
import { RepositoriesActionCreators, getRepositories } from "./reducers/repositories";

import { fetchUser, fetchUserRepositories } from "./connectors/githubConnector";

import Header from "./components/header/Header";
import Search from "./components/search/Search";
import Profile from "./components/profile/Profile";
import Repositories from "./components/repositories/Repositories";

import "./app.scss";
import "./normalize.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserNotFound, setIsUserNotFound] = useState(false);
  const user = useSelector(getUser);
  const repositories = useSelector(getRepositories);

  const handleSubmit = async username => {
    setIsLoading(true);
    setIsUserNotFound(false);
    try {
      const [githubUser, githubRepositories] = await Promise.all([
        fetchUser(username),
        fetchUserRepositories(username)
      ]);
      store.dispatch(UserActionCreators.initUser(githubUser));
      store.dispatch(RepositoriesActionCreators.initRepositories(githubRepositories));
    } catch (_) {
      setIsUserNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <div className="container">
        {isLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <>
            <Search onSubmit={handleSubmit} isNotFound={isUserNotFound} />
            {user && <Profile user={user} />}
            {repositories && <Repositories repositories={repositories} />}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
