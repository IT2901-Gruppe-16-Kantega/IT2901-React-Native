/**
* Redux reducer, handles all state values associated with the user input in SearchView
* Contains the dynamically created url to be used when fetching from NVDB
* Packages all input fields when user hits "search" into combinedSearchParameters
*/

import * as templates from '../utilities/templates'

export default function reducer(state={
  // Fylke variables
  // List used to hold all the returned possible choises based on user input
  fylkeInput: [],
  // String used to set the text of inputfield when the user has chosen a value
  fylkeText: '',
  // Boolean used to specify if the user has chosen a value
  fylkeChosen: false,
  // Color of the underline in textinput field, used to give feedback on validity of input
  fylkeColor: templates.colors.orange,

  //Veg variables
  vegInput: '',
  vegColor: templates.colors.orange,
  vegValid: false,

  //Kommune variables
  kommuneInput: [],
  kommuneText: '',
  kommuneChosen: false,
  kommuneColor: templates.colors.orange,

  //Vegobjekttyper varibales
  vegobjekttyperInput: [],
  vegobjekttyperText: '',
  vegobjekttyperChosen: false,
  vegobjekttyperColor: templates.colors.red,

  objekttypeInfo: [],

  // URL used when fetching from NVDB
  url: '',
  statisticsURL: '',
  
  combinedSearchParameters: {},
  searchCoordinate: null,
  fylkeCoordinates: null,

  closestRoadsList: [],

  fakeProgress: 0,
  progress: 0,

}, action) {
  switch (action.type) {
    case "SET_OBJEKTTYPE_INFO": {
      return {...state, objekttypeInfo: action.payload}
    }
    case "INPUT_CLOSEST_ROADS": {
      return {
        ...state,
        closestRoadsList: action.payload,
      }
    }
    case "INPUT_KOMMUNE_RESET": {
      return {
        ...state,
        kommuneInput: [],
        kommuneText: '',
        kommuneChosen: false,
        kommuneColor: templates.colors.orange,
      }
    }
    case "INPUT_FYLKE_RESET": {
      return {
        ...state,
        fylkeInput: [],
        fylkeText: '',
        fylkeChosen: false,
        fylkeColor: templates.colors.orange,
        kommuneInput: [],
        kommuneText: '',
        kommuneChosen: false,
        kommuneColor: templates.colors.orange,
      }
    }
    case "RESET_VEGFIELD": {
      return {
        ...state,
        vegColor: templates.colors.orange,
        vegValid: false,
      }
    }
    case "INPUT_VEG_NOT_CHOSEN": {
      return {
        ...state,
        vegColor: templates.colors.orange,
        vegValid: false,
      }
    }
    case "SET_URL": {
      return {
        ...state,
        url: action.payload,
      }
    }
    case "GENERATE_URL": {
      const baseURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/';
      var tStr = '', fStr = '', kStr = '', vStr = '';
      const tChosen = state.vegobjekttyperChosen;
      const fChosen = state.fylkeChosen;
      const kChosen = state.kommuneChosen;
      const vChosen = state.vegInput;

      if(tChosen) { tStr = state.vegobjekttyperInput[0].id }
      if(fChosen) { fStr = 'fylke=' + state.fylkeInput[0].nummer + '&' }
      if(kChosen) { kStr = 'kommune=' + state.kommuneInput[0].nummer + '&' }
      if(vChosen) { vStr = '&vegreferanse=' + state.vegInput + '&' }
      const statisticsURL = baseURL + tStr + '/statistikk?' + fStr + kStr + vStr;
      var fetchingURL = statisticsURL.replace("/statistikk", "") + 'inkluder=alle&srid=4326&antall=8000';

      return {...state, statisticsURL: statisticsURL, url: fetchingURL}
    }

    case "INPUT_FYLKE_MULTIPLE": {
      return{
        ...state,
        fylkeInput: action.payload.result,
        fylkeChosen: false,
        fylkeText: action.payload.fylkeText,
        fylkeColor: templates.colors.orange,

        kommuneColor: templates.colors.orange,
        kommuneInput: [],
        kommuneChosen: false,

      }
    }
    case "INPUT_FYLKE_SINGLE": {
      return{
        ...state,
        fylkeInput: action.payload.result,
        fylkeChosen: false,
        fylkeText: action.payload.fylkeText,
        fylkeColor: templates.colors.orange,
        kommuneColor: templates.colors.orange,
        kommuneInput: [],
        kommuneChosen: false,

      }
    }
    case "INPUT_FYLKE_NOT_VALID": {
      return{
        ...state,
        fylkeInput: [],
        fylkeText: action.payload,
        fylkeChosen: false,
        fylkeColor: 'red',

        kommuneColor: templates.colors.orange,
        kommuneInput: [],

      }
    }
    case "CHOOSE_FYLKE": {
      return {
        ...state,
        fylkeInput: action.payload,
        fylkeText: action.payload[0].navn,
        fylkeChosen: true,
        fylkeColor: templates.colors.green,

        kommuneInput: [],
        kommuneText: '',


        kommuneColor: templates.colors.orange,
      }
    }
    case "CHOOSE_FYLKE_FROM_KOMMUNE": {
      return {
        ...state,
        fylkeInput: [action.payload],
        fylkeText: action.payload.navn,
        fylkeChosen: true,
        fylkeColor: templates.colors.green,
      }
    }

    case 'INPUT_VEG': {
      return{
        ...state,
        vegInput: action.payload,
      }
    }

    case 'INPUT_VEG_VALID': {
      return{
        ...state,
        vegValid: true,
        vegColor: templates.colors.green,
      }
    }
    case 'INPUT_VEG_NOT_VALID': {
      return{
        ...state,
        vegValid: false,
        vegColor: 'red',
      }
    }

    case "INPUT_KOMMUNE_MULTIPLE": {
      return{
        ...state,
        kommuneInput: action.payload.result,
        kommuneText: action.payload.kommuneText,
        kommuneChosen: false,
        kommuneColor: templates.colors.orange,
      }
    }
    case "INPUT_KOMMUNE_SINGLE": {
      return{
        ...state,
        kommuneInput: action.payload.result,
        kommuneText: action.payload.kommuneText,
        kommuneChosen: false,
        kommuneColor: templates.colors.orange,
      }
    }
    case "INPUT_KOMMUNE_NOT_VALID": {
      return{
        ...state,
        kommuneInput: [],
        kommuneText: action.payload,
        kommuneChosen: false,
        kommuneColor: 'red',
      }
    }
    case "CHOOSE_KOMMUNE": {
      return {
        ...state,
        kommuneInput: action.payload,
        kommuneText: action.payload[0].navn,
        kommuneChosen: true,
        kommuneColor: templates.colors.green,

      }
    }

    case "INPUT_VEGOBJEKTTYPER_MULTIPLE": {
      return{
        ...state,
        vegobjekttyperInput: action.payload.result,
        vegobjekttyperChosen: false,
        vegobjekttyperText: action.payload.vegobjekttyperText,
        vegobjekttyperColor: templates.colors.orange,
      }
    }
    case "INPUT_VEGOBJEKTTYPER_SINGLE": {
      return{
        ...state,
        vegobjekttyperInput: action.payload.result,
        vegobjekttyperChosen: false,
        vegobjekttyperText: action.payload.vegobjekttyperText,
        vegobjekttyperColor: templates.colors.orange,
      }
    }
    case "INPUT_VEGOBJEKTTYPER_NOT_VALID": {
      return{
        ...state,
        vegobjekttyperInput: [],
        vegobjekttyperText: action.payload,
        vegobjekttyperChosen: false,
        vegobjekttyperColor: 'red',
      }
    }
    case "CHOOSE_VEGOBJEKTTYPER": {
      return {
        ...state,
        vegobjekttyperInput: action.payload,
        vegobjekttyperText: action.payload[0].navn,
        vegobjekttyperChosen: true,
        vegobjekttyperColor: templates.colors.green,
      }
    }


    case "COMBINE_PARAMETERS": {
        return{
          ...state,
          combinedSearchParameters: action.payload,
        }
    }
    case "RESET_SEARCH_PARAMETERS": {
      return {
        ...state,
        fylkeInput: [],
        fylkeText: '',
        fylkeChosen: false,
        fylkeColor: templates.colors.orange,

        vegInput: '',
        vegColor: templates.colors.orange,
        vegValid: false,

        kommuneInput: [],
        kommuneText: '',
        kommuneChosen: false,
        kommuneColor: templates.colors.orange,

        vegobjekttyperInput: [],
        vegobjekttyperText: '',
        vegobjekttyperChosen: false,
        vegobjekttyperColor: templates.colors.orange,

        url: '',
        statisticsURL: '',
        progress: 0,
        fakeProgress: 0,

        combinedSearchParameters: [],
      }
    }
    case "RESET_POSITION_SEARCH_PARAMETERS": {
      return {
        ...state,
        fylkeInput: [],
        fylkeText: '',
        fylkeChosen: false,
        fylkeColor: templates.colors.orange,

        vegInput: '',
        vegColor: templates.colors.orange,
        vegValid: false,

        kommuneInput: [],
        kommuneText: '',
        kommuneChosen: false,
        kommuneColor: templates.colors.orange,

        url: '',

        combinedSearchParameters: [],
      }
    }
    case "SELECT_SEARCH_COORDINATE": {
      return {...state, searchCoordinate: action.payload}
    }

    case "SET_FYLKE_COORDINATES": {
      return {...state, fylkeCoordinates: action.payload}
    }
    case "INCREMENT_FAKE_PROGRESS": {
      return {...state, fakeProgress: state.fakeProgress + action.payload}
    }
    case "RESET_FAKE_PROGRESS": {
      return {...state, fakeProgress: 0}
    }
    case "SET_PROGRESS": {
      return {...state, progress: action.payload}
    }
  }
  return state
}
