//SearchReducer holds all informartion typed in by user in searchFormField
//and packages this into url


export default function reducer(state={
  kommune_input: 'ukjent',
  kommune_valid: false,
  //color changes as input is validated
  kommune_input_color: 'white',
  kommune_input_color_border: 'lightgray',

  //rekkefølgen på objektene i denne må bli definert
  combinedSearchParameters: [],


  //only used when debugging
  kommune_navn: 'not defined',
  //
  roadSearch: {
    id: 12123414,
    description: '',
    searchParamters: [],
    roadObjects: [],
    rapport: {
      rapportID: 123,
      description: '',
      rapportObjekter: [
        {
          id: 123,
          description: '',
        }
      ]
    }
  },

}, action) {
  switch (action.type) {
    case "INPUT_KOMMUNE": {
      //this is ugly af, should not have region change every time we
      var geometryString = action.payload.senterpunkt.wkt.split('(')[1].slice(0, -1);
      var geometryParts = geometryString.split(' ');
      var objLat = parseFloat(geometryParts[0]);
      var objLong = parseFloat(geometryParts[1]);
      return{
        ...state,
        kommune_input: action.payload,
        kommune_navn: action.payload.navn,
        kommune_valid: true,
        kommune_input_color: '#00CC00',
        kommune_input_color_border: 'lightgray',
        region: {
          latitude: objLat,
          longitude: objLong,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }
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
  }
  return state
}
