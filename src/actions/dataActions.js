import moment from 'moment';
import {fetchFylker} from '../utilities/wrapper';

//Creating storage, should move to own file to handel storing settings etc
import storageEngine from '../utilities/storageEngine'
const storage = storageEngine('NVDB-storage')
/*
  Actions associated with searches
*/

//TODO
export function deleteSearch(search) {

}
//TODO
export function clearAllSearches() {
  return {
    type: "CLEAR_SEARCHES"
  }

}

export function loadSearches(searches){
  return {
    type: "LOAD_SEARCHES",
    payload: searches,
  }
}

export function setLoadingProgress(progress) {
  return {
    type: "SET_LOADING_PROGRESS",
    payload: progress,
  }
}

export function setCurrentRoadSearch(roadSearch){
  return {
    type: "SET_CURRENT_ROAD_SEARCH",
    payload: roadSearch,
  }
}


export function createSearchObject(description, objects, report, combParams, objekttypeInfo) {
  var roadSearch = {
    key: Date.now(),
    date: moment().format('MMMM Do YYYY, h:mm:ss a'),
    description: description,
    roadObjects: objects,
    report: report,
    searchParameters: combParams,
    objekttypeInfo: objekttypeInfo,
  }
  searchSaved(roadSearch)
  return {
    type: "ADD_NEW_SEARCH_OBJECT",
    payload: roadSearch,
  }
}

export function searchSaved(roadSearch) {
  storage.saveSearch(roadSearch)
  return {type: "SEARCH_SAVED"}

}

/*
  Actions associated with fetching
*/
export function setNumberOfObjectsToBeFetched(number){
  return{
    type: "SET_NUMBER_OF_OBJECTS_TO_BE_FETCHED",
    payload: number,
  }
}

//Function that sets fetching=true
export function fetchDataStart() {
  return {
    type: "FETCH_DATA_START"
  }
}

//Function callback called by fetchFromAPI_all with data from API
export function fetchDataReturned(data, fetched) {
  var fetching = true;
  if(fetched) {
    fetching = false;
    //return if all objects is fetched
    return {
      type: "FETCH_DATA_RETURNED",
      payload: {
        data: data,
        fetched: fetched,
        fetching: fetching,
      }
    }
  }
  else {
    //return if not all objects are fetched
    return {
      type: "FETCHING_NOT_FINISHED",
      payload: {
        currentlyFetched: data.length,

      }
    }
  }
}

export function resetFetching(){
  return{
    type: "RESET_FETCHING"
  }
}

export function clearData(){
  return{
    type: "CLEAR_DATA",
  }
}


/*
  Actions associated with filewriter
*/
export function writingFile() {
  return {
    type: "WRITING_FILE",
  }
}

export function setObjekttypeInfo(objekttypeInfo) {
  return {
    type: "SET_OBJEKTTYPE_INFO",
    payload: objekttypeInfo,
  }
}

//TODO blir denne brukt????

export function inputFylke(input){
  return function(dispatch) {
    searchForFylke(input.text)
    .then((result) => {
      if(result.length == 1){
        dispatch({type: "INPUT_FYLKE_SINGLE", payload: {
          result: result,
          fylke_text: input.text,
        }})
      }
      else {
        dispatch({type: "INPUT_FYLKE_MULTIPLE", payload: {
          result: result,
          fylke_text: input.text,
        }})
      }
    })
    .catch((err) => {
      dispatch({type: "FYLKE_INPUT_NOT_VALID", payload: input.text})
    })
  }
}

export function addRoadObject(object) {
  return {
    type: "ADD_ROAD_OBJECT",
    payload: object,
  }
}

export function setIsEditingRoadObject(editing) {
  return {
    type: "SET_IS_EDITING_ROAD_OBJECT",
    payload: editing,
  }
}

export function inputPropertyValue(value, property) {
  return {
    type: "INPUT_PROPERTY_VALUE",
    payload: {value, property},
  }
}

export function resetNewPropertyValue() {
  return {
    type: "RESET_NEW_PROPERTY_VALUE",
  }
}
