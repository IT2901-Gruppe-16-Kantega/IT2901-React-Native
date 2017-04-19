export default function reducer(state={
  changeCount: 0,
  chosenErrorType: "Ikke definert",
  reportViewType: "NEW",
  roadObject: null,
  reportObject: null,
}, action) {
  switch (action.type) {
    case "SET_REPORT_OBJECT": {
      return {...state, reportObject: action.payload}
    }
    case "SET_ROAD_OBJECT": {
      return {...state, roadObject: action.payload}
    }
    case "SET_ERROR_TYPE": {
      return {...state, chosenErrorType: action.payload}
    }
    case "SET_REPORTVIEW_TYPE": {
      return {...state, reportViewType: action.payload}
    }
    case "INCREMENT_CHANGE_COUNT": {
      const newChangeCount = state.changeCount + 1;
      return {...state, changeCount: newChangeCount}
    }
  }
  return state
}
