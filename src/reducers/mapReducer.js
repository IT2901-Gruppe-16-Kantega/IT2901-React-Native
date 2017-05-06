import { Dimensions } from 'react-native';

let ScreenWidth = Dimensions.get("window").width;

var width = ScreenWidth / 1.5;

export default function reducer(state={
  sidebarFrame: {width: ScreenWidth / 1.5, left: ScreenWidth},


  showSecondSidebar: false,

  selectedMarker: null,

  region: null,
  markers: null,
  cluster: null,
  followsUser: false,
  currentUserPosition: null,

}, action) {
  //simple switch statement based on type of action
  switch (action.type) {
    case "SET_SIDEBAR_FRAME": {
      return {...state, sidebarFrame: action.payload}
    }
    case "TOGGLE_SECOND_SIDEBAR": {
      return {...state, showSecondSidebar: action.payload}
    }
    case "SELECT_MARKER": {
      return {...state, selectedMarker: action.payload}
    }
    case "SET_REGION": {
      return {...state, region: action.payload}
    }
    case "SET_MARKERS": {
      return {...state, markers: action.payload}
    }
    case "SET_CLUSTER": {
      return {...state, cluster: action.payload}
    }
    case "TOGGLE_FOLLOW_USER": {
      return {...state, followsUser: !state.followsUser}
    }
    case "SET_CURRENT_USER_POSITION": {
      return {...state, currentUserPosition: action.payload}
    }
  }
  return state
}
