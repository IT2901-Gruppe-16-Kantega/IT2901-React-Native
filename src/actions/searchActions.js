//
import {createBST, searchForKommune, searchForFylke, searchForVegkategori, searchForVeg, searchForVegobjekttyper} from '../utilities/utils';
createBST();

//functions for handling input in all searchfields
export function setURL(url){
  return {
    type: "SET_URL",
    payload: url,
  }
}

export function inputFylke(input) {
  return function(dispatch) {
    searchForFylke(input)
    .then((result) => {
      if(result.length == 1){
        dispatch({type: "INPUT_FYLKE_SINGLE", payload: {
          result: result,
          fylke_text: input,
        }})
      }
      else {
        dispatch({type: "INPUT_FYLKE_MULTIPLE", payload: {
          result: result,
          fylke_text: input,
        }})
      }
    })
    .catch((err) => {
      dispatch({type: "FYLKE_INPUT_NOT_VALID", payload: input})
    })
  }
}

export function chooseFylke(input) {
  return{
    type: "CHOOSE_FYLKE",
    payload: input,
  }
}

export function newInputVeg(input){
  return {
    type: "NEW_INPUT_VEG",
    payload: input,
  }
}

export function inputVegobjekttyper(input) {
  return function(dispatch) {
    //TODO
    searchForVegobjekttyper(input)
    .then((result) => {
      if(result.length == 1){
        dispatch({type: "INPUT_VEGOBJEKTTYPER_SINGLE", payload: {
          result: result,
          vegobjekttyper_text: input,
        }})
      }
      else {
        dispatch({type: "INPUT_VEGOBJEKTTYPER_MULTIPLE", payload: {
          result: result,
          vegobjekttyper_text: input,
        }})
      }
    })
    .catch((err) => {
      dispatch({type: "VEGOBJEKTTYPER_INPUT_NOT_VALID", payload: input})
    })
  }
}
export function chooseVegobjekttyper(input){
  return{
    type: "CHOOSE_VEGOBJEKTTYPER",
    payload: input,
  }
}



//TO be DEPRECATED
export function inputVegkategori(input){
  return function(dispatch) {
    searchForVegkategori(input.text)
    .then((result) => {
      if(result.length==1){
        dispatch({type: "INPUT_VEGKATEGORI_SINGLE", payload: {
          result: result,
          vegkategori_text: input.text,
        }})
      }
      else {
        dispatch({type: "INPUT_VEGKATEGORI_MULTIPLE", payload: {
          result: result,
          vegkategori_text: input.text,
        }})
      }
    })
    .catch((err) => {
      dispatch({type: "VEGKATEGORI_INPUT_NOT_VALID", payload: input.text})
    })
  }
}
export function chooseVegkategori(input){
  return{
    type: "CHOOSE_VEGKATEGORI",
    payload: input,
  }
}

export function inputVeg(input){
  return function(dispatch) {
    searchForVeg(input.text)
    .then((result) => {
      if(result.length==1){
        dispatch({type: "INPUT_VEG_SINGLE", payload: {
          result: result,
          veg_text: input.text,
        }})
      }
      else {
        dispatch({type: "INPUT_VEG_MULTIPLE", payload: {
          result: result,
          veg_text: input.text,
        }})
      }
    })
    .catch((err) => {
      dispatch({type: "VEG_INPUT_NOT_VALID", payload: input.text})
    })
  }
}
export function chooseVeg(input) {
  return{
    type: "CHOOSE_VEG",
    payload: input,
  }
}
export function setFetchingVeger(input) {
  return{
    type: "FETCHING_VEGER",
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

export function selectSearchCoordinate(coordinate) {
  return {
    type: "SELECT_SEARCH_COORDINATE",
    payload: coordinate,
  }
}

export function setFylkeCoordinates(coordinates) {
  console.log("setFylkeCoordinates")
  return {
    type: "SET_FYLKE_COORDINATES",
    payload: coordinates,
  }
}
