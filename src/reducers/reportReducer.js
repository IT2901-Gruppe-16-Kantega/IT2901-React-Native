export default function reducer(state={
  changeCount: 0,

  isEditingRoadObject: false,
  propertyCurrentlyEditing: null,
  newPropertyValue: null,
  newProperty: null,

  showReport: true,

  /*chosenErrorType: "Ikke definert",
  reportViewType: "NEW",
  roadObject: null,
  reportObject: null,*/
}, action) {
  switch (action.type) {
    /*case "SET_REPORT_OBJECT": {
      return {...state, reportObject: action.payload}
    }
    case "SET_ROAD_OBJECT": {
      return {...state, roadObject: action.payload}
    }
    case "SET_ERROR_TYPE": {
      return {...state, chosenErrorType: action.payload}
    }
    case "SET_REPORTVIEW_TYPE": {
      return {...state, reportViewType: action.payload}
    }*/
    case "INCREMENT_CHANGE_COUNT": {
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
