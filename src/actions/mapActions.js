export function setSidebarFrame(frame) {
  return {
    type: "SET_SIDEBAR_FRAME",
    payload: frame,
  }
}

export function updateMapMarkers(markers) {
  return {
    type: "UPDATE_MAP_MARKERS",
    payload: markers,
  }
}

export function toggleSecondSidebar(open) {
  return {
    type: "TOGGLE_SECOND_SIDEBAR",
    payload: open,
  }
}

export function selectFilter(filter) {
  return {
    type: "SELECT_FILTER",
    payload: filter,
  }
}

export function selectFilterValue(filterValue) {
  return {
    type: "SELECT_FILTER_VALUE",
    payload: filterValue,
  }
}

export function inputFilterValueText(text) {
  return {
    type: "INPUT_FILTER_VALUE_TEXT",
    payload: text,
  }
}

export function setFilteredObjects(objects) {
  return {
    type: "SET_FILTERED_OBJECTS",
    payload: objects,
  }
}

export function selectObject(roadObject) {
  return {
    type: "SELECT_OBJECT",
    payload: roadObject,
  }
}
