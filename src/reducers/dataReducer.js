/*
PUT SOME INFORMATION ABOUT REDUCER HERE
*/

export default function reducer(state={
  //initialState
  kommune: 'ukjent',
  fetching: false,
  fetched: false,
  error: null,
  objects: []
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
        object: action.payload.data,
      }
    }
  }
  return state
}
