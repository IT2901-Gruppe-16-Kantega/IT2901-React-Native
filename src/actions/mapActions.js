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

export function selectObject(roadObject) {
  return {
    type: "SELECT_OBJECT",
    payload: roadObject,
  }
}

export function selectMarker(marker) {
  console.log(marker)
  return {
    type: "SELECT_MARKER",
    payload: marker,
  }
}
