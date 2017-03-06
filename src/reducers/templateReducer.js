/*
PUT SOME INFORMATION ABOUT REDUCER HERE
*/

export default function reducer(state={
  //initialState

}, action) {
  //simple switch statement based on type of action
  switch (action.type) {
    case "TEMPLATE_ACTION": {
      return{...state,fetching: true}
    }
    case "TEMPLATE_ACTION2": {
      return{
        ...state
      }
    }
  }
  return state
}
