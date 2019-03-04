import { combineReducers } from "redux";

import user from "./reducers/user";
import repositories from "./reducers/repositories";

export default combineReducers({
  ...user,
  ...repositories
});
