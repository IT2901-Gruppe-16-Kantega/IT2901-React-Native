

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
  selectedObject: null,

  // used by currentSearchView
  description: "",

  //currently not used
  currentRoadSearchIndex: null,
  andel_egengeometri: null,

  //used by filewriter
  writing_file: false,

  objekttypeInfo: [], // Not used?

  isEditingRoadObject: false,
  editingProperty: null,
  newPropertyValue: null,

  loadingProgress: 1,

}, action) {
  switch (action.type) {
    // cases associated with searches

    /*case "REPORT_ROAD_OBJECT": {
      const searches = state.allSearches
      const search = action.payload
      searches.splice(searches.indexOf(search), 1)
      searches.push(search);
      return {...state, allSearches: searches, currentRoadSearch: search}
    }*/
    case "REPORT_CHANGE": {
      const searches = state.allSearches;
      const search = state.currentRoadSearch;
      const object = state.selectedObject;
      const change = action.payload;

      const foundReport = search.report.find(report => report.vegobjekt === object.id);
      if(foundReport) {
        const indexOfFoundProperty = foundReport.endringer.map(e => e.egenskap.id).indexOf(change.egenskap.id);
        if(indexOfFoundProperty >= 0) {
          foundReport.endringer[indexOfFoundProperty] = change;
        } else {
          foundReport.endringer.push(change);
        }
      } else {
        search.report.push({vegobjekt: object.id, endringer: [change]})
      }

      searches.splice(searches.indexOf(search), 1);
      searches.push(search);

      return {...state, allSearches: searches}
    }
    case "SELECT_OBJECT": {
      return {...state, selectedObject: action.payload}
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
