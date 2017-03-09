// will contain actions that depend on NVDB

//REMOVE WRAPPER?
import wrapper from '../utilities/wrapper'
import {createBST, searchForKommune} from '../utilities/utils';
import moment from 'moment';
//createBST();


/*
  Actions associated with searches
*/

export function setCurrentRoadSearch(roadSearch){
  return {
    type: "SET_CURRENT_ROAD_SEARCH",
    payload: roadSearch,
  }
}


export function createSearchObject(description, objects, report, combParams){
  var roadSearch = {
    key: Date.now(),
    date: moment().format('MMMM Do YYYY, h:mm:ss a'),
    description: description,
    roadObjects: objects,
    report: report,
    searchParameters: combParams
    }
  return {
    type: "ADD_NEW_SEARCH_OBJECT",
    payload: roadSearch,
  }
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
export function fetchDataStart(){
  return{
    type: "FETCH_DATA_START"
  }
}
//Function callback called by fetchFromAPI_all with data from API
export function fetchDataReturned(data, fetched) {
  var fetching = true;
  if(fetched==true){
    fetching = false;
    //return if all objects is fetched
    return{
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
    return{
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
