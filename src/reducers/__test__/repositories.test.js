import store from "../../store";
import { NAME, Actions, initialState, reducer, RepositoriesActionCreators, getRepositories } from "../repositories";
import repositoriesMock from "./mocks/repositoriesMock";

describe("REPOSITORIES - Action Creators", () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
  });

  it("should create the action : INIT_REPOSITORIES", () => {
    const repositories = [...repositoriesMock];
    RepositoriesActionCreators.initRepositories(repositories)(dispatch);
    const [initRepositoriesAction] = dispatch.mock.calls;
    expect(initRepositoriesAction).toEqual([{ type: Actions.INIT_REPOSITORIES, repositories }]);
  });
});

describe("REPOSITORIES - Reducer", () => {
  it("should return initial repositories state", () => {
    const repositoriesState = reducer(undefined, {});
    expect(repositoriesState).toEqual({ ...initialState });
  });

  it("should handle INIT_REPOSITORIES Action", () => {
    const repositories = [...repositoriesMock];
    const repositoriesState = reducer(undefined, { type: Actions.INIT_REPOSITORIES, repositories });
    expect(repositoriesState).toEqual({ ...initialState, repositories });
  });
});

describe("REPOSITORIES - Selectors", () => {
  beforeAll(() => {
    store.getState = jest.fn().mockReturnValue({ [NAME]: { repositories: [...repositoriesMock] } });
  });

  it("should return repositories from State", () => {
    const repositories = getRepositories(store.getState());
    expect(repositories).toEqual(repositoriesMock);
  });
});
