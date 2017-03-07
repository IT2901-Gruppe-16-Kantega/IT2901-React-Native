/*
PUT SOME INFORMATION ABOUT REDUCER HERE
*/

export default function reducer(state={
  //initialState
  kommune_input: 'ukjent',
  kommune: 'not input',
  valid_kommune: false,
  fetching: false,
  fetched: false,
  error: null,
  objects: [],
  region: {
    latitude: 63.43,
    longitude: 10.40,
    latitudeDelta: 1,
    longitudeDelta: 1,
  },
  andel_egengeometri: null,
  dataSaved: false,
}, action) {
  //simple switch statement based on type of action
  switch (action.type) {
    case "templateAction": {
      return{...state,fetching: true}
    }
    case "SET_KOMMUNE_INPUT": {
      return{
        ...state,
        kommune_input: action.payload.text
      }
    }
    case "SET_KOMMUNE": {
      var geometryString = action.payload[0].senterpunkt.wkt.split('(')[1].slice(0, -1);
      var geometryParts = geometryString.split(' ');
      var objLat = parseFloat(geometryParts[0]);
      var objLong = parseFloat(geometryParts[1]);
      return{
        ...state,
        valid_kommune: true,
        kommune: action.payload,
        region: {
          latitude: objLat,
          longitude: objLong,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }
      }
    }
    case "FETCH_DATA_START": {
      return{
        ...state,
        fetching: true,
      }
    }
    case "FETCH_DATA_RETURNED":{
      return {
        ...state,
        fetching: action.payload.fetching,
        fetched: action.payload.fetched,
        objects: action.payload.data,
      }
    }
    case "CLEAR_DATA": {
      return {
        ...state,
        kommune_input: 'ukjent',
        kommune: 'not input',
        valid_kommune: false,
        fetching: false,
        fetched: false,
        error: null,
        objects: [],
        region: {
          latitude: 63.43,
          longitude: 10.40,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }
      }
    }
    // Changes Vegard
    // TODO changes here for if data was written
    case "SAVE_DATA": {
      return {
        ...state,
        dataSaved: true,
      }
    }
  }
  return state
}
