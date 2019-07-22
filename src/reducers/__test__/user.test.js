import store from "../../store";
import { NAME, Actions, initialState, reducer, UserActionCreators, getUser } from "../user";
import userMock from "./mocks/userMock";

describe("User - Action Creators", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
  });

  it("should create the action : INIT_USER", () => {
    const user = { ...userMock };
    UserActionCreators.initUser(user)(dispatch);
    const [initUserAction] = dispatch.mock.calls;
    expect(initUserAction).toEqual([{ type: Actions.INIT_USER, user }]);
  });
});

describe("User - Reducer", () => {
  it("should return initial user state", () => {
    const userState = reducer(undefined, {});
    expect(userState).toEqual({ ...initialState });
  });

  it("should handle INIT_USER Action", () => {
    const user = { ...userMock };
    const userState = reducer(undefined, { type: Actions.INIT_USER, user });
    expect(userState).toEqual({ ...initialState, user });
  });
});

describe("User - Selectors", () => {
  beforeAll(() => {
    store.getState = jest.fn().mockReturnValue({ [NAME]: { user: { ...userMock } } });
  });

  it("should return user from State", () => {
    const user = getUser(store.getState());
    expect(user).toEqual(userMock);
  });
});
