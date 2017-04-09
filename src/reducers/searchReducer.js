//SearchReducer holds all informartion typed in by user in searchFormField
//and packages this into url
import * as templates from '../utilities/templates'

export default function reducer(state={
  //legg inn react.proptypes

  // Fylke variables
  // List used to hold all the returned possible choises based on user input
  fylke_input: [],
  // String used to set the text of inputfield when the user has chosen a value
  fylke_text: '',
  // Boolean used to specify if the user has chosen a value
  fylke_chosen: false,
  // Color of the underline in textinput field, used to give feedback on validity of input
  fylke_color: templates.colors.orange,

  //Veg variables
  veg_input: '',
  veg_color: templates.colors.orange,
  veg_valid: false,

  //Kommune variables
  kommune_input: [],
  kommune_text: '',
  kommune_chosen: false,
  kommune_color: templates.colors.orange,

  //Vegobjekttyper varibales
  vegobjekttyper_input: [],
  vegobjekttyper_text: '',
  vegobjekttyper_chosen: false,
  vegobjekttyper_color: templates.colors.red,

  //
  url: '',

  //rekkefølgen på objektene i denne må bli definert
  combinedSearchParameters: {},

  searchCoordinate: null,

  fylkeCoordinates: null,

  closestRoadsList: [],

  //To be removed:
  fylke_navn: '',
  kommune_navn: '',
  vegobjekttyper_navn: '',

}, action) {
  switch (action.type) {
    case "INPUT_CLOSEST_ROADS": {
      return {
        ...state,
        closestRoadsList: action.payload,
      }
    }
    case "INPUT_KOMMUNE_RESET": {
      return {
        ...state,
        kommune_input: [],
        kommune_text: '',
        kommune_chosen: false,
        kommune_color: templates.colors.orange,
      }
    }
    case "INPUT_FYLKE_RESET": {
      return {
        ...state,
        fylke_input: [],
        fylke_text: '',
        fylke_chosen: false,
        fylke_color: templates.colors.orange,
        kommune_input: [],
        kommune_text: '',
        kommune_chosen: false,
        kommune_color: templates.colors.orange,
      }
    }
    case "RESET_VEGFIELD": {
      return {
        ...state,
        veg_color: templates.colors.orange,
        veg_valid: false,
      }
    }
    case "INPUT_VEG_NOT_CHOSEN": {
      return {
        ...state,
        veg_color: templates.colors.orange,
        veg_valid: false,
      }
    }
    case "SET_URL": {
      return {
        ...state,
        url: action.payload,
      }
    }

    case "INPUT_FYLKE_MULTIPLE": {
      return{
        ...state,
        fylke_input: action.payload.result,
        fylke_chosen: false,
        fylke_text: action.payload.fylke_text,
        fylke_color: templates.colors.orange,

        kommune_color: templates.colors.orange,
        kommune_input: [],
        kommune_chosen: false,

      }
    }
    case "INPUT_FYLKE_SINGLE": {
      return{
        ...state,
        fylke_input: action.payload.result,
        fylke_navn: action.payload.result[0].navn,
        fylke_chosen: false,
        fylke_text: action.payload.fylke_text,
        fylke_color: templates.colors.orange,
        kommune_color: templates.colors.orange,
        kommune_input: [],
        kommune_chosen: false,

      }
    }
    case "INPUT_FYLKE_NOT_VALID": {
      return{
        ...state,
        fylke_input: [],
        fylke_navn: '',
        fylke_text: action.payload,
        fylke_chosen: false,
        fylke_color: 'red',

        kommune_color: templates.colors.orange,
        kommune_input: [],

      }
    }
    case "CHOOSE_FYLKE": {
      return {
        ...state,
        fylke_input: action.payload,
        fylke_navn: action.payload[0].navn,
        fylke_text: action.payload[0].navn,
        fylke_chosen: true,
        fylke_color: templates.colors.green,

        kommune_input: [],
        kommune_text: '',


        kommune_color: templates.colors.orange,
      }
    }
    case "CHOOSE_FYLKE_FROM_KOMMUNE": {
      return {
        ...state,
        fylke_input: [action.payload],
        fylke_navn: action.payload.navn,
        fylke_text: action.payload.navn,
        fylke_chosen: true,
        fylke_color: templates.colors.green,
      }
    }

    case 'INPUT_VEG': {
      return{
        ...state,
        veg_input: action.payload,
      }
    }

    case 'INPUT_VEG_VALID': {
      return{
        ...state,
        veg_valid: true,
        veg_color: templates.colors.green,
      }
    }
    case 'INPUT_VEG_NOT_VALID': {
      return{
        ...state,
        veg_valid: false,
        veg_color: 'red',
      }
    }

    case "INPUT_KOMMUNE_MULTIPLE": {
      return{
        ...state,
        kommune_input: action.payload.result,
        kommune_text: action.payload.kommune_text,
        kommune_chosen: false,
        kommune_color: templates.colors.orange,
      }
    }
    case "INPUT_KOMMUNE_SINGLE": {
      return{
        ...state,
        kommune_input: action.payload.result,
        kommune_navn: action.payload.result[0].navn,
        kommune_text: action.payload.kommune_text,
        kommune_chosen: false,
        kommune_color: templates.colors.orange,
      }
    }
    case "INPUT_KOMMUNE_NOT_VALID": {
      return{
        ...state,
        kommune_input: [],
        kommune_navn: '',
        kommune_text: action.payload,
        kommune_chosen: false,
        kommune_color: 'red',
      }
    }
    case "CHOOSE_KOMMUNE": {
      return {
        ...state,
        kommune_input: action.payload,
        kommune_navn: action.payload[0].navn,
        kommune_text: action.payload[0].navn,
        kommune_chosen: true,
        kommune_color: templates.colors.green,

      }
    }

    case "INPUT_VEGOBJEKTTYPER_MULTIPLE": {
      return{
        ...state,
        vegobjekttyper_input: action.payload.result,
        vegobjekttyper_chosen: false,
        vegobjekttyper_text: action.payload.vegobjekttyper_text,
        vegobjekttyper_color: templates.colors.orange,
      }
    }
    case "INPUT_VEGOBJEKTTYPER_SINGLE": {
      return{
        ...state,
        vegobjekttyper_input: action.payload.result,
        vegobjekttyper_navn: action.payload.result[0].navn,
        vegobjekttyper_chosen: false,
        vegobjekttyper_text: action.payload.vegobjekttyper_text,
        vegobjekttyper_color: templates.colors.orange,
      }
    }
    case "INPUT_VEGOBJEKTTYPER_NOT_VALID": {
      return{
        ...state,
        vegobjekttyper_input: [],
        vegobjekttyper_navn: '',
        vegobjekttyper_text: action.payload,
        vegobjekttyper_chosen: false,
        vegobjekttyper_color: 'red',
      }
    }
    case "CHOOSE_VEGOBJEKTTYPER": {
      return {
        ...state,
        vegobjekttyper_input: action.payload,
        vegobjekttyper_navn: action.payload[0].navn,
        vegobjekttyper_text: action.payload[0].navn,
        vegobjekttyper_chosen: true,
        vegobjekttyper_color: templates.colors.green,
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
        fylke_input: [],
        fylke_navn: '',
        fylke_text: '',
        fylke_chosen: false,
        fylke_color: templates.colors.orange,

        veg_input: '',
        veg_color: templates.colors.orange,
        veg_valid: false,

        kommune_input: [],
        kommune_navn: '',
        kommune_text: '',
        kommune_chosen: false,
        kommune_color: templates.colors.orange,

        vegobjekttyper_input: [],
        vegobjekttyper_navn: '',
        vegobjekttyper_text: '',
        vegobjekttyper_chosen: false,
        vegobjekttyper_color: templates.colors.orange,

        url: '',

        combinedSearchParameters: [],
      }
    }
    case "RESET_POSITION_SEARCH_PARAMETERS": {
      return {
        ...state,
        fylke_input: [],
        fylke_navn: '',
        fylke_text: '',
        fylke_chosen: false,
        fylke_color: templates.colors.orange,

        veg_input: '',
        veg_color: templates.colors.orange,
        veg_valid: false,

        kommune_input: [],
        kommune_navn: '',
        kommune_text: '',
        kommune_chosen: false,
        kommune_color: templates.colors.orange,

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
  }
  return state
}
