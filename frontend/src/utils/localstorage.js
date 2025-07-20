export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('quickcart_state', serializedState);
  } catch (e) {
    console.error('Save state error:', e);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('quickcart_state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Load state error:', e);
    return undefined;
  }
};