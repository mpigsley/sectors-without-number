function extractDataToSave(state) {
  return {
    settings: { ...state.settings },
  };
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(extractDataToSave(state));
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore errors for the moment
  }
};
