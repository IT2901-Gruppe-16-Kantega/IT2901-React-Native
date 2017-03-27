
export default function reducer(state={
  selectedFunction: null,

}, action) {
  //simple switch statement based on type of action
  switch (action.type) {
    case "SELECT_FUNCTION": {
      return{...state, selectedFunction: action.payload}
    }
  }
  return state
}
