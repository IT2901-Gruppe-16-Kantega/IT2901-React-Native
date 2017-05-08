

export default function reducer(state={
  fetching: false,
  fetched: false,
  error: null,
  numberOfObjectsToBeFetched: 0,
  numberOfObjectsFetchedSoFar: 0,

  numberOfRoadsToBeFetched: 0,

  objects: [], //objects are stored here as they are fetched from NVDB, before added to a raodSearch Object
  roads: [],

  allSearches:[],

  //this holds the currently chosen roadSearch to avoid calling the entire array all the time
  currentRoadSearch: null,
  selectedObject: null,
  filteredRoadObjects: [],

  // used by currentSearchView
  description: "",

  //used by filewriter
  writingFile: false,

  isEditingRoadObject: false,
  editingProperty: null,
  newPropertyValue: null,

  loadingProgress: 1,

}, action) {
  switch (action.type) {
    case "REPORT_CHANGE": {
      const search = action.payload;
      const searches = state.allSearches;
      var newSearches = searches.splice(searches.indexOf(s => s.key === search.key), 1);
      newSearches.push(search);

      return {...state, allSearches: newSearches, currentRoadSearch: search}
    }
    case "SELECT_OBJECT": {
      var object;
      if(action.payload.id) { object = action.payload }
      else { object = state.currentRoadSearch.roadObjects.find(o => o.id === action.payload) }
      return {...state, selectedObject: object}
    }
    case "SET_DESCRIPTION": {
      return {...state, description: action.payload}
    }
    case "DELETE_SEARCH": {
      return {...state, allSearches: action.payload}
    }
    case "CLEAR_SEARCHES": {
      return {...state, allSearches: []}
    }
    case "LOAD_SEARCHES": {
      return {...state, allSearches: action.payload}
    }
    case "SET_LOADING_PROGRESS": {
      return {...state, loadingProgress: action.payload}
    }
    case "SEARCH_SAVED": {
      return {...state}
    }
    case "ADD_NEW_SEARCH_OBJECT": {
      return {
        ...state,
        allSearches: [...state.allSearches, action.payload],
        currentRoadSearch: action.payload,
      }
    }
    case "SET_CURRENT_ROAD_SEARCH": {
      var search;
      if(action.payload && action.payload.key) { search = action.payload }
      else { search = state.allSearches.find(s => s.key === action.payload) }

      return {...state, currentRoadSearch: search}
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
    case "FETCH_DATA_RETURNED": {
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
    //used by filewriter
    case "WRITING_FILE": {
      return {
        ...state,
        writingFile: true,
      }
    }
    case "SET_FILTERED_ROAD_OBJECTS": {
      return {...state, filteredRoadObjects: action.payload}
    }

    case "OBJECTS_RETURNED": {
      return {...state, objects: action.payload, numberOfObjectsFetchedSoFar: action.payload.length}
    }
    case "ROADS_RETURNED": {
      return {...state, roads: action.payload}
    }
    case "SET_NUMBER_OF_ROADS_TO_BE_FETCHED": {
      return {...state, numberOfRoadsToBeFetched: action.payload}
    }
  }
  return state
}
