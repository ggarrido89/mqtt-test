const INITIAL_STATE = {
  counter: 0,
};

export function counterApp(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        counter: state.counter + 1,
      };

    case "DECREMENT":
      return {
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}
