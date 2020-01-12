import React, { Fragment } from "react";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import StarIcon from "@material-ui/icons/StarRate";

import "./repositories.scss";

const Repositories = ({ repositories }) => {
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

export default Repositories;
