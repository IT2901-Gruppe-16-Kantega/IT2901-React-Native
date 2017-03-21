//SearchReducer holds all informartion typed in by user in searchFormField
//and packages this into url
import * as templates from '../utilities/templates'

export default function reducer(state={
  //legg inn react.proptypes

  //FYLKESHIT
  fylke_input: [],
  fylke_navn: '',
  fylke_text: '',
  fylke_chosen: false,

  //vegkategoriershit
  vegkategorier: ['Europaveg', 'Riksveg', 'Fylkesveg', 'Kommunal veg'],

  vegkategori_enabled: false,
  vegkategori_input: [],
  vegkategori_navn: '',
  vegkategori_text: '',
  vegkategori_chosen: false,

  //VEISHIT
  vei_enabled: false,
  vei_input: [],
  vei_navn: '',
  vei_text: '',
  vei_chosen: false,

  fetching_veier: false,

  //inputfelter
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
    case "INPUT_VEGKATEGORI_MULTIPLE": {
      return{
        ...state,
        vegkategori_input: action.payload.result,
        vegkategori_chosen: false,
        vegkategori_text: action.payload.vegkategori_text,
      }
    }
    case "INPUT_VEGKATEGORI_SINGLE": {
      return{
        ...state,
        vegkategori_input: action.payload.result,
        vegkategori_navn: action.payload.result[0].navn,
        vegkategori_chosen: false,
        vegkategori_text: action.payload.vegkategori_text,
      }
    }
    case "VEGKATEGORI_INPUT_NOT_VALID": {
      return{
        ...state,
        vegkategori_input: [],
        vegkategori_navn: '',
        vegkategori_text: action.payload,
        vegkategori_chosen: false,
      }
    }
    case "CHOOSE_VEGKATEGORI": {
      return {
        ...state,
        vegkategori_input: action.payload,
        vegkategori_valid: true,
        vegkategori_navn: action.payload[0].navn,
        vegkategori_text: action.payload[0].navn,
        vegkategori_chosen: true,
      }
    }



    case "INPUT_FYLKE_MULTIPLE": {
      return{
        ...state,
        fylke_input: action.payload.result,
        fylke_chosen: false,
        fylke_text: action.payload.fylke_text,

        vei_enabled: false,
      }
    }
    case "INPUT_FYLKE_SINGLE": {
      return{
        ...state,
        fylke_input: action.payload.result,
        fylke_navn: action.payload.result[0].navn,
        fylke_chosen: false,
        fylke_text: action.payload.fylke_text,

        vei_enabled: true,
      }
    }
    case "FYLKE_INPUT_NOT_VALID": {
      return{
        ...state,
        fylke_input: [],
        fylke_navn: '',
        fylke_text: action.payload,
        fylke_chosen: false,

        vei_enabled: false,
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

        vei_enabled: true,
      }
    }


    case "INPUT_VEI_MULTIPLE": {
      return{
        ...state,
        vei_input: action.payload.result,
        vei_chosen: false,
        vei_text: action.payload.fylke_text,
      }
    }
    case "INPUT_VEI_SINGLE": {
      return{
        ...state,
        vei_input: action.payload.result,
        vei_navn: action.payload.result[0].navn,
        vei_chosen: false,
        vei_text: action.payload.fylke_text,
      }
    }
    case "VEI_INPUT_NOT_VALID": {
      return{
        ...state,
        vei_input: [],
        vei_navn: '',
        vei_text: action.payload,
        vei_chosen: false,
      }
    }
    case "CHOOSE_VEI": {
      return {
        ...state,
        vei_input: action.payload,
        vei_valid: true,
        vei_navn: action.payload[0].navn,
        vei_text: action.payload[0].navn,
        vei_chosen: true,
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
