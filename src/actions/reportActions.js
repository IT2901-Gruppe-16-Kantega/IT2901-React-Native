/**
* Contains all Redux action functions associated with changing values in report reducer
*/

export function incrementChangeCount() {
  return {
    type: "INCREMENT_CHANGE_COUNT",
  }
}

export function addRoadObject(object) {
  return {
    type: "ADD_ROAD_OBJECT",
    payload: object,
  }
}

export function setIsEditingRoadObject(editing) {
  return {
    type: "SET_IS_EDITING_ROAD_OBJECT",
    payload: editing,
  }
}

export function selectPropertyCurrentlyEditing(property) {
  return {
    type: "SELECT_PROPERTY_CURRENTLY_EDITING",
    payload: property,
  }
}

export function inputNewPropertyValue(value) {
  return {
    type: "INPUT_NEW_PROPERTY_VALUE",
    payload: value,
  }
}

export function setNewProperty(property) {
  return {
    type: "SET_NEW_PROPERTY",
    payload: property,
  }
}

export function setShowReport(show) {
  return {
    type: "SET_SHOW_REPORT",
    payload: show,
  }
}
