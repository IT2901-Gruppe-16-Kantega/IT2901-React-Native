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

  //Vegshit
  new_veg_input: '',

  //vegobjekttyper fields
  vegobjekttyper_input: [],
  vegobjekttyper_navn: '',
  vegobjekttyper_text: '',
  vegobjekttyper_chosen: false,

  //
  url: '',


  //Lots here to be DEPRECATED

  //vegkategoriershit
  vegkategori_enabled: false, //the same as saying fylike is valid
  vegkategori_input: [],
  vegkategori_navn: '',
  vegkategori_text: '',
  vegkategori_chosen: false,

  //VEGSHIT
  veg_enabled: false,
  veg_input: [],
  veg_navn: '',
  veg_text: '',
  veg_chosen: false,

  fetching_veger: false,

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

  searchCoordinate: null,

}, action) {
  switch (action.type) {
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

        vegkategori_enabled: false,
      }
    }
    case "INPUT_FYLKE_SINGLE": {
      return{
        ...state,
        fylke_input: action.payload.result,
        fylke_navn: action.payload.result[0].navn,
        fylke_chosen: false,
        fylke_text: action.payload.fylke_text,

        vegkategori_enabled: true,
      }
    }
    case "FYLKE_INPUT_NOT_VALID": {
      return{
        ...state,
        fylke_input: [],
        fylke_navn: '',
        fylke_text: action.payload,
        fylke_chosen: false,

        vegkategori_enabled: false,
      }
    }
    case "CHOOSE_FYLKE": {
      return {
        ...state,
        fylke_input: action.payload,
        fylke_navn: action.payload[0].navn,
        fylke_text: action.payload[0].navn,
        fylke_chosen: true,

        vegkategori_enabled: true,
      }
    }

    case 'NEW_INPUT_VEG': {
      return{
        ...state,
        new_veg_input: action.payload,
      }
    }


    case "INPUT_VEGOBJEKTTYPER_MULTIPLE": {
      return{
        ...state,
        vegobjekttyper_input: action.payload.result,
        vegobjekttyper_chosen: false,
        vegobjekttyper_text: action.payload.vegobjekttyper_text,

      }
    }
    case "INPUT_VEGOBJEKTTYPER_SINGLE": {
      return{
        ...state,
        vegobjekttyper_input: action.payload.result,
        vegobjekttyper_navn: action.payload.result[0].navn,
        vegobjekttyper_chosen: false,
        vegobjekttyper_text: action.payload.vegobjekttyper_text,
      }
    }
    case "VEGOBJEKTTYPER_INPUT_NOT_VALID": {
      return{
        ...state,
        vegobjekttyper_input: [],
        vegobjekttyper_navn: '',
        vegobjekttyper_text: action.payload,
        vegobjekttyper_chosen: false,
      }
    }
    case "CHOOSE_VEGOBJEKTTYPER": {
      return {
        ...state,
        vegobjekttyper_input: action.payload,
        vegobjekttyper_navn: action.payload[0].navn,
        vegobjekttyper_text: action.payload[0].navn,
        vegobjekttyper_chosen: true,
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
        fylke_input: [],
        fylke_navn: '',
        fylke_text: '',
        fylke_chosen: false,

        new_veg_input: '',

        vegobjekttyper_input: [],
        vegobjekttyper_navn: '',
        vegobjekttyper_text: '',
        vegobjekttyper_chosen: false,

        url: '',

        //VEGSHIT, DEPRECATED?
        veg_enabled: false,
        veg_input: [],
        veg_navn: '',
        veg_text: '',
        veg_chosen: false,

        combinedSearchParameters: [],
      }
    }

    case "INPUT_VEG_MULTIPLE": {
      return{
        ...state,
        veg_input: action.payload.result,
        veg_chosen: false,
        veg_text: action.payload.veg_text,
      }
    }
    case "INPUT_VEG_SINGLE": {
      return{
        ...state,
        veg_input: action.payload.result,
        veg_navn: action.payload.result[0].navn,
        veg_chosen: false,
        veg_text: action.payload.veg_text,
      }
    }
    case "VEG_INPUT_NOT_VALID": {
      return{
        ...state,
        veg_input: [],
        veg_navn: '',
        veg_text: action.payload,
        veg_chosen: false,
      }
    }
    case "CHOOSE_VEG": {
      return {
        ...state,
        veg_input: action.payload,
        veg_navn: action.payload[0].navn,
        veg_text: action.payload[0].navn,
        veg_chosen: true,
      }
    }
    case "FETCHING_VEGER": {
      return {
        ...state,
        fetching_veger: action.payload,
      }
    }

    case "INPUT_VEGKATEGORI_MULTIPLE": {
      return{
        ...state,
        vegkategori_input: action.payload.result,
        vegkategori_chosen: false,
        vegkategori_text: action.payload.vegkategori_text,

        veg_enabled: false,
      }
    }
    case "INPUT_VEGKATEGORI_SINGLE": {
      return{
        ...state,
        vegkategori_input: action.payload.result,
        vegkategori_navn: action.payload.result[0].navn,
        vegkategori_chosen: false,
        vegkategori_text: action.payload.vegkategori_text,

        veg_enabled: true,
      }
    }
    case "VEGKATEGORI_INPUT_NOT_VALID": {
      return{
        ...state,
        vegkategori_input: [],
        vegkategori_navn: '',
        vegkategori_text: action.payload,
        vegkategori_chosen: false,

        veg_enabled: false,

      }
    }
    case "CHOOSE_VEGKATEGORI": {
      return {
        ...state,
        vegkategori_input: action.payload,
        vegkategori_navn: action.payload[0].navn,
        vegkategori_text: action.payload[0].navn,
        vegkategori_chosen: true,

        veg_enabled: true,
      }
    }
    case "SELECT_SEARCH_COORDINATE": {
      return {...state, searchCoordinate: action.payload}
    }
  }
  return state
}
