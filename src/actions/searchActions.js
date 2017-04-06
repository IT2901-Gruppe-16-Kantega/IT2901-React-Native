//
import {searchForKommune, searchForFylke, searchForVegobjekttyper} from '../utilities/utils';
import {fylker} from '../data/fylker';


//functions for handling input in all searchfields
export function chooseKommune(input) {
  return function(dispatch) {
    dispatch({
        type: "CHOOSE_KOMMUNE",
        payload: input,
      })
    var f = []
    f.push(fylker.find((fylke)=>{return fylke.nummer == input[0].fylke}))
    dispatch({
      type: "CHOOSE_FYLKE_FROM_KOMMUNE",
      payload: f,
    })
  }
}

export function resetVegField(){
  return {
    type: "RESET_VEGFIELD"
  }
}
export function inputFylke(input){
  return function(dispatch) {
    if(input == ""){
      dispatch({type: "INPUT_FYLKE_RESET"})
    }
    else{
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
        dispatch({type: "INPUT_FYLKE_NOT_VALID", payload: input})
      })
    }
  }
}

export function chooseFylke(input) {
  return{
    type: "CHOOSE_FYLKE",
    payload: input,
  }
}

export function inputVeg(input) {
  return {
    type: "INPUT_VEG",
    payload: input,
  }
}

export function inputVegobjekttyper(input) {
  return function(dispatch) {
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
      dispatch({type: "INPUT_VEGOBJEKTTYPER_NOT_VALID", payload: input})
    })
  }
}

export function chooseVegobjekttyper(input) {
  return{
    type: "CHOOSE_VEGOBJEKTTYPER",
    payload: input,
  }
}

export function setValidityOfVeg(input) {
  return function(dispatch) {
    if(input == 'VALID'){
      dispatch({
        type: "INPUT_VEG_VALID"
      })
    }
    else if (input == 'NOT_VALID') {
      dispatch({
        type: "INPUT_VEG_NOT_VALID"
      })
    }
    else {
      dispatch({
        type: "INPUT_VEG_NOT_CHOSEN"
      })
    }
  }
}

export function inputKommune(input, fylke) {
  return function(dispatch) {
    if(input == ""){
      dispatch({type: "INPUT_KOMMUNE_RESET"})
    }
    else{
      searchForKommune(input, fylke)
      .then((result) => {
        if(result.length==1){
          dispatch({type: "INPUT_KOMMUNE_SINGLE", payload: {
            result: result,
            kommune_text: input,
          }})
        }
        else {
          dispatch({type: "INPUT_KOMMUNE_MULTIPLE", payload: {
            result: result,
            kommune_text: input,
          }})
        }
      })
      .catch((err) => {
        dispatch({type: "INPUT_KOMMUNE_NOT_VALID", payload: input})
      })
    }
  }
}



export function combineSearchParameters(fylke_input, veg_input, kommune_input, vegobjekttype) {
  var combinedSearchParameters = [fylke_input, veg_input, kommune_input, vegobjekttype];
  return {
    type: "COMBINE_PARAMETERS",
    payload: combinedSearchParameters,
  }
}

export function resetSearchParameters() {
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
  return {
    type: "SET_FYLKE_COORDINATES",
    payload: coordinates,
  }
}

export function setURL(url) {
  return {
    type: "SET_URL",
    payload: url,
  }
}
