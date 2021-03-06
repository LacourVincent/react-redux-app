export const NAME = "USER";

export const Actions = {
  INIT_USER: `${NAME}/INIT_USER`
};

export const initialState = {
  user: null
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.INIT_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

/**
 * Action creators
 */

const initUser = user => dispatch => {
  dispatch({ type: Actions.INIT_USER, user });
};

export const UserActionCreators = {
  initUser
};

/**
 * Selectors
 */

const userSelector = state => state[NAME];

export const getUser = state => userSelector(state).user;

export default { [NAME]: reducer };
