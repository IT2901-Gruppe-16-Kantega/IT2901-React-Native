import moment from 'moment';

//Creating storage, should move to own file to handel storing settings etc
import storageEngine from '../utilities/storageEngine'
const storage = storageEngine('NVDB-storage')
/*
  Actions associated with searches
*/


/*export function reportRoadObject(reportObject, roadSearch) {
  roadSearch.report.push(reportObject)
  storage.saveSearch(roadSearch)
  return {
    type: "REPORT_ROAD_OBJECT",
    payload: roadSearch,
  }
}*/

export function reportChange(search, object, change, shouldDelete) {
  const foundReport = search.report.find(r => r.vegobjekt === object.id);

  if(foundReport) {
    const indexOfFoundProperty = foundReport.endringer.map(e => e.egenskap.id).indexOf(change.egenskap.id);
    if(indexOfFoundProperty >= 0) {
      if(shouldDelete) { foundReport.endringer.splice(indexOfFoundProperty, 1) }
      else { foundReport.endringer[indexOfFoundProperty] = change }
    } else if(!shouldDelete) {
      foundReport.endringer.push(change);
    }
  } else if(!shouldDelete) {
    search.report.push({vegobjekt: object.id, endringer: [change]})
  }
  storage.saveSearch(search);

  return {
    type: "REPORT_CHANGE",
    payload: search,
  }
}

export function selectObject(roadObject) {
  return {
    type: "SELECT_OBJECT",
    payload: roadObject,
  }
}

export function setDescription(input) {
  return {
    type: "SET_DESCRIPTION",
    payload: input,
  }
}


export function deleteSearch(allSearches, search) {
  allSearches.splice(allSearches.indexOf(search), 1)
  return {
    type: "DELETE_SEARCH",
    payload: allSearches,
  }

}

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

export function setCurrentRoadSearch(roadSearch) {
  return {
    type: "SET_CURRENT_ROAD_SEARCH",
    payload: roadSearch,
  }
}


export function createSearchObject(description, objects, report, combParams) {
  var roadSearch = {
    key: Date.now(),
    date: moment().format('MMMM Do YYYY, h:mm:ss a'),
    description: description,
    roadObjects: objects,
    report: report,
    searchParameters: combParams,
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

/*
  Actions associated with filewriter
*/
export function writingFile() {
  return {
    type: "WRITING_FILE",
  }
}

export function setFilteredRoadObjects(roadObjects) {
  return {
    type: "SET_FILTERED_ROAD_OBJECTS",
    payload: roadObjects,
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
          fylkeText: input.text,
        }})
      }
      else {
        dispatch({type: "INPUT_FYLKE_MULTIPLE", payload: {
          result: result,
          fylkeText: input.text,
        }})
      }
    })
    .catch((err) => {
      dispatch({type: "FYLKE_INPUT_NOT_VALID", payload: input.text})
    })
  }
}

export function objectsReturned(objects) {
  return {
    type: "OBJECTS_RETURNED",
    payload: objects,
  }
}

export function roadsReturned(returned) {
  return {
    type: "ROADS_RETURNED",
    payload: returned,
  }
}

export function setNumberOfRoadsToBeFetched(number) {
  return {
    type: "SET_NUMBER_OF_ROADS_TO_BE_FETCHED",
    payload: number,
  }
}

export function setFetching(fetching) {
  return {
    type: "SET_FETCHING",
    payload: fetching,
  }
}
