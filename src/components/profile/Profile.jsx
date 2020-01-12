import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import "./profile.scss";

const Profile = ({ user }) => {
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

export default Profile;
