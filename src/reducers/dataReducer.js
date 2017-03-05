/*
PUT SOME INFORMATION ABOUT REDUCER HERE
*/

export default function reducer(state={
  //initialState
  kommune_input: 'ukjent',
  kommune: 'not input',
  valid_kommune: false,
  fetching: false,
  fetched: false,
  error: null,
  objects: [],
}, action) {
  //simple switch statement based on type of action
  switch (action.type) {
    case "templateAction": {
      return{...state,fetching: true}
    }
    case "SET_KOMMUNE_INPUT": {
      return{
        ...state,
        kommune_input: action.payload.text
      }
    }
    case "SET_KOMMUNE": {
      return{
        ...state,
        valid_kommune: true,
        kommune: action.payload
      }
    }
    case "FETCH_DATA_START": {
      return{
        ...state,
        fetching: true,
      }
    }
    case "FETCH_DATA_RETURNED":{
      return {
        ...state,
        fetching: action.payload.fetching,
        fetched: action.payload.fetched,
        objects: action.payload.data,
      }
    }
  }
  return state
}
