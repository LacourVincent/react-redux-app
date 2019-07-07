<div align="center">
<h1>react-redux-app</h1>
</div>

This application uses React, Redux and Material UI. It calls the Github API to retrieve user information and stocks into the redux store.

## Development

To work on this project, you need to grab all of its dependencies, for which
we recommend using [yarn]. You can find the instructions to setup yarn [here](https://yarnpkg.com/docs/install).

```
yarn
```

After that, you should be able run the app

```
yarn start
```

## API call

```javascript
const GITHUB_API_URL = "https://api.github.com";

export const fetchUser = async username => {
  const response = await fetch(`${GITHUB_API_URL}/users/${username}`);
  const user = await response.json();
  return user;
};
```

## Reducer

```javascript
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

```javascript
const initUser = user => dispatch => {
  dispatch({ type: Actions.INIT_USER, user });
};
```

## Selector

```javascript
export const userSelector = state => state[NAME];
export const getUser = state => userSelector(state).user;
export default { [NAME]: reducer };
```

## Reselect

```javascript
const selector = createStructuredSelector({
  user : getUser,
  repositories : getRepositories
});
```

## Dependencies

- [React](https://github.com/facebook/react)
- [Material-UI](https://github.com/mui-org/material-ui)
- [Redux](https://github.com/reduxjs/redux)
- [Reselect](https://github.com/reduxjs/reselect)

## LICENSE

MIT
