import { Dimensions } from 'react-native';

let ScreenWidth = Dimensions.get("window").width;

var width = ScreenWidth / 1.5;

export default function reducer(state={
  sidebarFrame: {width: ScreenWidth / 1.5, left: ScreenWidth},

  filteredObjects: [],
  markers: [],

  showSecondSidebar: false,

  selectedFilter: {},
  selectedFilterValue: {},

  filterValueSearch: '',
  selectedObject: null,

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
    case "SELECT_FILTER": {
      console.log(action.payload);
      return {...state, selectedFilter: action.payload, showSecondSidebar: true}
    }
    case "SELECT_FILTER_VALUE": {
      return {...state, selectedFilterValue: action.payload}
    }
    case "INPUT_FILTER_VALUE_TEXT": {
      return {...state, filterValueSearch: action.payload}
    }
    case "SET_FILTERED_OBJECTS": {
      return {...state, filteredObjects: action.payload}
    }
    case "SELECT_OBJECT": {
      return {...state, selectedObject: action.payload}
    }
  }
  return state
}
