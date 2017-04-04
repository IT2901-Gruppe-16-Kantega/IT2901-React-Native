

export default function reducer(state={
  fetching: false,
  fetched: false,
  error: null,
  numberOfObjectsToBeFetched: 0,
  numberOfObjectsFetchedSoFar: 0,

  objects: [], //objects are stored here as they are fetched from NVDB, before added to a raodSearch Object

  allSearches:[],

  //this holds the currently chosen roadSearch to avoid calling the entire array all the time
  currentRoadSearch: null,


  //currently not used
  currentRoadSearchIndex: null,
  andel_egengeometri: null,

  //used by filewriter
  writing_file: false,

  objekttypeInfo: [],

}, action) {
  switch (action.type) {
    // cases associated with searches
    case "ADD_NEW_SEARCH_OBJECT": {
      return {
        ...state,
        allSearches: [...state.allSearches, action.payload],
        currentRoadSearch: action.payload,
      }
    }
    case "SET_CURRENT_ROAD_SEARCH": {
      return {
        ...state,
        currentRoadSearch: action.payload,
      }
    }

    // cases associated with fetching
    case "SET_NUMBER_OF_OBJECTS_TO_BE_FETCHED": {
      return {
        ...state,
        numberOfObjectsToBeFetched: action.payload,
      }
    }
    case "FETCH_DATA_START": {
      return {
        ...state,
        fetching: true,
      }
    }
    case "FETCHING_NOT_FINISHED": {
      return {
        ...state,
        numberOfObjectsFetchedSoFar: action.payload.currentlyFetched
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
    case "RESET_FETCHING":{
      return {
        ...state,
        objects: [],
        fetching: false,
        fetched: false,
        error: null,
        numberOfObjectsToBeFetched: 0,
        numberOfObjectsFetchedSoFar: 0,
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

    case "SET_OBJEKTTYPE_INFO": {
      return{...state, objekttypeInfo: action.payload}
    }
  }
  return state
}
