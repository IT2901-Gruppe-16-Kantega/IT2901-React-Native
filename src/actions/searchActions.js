//
import {createBST, searchForKommune} from '../utilities/utils';
createBST();

//functions for handling input in all searchfields

export function inputKommune(input){
  return function(dispatch) {
    searchForKommune(input.text)
    .then((result) => {
      dispatch({type: "INPUT_KOMMUNE", payload: result})
    })
    .catch((err) => {
      dispatch({type: "KOMMUNE_INPUT_NOT_VALID", payload: err})
    })
  }
}


export function combineSearchParameters(kommune){
  var combinedSearchParameters = [kommune];
  return {
    type: "COMBINE_PARAMETERS",
    payload: combinedSearchParameters,
  }
}

export function resetSearchParameters(){
  return {
    type: "RESET_SEARCH_PARAMETERS"
  }
}
