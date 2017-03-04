/*
PUT SOME INFORMATION ABOUT REDUCER HERE
*/

export default function reducer(state={
  //initialState
  kommune: 'ukjent',
  fetching: false,
  fetched: false,
  error: null,
}, action) {
  //simple switch statement based on type of action
  switch (action.type) {
    case "templateAction": {
      return{...state,fetching: true}
    }
    case "SET_KOMMUNE": {
      return{
        ...state,
        kommune: action.payload.text
      }
    }
    case "FETCH_DATA": {
      return{
        ...state,
        fetching: true,
        //insert objects reference here
      }
    }
  }
  return state
}
