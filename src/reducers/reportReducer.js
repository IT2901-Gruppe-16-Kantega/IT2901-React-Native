export default function reducer(state={
  changeCount: 0,

}, action) {
  switch (action.type) {
    case "INCREMENT_CHANGE_COUNT": {
      const newChangeCount = state.changeCount + 1;
      return {...state, changeCount: newChangeCount}
    }
  }
  return state
}
