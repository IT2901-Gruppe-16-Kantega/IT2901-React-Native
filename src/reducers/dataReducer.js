/*
PUT SOME INFORMATION ABOUT REDUCER HERE
*/

export default function reducer(state={
  //initialState

  fetching: false,
  fetched: false,
  error: null,
  objects: [],
  numberOfObjects: 0,

  andel_egengeometri: null,
  allSearches:[],
  valgtObjektref: 1,
  //used by filewriter
  writing_file: false,

}, action) {
  //simple switch statement based on type of action
  switch (action.type) {


    //arr: [...state.arr, action.newItem]
    //list: [...state.list, newItem]
    case "ADD_NEW_SEARCH_OBJECT": {
      return{
        ...state,
        allSearches: [...state.allSearches, action.payload],
      }
    }
    case "FETCH_DATA_START": {
      return{
        ...state,
        fetching: true,
      }
    }
    case "FETCHING_NOT_FINISHED": {
      return{
        ...state,
        numberOfObjects: action.payload.currentlyFetched
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
    case "CLEAR_DATA": {
      return {
        ...state,
        kommune_input: 'ukjent',
        kommune: 'not input',
        valid_kommune: false,
        fetching: false,
        fetched: false,
        error: null,
        objects: [],
        region: {
          latitude: 63.43,
          longitude: 10.40,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }
      }
    }
    //used by filewriter
    case "WRITING_FILE": {
      return {
        ...state,
        writing_file: true,
      }
    }
  }
  return state
}
