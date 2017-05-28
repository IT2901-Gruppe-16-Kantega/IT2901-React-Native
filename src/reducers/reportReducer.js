/**
* Redux reducer, handles all state values associated with creating a report.
*/

export default function reducer(state={
  changeCount: 0,

  isEditingRoadObject: false,
  propertyCurrentlyEditing: null,
  newPropertyValue: null,
  newProperty: null,
  showReport: true,
}, action) {
  switch (action.type) {
    case "REPORT_CHANGE": {
      const newChangeCount = state.changeCount + 1;
      return {...state, changeCount: newChangeCount}
    }
    case "ADD_ROAD_OBJECT": {
      return {...state}
    }
    case "SET_NEW_PROPERTY": {
      return {...state, newProperty: action.payload}
    }
    case "SET_IS_EDITING_ROAD_OBJECT": {
      return {...state, isEditingRoadObject: action.payload}
    }
    case "SELECT_PROPERTY_CURRENTLY_EDITING": {
      return {...state, propertyCurrentlyEditing: action.payload}
    }
    case "INPUT_NEW_PROPERTY_VALUE": {
      return {...state, newPropertyValue: action.payload}
    }
    case "SET_SHOW_REPORT": {
      return {...state, showReport: action.payload}
    }
  }
  return state
}
