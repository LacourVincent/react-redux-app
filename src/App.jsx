import React, { Component, Fragment } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import StarIcon from "@material-ui/icons/StarRate";

import store from "./store";
import { UserActionCreators, getUser } from "./reducers/user";
import { RepositoriesActionCreators, getRepositories } from "./reducers/repositories";

import { fetchUser, fetchUserRepositories } from "./connectors/githubConnector";

import "./normalize.css";
import "./app.scss";

class App extends Component {
  state = {
    searchValue: "",
    isLoading: false
  };

  handleInputChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { searchValue } = this.state;
    if (!searchValue) return;
    this.setState({ isLoading: true });
    const [user, repositories] = await Promise.all([fetchUser(searchValue), fetchUserRepositories(searchValue)]);
    store.dispatch(UserActionCreators.initUser(user));
    store.dispatch(RepositoriesActionCreators.initRepositories(repositories));
    this.setState({ isLoading: false, searchValue: "" });
  };

  renderHeader = () => {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Redux App Example
          </Typography>
        </Toolbar>
      </AppBar>
    );
  };

  renderSearchBar = () => {
    const { searchValue } = this.state;
    return (
      <Paper className="search" elevation={1}>
        <Typography variant="body1" />
        <form className="search_form" onSubmit={this.handleSubmit}>
          <TextField
            label="Search"
            value={searchValue}
            onChange={this.handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
          <Button className="search_form_button" variant="contained" color="secondary" onClick={this.handleSubmit}>
            OK
          </Button>
        </form>
      </Paper>
    );
  };

  renderProfile = () => {
    const { user } = this.props;
    if (!user) return null;
    return (
      <Paper className="profile" elevation={1}>
        <Avatar className="profile_avatar" src={user.avatar_url} alt="Remy Sharp" />
        <div className="profile_information">
          <Typography variant="subtitle1">{user.name}</Typography>
          <Typography variant="subtitle2">{user.login}</Typography>
          <Typography variant="subtitle2">{user.bio}</Typography>
        </div>
      </Paper>
    );
  };

  renderRepositories = () => {
    const { repositories } = this.props;
    if (!repositories) return null;
    return (
      <Paper className="repositories" elevation={1}>
        <List className="repositories_list">
          {repositories.map(repository => (
            <Fragment key={repository.id}>
              <ListItem>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary={repository.name} />
              </ListItem>
              <Divider />
            </Fragment>
          ))}
        </List>
      </Paper>
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div className="app">
        {this.renderHeader()}
        <div className="container">
          {isLoading ? (
            <CircularProgress color="secondary" />
          ) : (
            <Fragment>
              {this.renderSearchBar()}
              {this.renderProfile()}
              {this.renderRepositories()}
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

const selector = createStructuredSelector({
  user: getUser,
  repositories: getRepositories
});

export default connect(selector)(App);
