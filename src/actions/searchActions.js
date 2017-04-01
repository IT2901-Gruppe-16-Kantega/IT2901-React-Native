//
import {searchForKommune, searchForFylke, searchForVegkategori, searchForVeg, searchForVegobjekttyper} from '../utilities/utils';

//functions for handling input in all searchfields
export function setURL(url){
  return {
    type: "SET_URL",
    payload: url,
  }
}

export function inputFylke(input){
  return function(dispatch) {
    searchForFylke(input.text)
    .then((result) => {
      if(result.length==1){
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
      dispatch({type: "INPUT_FYLKE_NOT_VALID", payload: input.text})
    })
  }
}
export function chooseFylke(input){
  return{
    type: "CHOOSE_FYLKE",
    payload: input,
  }
}

export function inputVeg(input){
  return {
    type: "INPUT_VEG",
    payload: input,
  }
}

export function inputVegobjekttyper(input){
  return function(dispatch) {
    //TODO
    searchForVegobjekttyper(input.text)
    .then((result) => {
      if(result.length==1){
        dispatch({type: "INPUT_VEGOBJEKTTYPER_SINGLE", payload: {
          result: result,
          vegobjekttyper_text: input.text,
        }})
      }
      else {
        dispatch({type: "INPUT_VEGOBJEKTTYPER_MULTIPLE", payload: {
          result: result,
          vegobjekttyper_text: input.text,
        }})
      }
    })
    .catch((err) => {
      dispatch({type: "VEGOBJEKTTYPER_INPUT_NOT_VALID", payload: input.text})
    })
  }
}
export function chooseVegobjekttyper(input){
  return{
    type: "CHOOSE_VEGOBJEKTTYPER",
    payload: input,
  }
}


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


export function combineSearchParameters(fylke_input, veg_input, vegobjekttype){
  var combinedSearchParameters = [fylke_input, veg_input, vegobjekttype];
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
