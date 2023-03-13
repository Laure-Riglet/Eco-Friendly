/* eslint-disable brace-style */
export const loadState = (stateName) => {
  try {
    const serializedState = sessionStorage.getItem(stateName);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (stateName, state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(stateName, serializedState);
  } catch (err) {
    throw new Error("Can't save changes in local session storage");
  }
};
