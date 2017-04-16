export default function reducer(state={
  changeCount: 0,

}, action) {
  switch (action.type) {
    case "ADD_NEW_REPORT_OBJECT": {
      return {
        ...state,
        allSearches: [...state.allSearches, action.payload],
        currentRoadSearch: action.payload,
      }
    }
    case "INCREMENT_CHANGE_COUNT": {
      const newChangeCount = state.changeCount + 1;
      return {...state, changeCount: newChangeCount}
    }
  }
  return state
}
