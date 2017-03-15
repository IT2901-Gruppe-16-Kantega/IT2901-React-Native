export default function reducer(state={
  filterFlex: 0,

}, action) {
  //simple switch statement based on type of action
  switch (action.type) {
    case "SET_FILTER_FLEX": {
      return{...state, filterFlex: action.payload}
    }
  }
  return state
}
