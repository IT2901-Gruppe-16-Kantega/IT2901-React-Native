
export default function reducer(state={
  //initialState

}, action) {
  //simple switch statement based on type of action
  switch (action.type) {
    case "SOME_ACTION1": {
      return{
        ...state,
        //some variable to be changed
      }
    }
    case "SOME_ACTION2": {
      return{
        ...state,
        //some variable to be changed
      }
    }
  }
  return state
}
