//SearchReducer holds all informartion typed in by user in searchFormField
//and packages this into url
import * as templates from '../utilities/templates'

export default function reducer(state={
  //legg inn react.proptypes

  //input fields for fylke new
  fylke_input: [],
  fylke_navn: '',
  fylke_text: '',
  fylke_chosen: false,

  //inputfelter
  vei_input: null,
  kommune_input: null,
  objekttyper: [],



  kommune_input: null,
  kommune_valid: false,
  //color changes as input is validated
  kommune_input_color: 'white',
  kommune_input_color_border: 'lightgray',

  //rekkefølgen på objektene i denne må bli definert
  combinedSearchParameters: {},

  //debugging

}, action) {
  switch (action.type) {
    case "INPUT_FYLKE_MULTIPLE": {
      return{
        ...state,
        fylke_input: action.payload.result,
        fylke_chosen: false,
        fylke_text: action.payload.fylke_text,
      }
    }
    case "INPUT_FYLKE_SINGLE": {
      return{
        ...state,
        fylke_input: action.payload.result,
        fylke_navn: action.payload.result[0].navn,
        fylke_chosen: false,
        fylke_text: action.payload.fylke_text,
      }
    }
    case "FYLKE_INPUT_NOT_VALID": {
      return{
        ...state,
        fylke_input: [],
        fylke_navn: '',
        fylke_text: action.payload,
        fylke_chosen: false,
      }
    }
    case "CHOOSE_FYLKE": {
      return {
        ...state,
        fylke_input: action.payload,
        fylke_valid: true,
        fylke_navn: action.payload[0].navn,
        fylke_text: action.payload[0].navn,
        fylke_chosen: true,
      }
    }


    case "INPUT_KOMMUNE": {
      return{
        ...state,
        kommune_input: action.payload,
        kommune_navn: action.payload.navn,
        kommune_valid: true,
        kommune_input_color: '#00CC00',
        kommune_input_color_border: 'lightgray',

      }
    }
    case "KOMMUNE_INPUT_NOT_VALID": {
      return{
        ...state,
        kommune_valid: false,
        kommune_navn: 'ukjent kommuneId',
        kommune_input_color: '#FF3333',
        kommune_input_color_border: 'lightgray',
      }
    }

    case "COMBINE_PARAMETERS": {
        return{
          ...state,
          combinedSearchParameters: action.payload,
        }
    }
    case "RESET_SEARCH_PARAMETERS": {
      return{
        ...state,
        fylke_input: null,
        fylke_valid: false,
        kommune_input: null,
        kommune_valid: false,
        kommune_input_color: 'white',
        kommune_input_color_border: 'lightgray',
        combinedSearchParameters: [],
        kommune_navn: 'not defined',
      }
    }
  }
  return state
}
