import { Dimensions } from 'react-native';

let ScreenWidth = Dimensions.get("window").width;

var width = ScreenWidth / 1.5;

export default function reducer(state={
  sidebarFrame: {width: ScreenWidth / 1.5, left: ScreenWidth},

  markers: [],

  showSecondSidebar: false,

  selectedObject: null,

  selectedMarker: null,

}, action) {
  //simple switch statement based on type of action
  switch (action.type) {
    case "SET_SIDEBAR_FRAME": {
      return {...state, sidebarFrame: action.payload}
    }
    case "TOGGLE_SECOND_SIDEBAR": {
      return {...state, showSecondSidebar: action.payload}
    }
    case "UPDATE_MAP_MARKERS": {
      return {...state, markers: action.payload}
    }
    case "SELECT_OBJECT": {
      return {...state, selectedObject: action.payload}
    }
    case "SELECT_MARKER": {
      return {...state, selectedMarker: action.payload}
    }
  }
  return state
}
