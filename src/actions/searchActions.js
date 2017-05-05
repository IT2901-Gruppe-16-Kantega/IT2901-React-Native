//
import {searchForKommune, searchForFylke, searchForVegobjekttyper} from '../utilities/searchUtils';
import {fylker} from '../data/fylker';
import {kommuner} from '../data/kommuner';
import {vegobjekttyper} from '../data/vegobjekttyper';

export function inputClosestRoads(input) {
  return {
    type: "INPUT_CLOSEST_ROADS",
    payload: input,
  }
}

//functions for handling input in all searchfields
export function chooseKommune(input) {
  return function(dispatch) {
    const intInput = parseInt(input);
    var kommune;
    if(intInput) { kommune = [kommuner.find(k => k.nummer === intInput)] }
    else { kommune = input }

    dispatch({
        type: "CHOOSE_KOMMUNE",
        payload: kommune,
      })
    const fylke = fylker.find(f => {return f.nummer === kommune[0].fylke})
    dispatch({
      type: "CHOOSE_FYLKE_FROM_KOMMUNE",
      payload: fylke,
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
            fylkeText: input,
          }})
        }
        else {
          dispatch({type: "INPUT_FYLKE_MULTIPLE", payload: {
            result: result,
            fylkeText: input,
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
  const intInput = parseInt(input);
  var fylke;
  if(intInput) { fylke = [fylker.find(f => f.nummer === intInput)] }
  else { fylke = input }

  return {
    type: "CHOOSE_FYLKE",
    payload: fylke,
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
          vegobjekttyperText: input,
        }})
      }
      else {
        dispatch({type: "INPUT_VEGOBJEKTTYPER_MULTIPLE", payload: {
          result: result,
          vegobjekttyperText: input,
        }})
      }
    })
    .catch((err) => {
      dispatch({type: "INPUT_VEGOBJEKTTYPER_NOT_VALID", payload: input})
    })
  }
}

export function chooseVegobjekttyper(input) {
  const intInput = parseInt(input);
  var vegobjekttype;
  if(intInput) { vegobjekttype = [vegobjekttyper.find(v => v.id === intInput)] }
  else { vegobjekttype = input }

  return{
    type: "CHOOSE_VEGOBJEKTTYPER",
    payload: vegobjekttype,
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
        if(result.length === 1) {
          dispatch({type: "INPUT_KOMMUNE_SINGLE", payload: {
            result: result,
            kommuneText: input,
          }})
        }
        else {
          dispatch({type: "INPUT_KOMMUNE_MULTIPLE", payload: {
            result: result,
            kommuneText: input,
          }})
        }
      })
      .catch((err) => {
        dispatch({type: "INPUT_KOMMUNE_NOT_VALID", payload: input})
      })
    }
  }
}



export function combineSearchParameters(parameters) {
  return {
    type: "COMBINE_PARAMETERS",
    payload: parameters,
  }
}

export function resetPositionSearchParameters() {
  return { type: "RESET_POSITION_SEARCH_PARAMETERS" }
}

export function resetSearchParameters() {
  return {
    type: "RESET_SEARCH_PARAMETERS"
  }
}

export function selectSearchCoordinate(coordinate) {
  coordinate.latitudeDelta = 0.005;
  coordinate.longitudeDelta = 0.005;
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

export function generateURL() {
  return { type: "GENERATE_URL" }
}

export function incrementFakeProgress() {
  return { type: "INCREMENT_FAKE_PROGRESS" }
}

export function resetFakeProgress() {
  return { type: "RESET_FAKE_PROGRESS" }
}
