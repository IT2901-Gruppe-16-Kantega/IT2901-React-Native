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
  fylke_color: templates.colors.orange,

  //Vegshit
  veg_input: '',

  //kommune fields
  kommune_input: [],
  kommune_navn: '',
  kommune_text: '',
  kommune_chosen: false,
  kommune_color: templates.colors.lightGray,

  kommune_enabled: false,

  //vegobjekttyper fields
  vegobjekttyper_input: [],
  vegobjekttyper_navn: '',
  vegobjekttyper_text: '',
  vegobjekttyper_chosen: false,
  vegobjekttyper_color: templates.colors.orange,

  //
  url: '',


  //rekkefølgen på objektene i denne må bli definert
  combinedSearchParameters: {},

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
        fylke_color: templates.colors.orange,

        kommune_enabled: false,
        kommune_color: templates.colors.lightGray,
        kommune_input: [],

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
        kommune_enabled: false,
        kommune_color: templates.colors.lightGray,
        kommune_input: [],

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

        kommune_enabled: false,
        kommune_color: templates.colors.lightGray,
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

        kommune_enabled: true,
        kommune_color: templates.colors.orange,
      }
    }

    case 'INPUT_VEG': {
      return{
        ...state,
        veg_input: action.payload,
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
      return{
        ...state,
        fylke_input: [],
        fylke_navn: '',
        fylke_text: '',
        fylke_chosen: false,

        veg_input: '',

        kommune_input: [],
        kommune_navn: '',
        kommune_text: '',
        kommune_chosen: false,
        kommune_enabled: false,

        vegobjekttyper_input: [],
        vegobjekttyper_navn: '',
        vegobjekttyper_text: '',
        vegobjekttyper_chosen: false,

        url: '',

        combinedSearchParameters: [],
      }
    }


  }
  return state
}
