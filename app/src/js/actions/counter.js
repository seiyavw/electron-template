export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export const increment = () => {
  return {
    type: INCREMENT_COUNTER
  };
}

export const decrement = () => {
  return {
    type: DECREMENT_COUNTER
  };
}

export const incrementIfOdd = () => {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}

export const incrementAsync = (delay = 1000) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
