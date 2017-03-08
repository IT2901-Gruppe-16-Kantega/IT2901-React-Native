// will contain actions that depend on NVDB

//REMOVE WRAPPER?
import wrapper from '../utilities/wrapper'
import {createBST, searchForKommune} from '../utilities/utils';
//createBST();



export function newSearch(roadSearch) {
  return {
    type: "NEW_SEARCH",
  }
}

export function createSearchObject(description, objects, report, combParams){
  var roadSearch = {
    key: Date.now(),
    description: description,
    roadObjects: objects,
    report: report,
    searchParamaters: combParams
    }
  return {
    type: "ADD_NEW_SEARCH_OBJECT",
    payload: roadSearch,
  }
}


export function chooseSearch(id){
  return {
    type: "CHOOSE_SEARCH",
    payload: id
  }
}

export function fetchDataStart(){
  return{
    type: "FETCH_DATA_START"
  }
}
export function fetchDataReturned(data, fetched) {
  var fetching = true;
  if(fetched==true){
    fetching = false;
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
    return{
      type: "FETCHING_NOT_FINISHED",
      payload: {
        currentlyFetched: data.length,
      }
    }
  }

}
export function clearData(){
  return{
    type: "CLEAR_DATA",
  }
}

//may beused by filewriter
export function writingFile() {
  return {
    type: "WRITING_FILE",
  }
}
