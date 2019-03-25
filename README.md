<div align="center">
<h1>react-redux-app</h1>
</div>

This application uses React, Redux and Material UI. It calls the Github API to retrieve user information and stocks into the redux store.

## API call

```
const GITHUB_API_URL = "https://api.github.com";

export const fetchUser = async username => {
    const response = await fetch(`${GITHUB_API_URL}/users/${username}`);
    const user = await response.json();
    return user;
};
```

## Reducer

```
const NAME = "USER";

export const Actions = {
  INIT_USER: `${NAME}/INIT_USER`
};

const initialState = {
  user: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.INIT_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
```

## Action creator

```
const initUser = user => dispatch => {
  dispatch({ type: Actions.INIT_USER, user });
};
```

## Selector

```
export const userSelector = state => state[NAME];
export const getUser = state => userSelector(state).user;
export default { [NAME]: reducer };
```

## Reselect

```
const selector = createSelector(
  [getUser, getRepositories],
  (user, repositories) => ({
    user,
    repositories
  })
);
```

## LICENSE

MIT
