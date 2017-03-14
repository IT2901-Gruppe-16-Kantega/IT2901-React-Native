//SearchReducer holds all informartion typed in by user in searchFormField
//and packages this into url


export default function reducer(state={
  //legg inn react.proptypes

  //inputfelter
  fylke_input: null,
  fylke_valid: false,

  kommune_input: null,
  kommune_valid: false,
  //color changes as input is validated
  kommune_input_color: 'white',
  kommune_input_color_border: 'lightgray',

  //rekkefølgen på objektene i denne må bli definert
  combinedSearchParameters: {},

  //only used when debugging
  kommune_navn: 'not defined',

}, action) {
  switch (action.type) {
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
    case "INPUT_FYLKE": {
      return{
        ...state,
        fylke_input: action.payload,
        //fylke_navn: action.payload.navn,
        fylke_valid: true,
      }
    }
    case "FYLKE_INPUT_NOT_VALID": {
      return{
        ...state,
        fylke_valid: false,
        fylke_navn: 'ukjent kommuneId',
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
