const GITHUB_API_URL = "https://api.github.com";

export const fetchUser = async username => {
  const response = await fetch(`${GITHUB_API_URL}/users/${username}`);
  if (!response.ok) throw new Error(response.statusText);
  const user = await response.json();
  return user;
};

export const fetchUserRepositories = async username => {
  const response = await fetch(`${GITHUB_API_URL}/users/${username}/repos`);
  if (!response.ok) throw new Error(response.statusText);
  const userRepositories = await response.json();
  return userRepositories;
};
