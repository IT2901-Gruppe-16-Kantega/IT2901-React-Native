export function setSidebarFrame(frame) {
  return {
    type: "SET_SIDEBAR_FRAME",
    payload: frame,
  }
}

export function toggleSecondSidebar(open) {
  return {
    type: "TOGGLE_SECOND_SIDEBAR",
    payload: open,
  }
}

export function selectMarker(marker) {
  return {
    type: "SELECT_MARKER",
    payload: marker,
  }
}

export function setRegion(region) {
  return {
    type: "SET_REGION",
    payload: region,
  }
}

export function setMarkers(markers) {
  return {
    type: "SET_MARKERS",
    payload: markers,
  }
}

export function setCluster(cluster) {
  return {
    type: "SET_CLUSTER",
    payload: cluster,
  }
}

export function toggleFollowUser() {
  return { type: "TOGGLE_FOLLOW_USER" }
}


export function setCurrentUserPosition(position) {
  return {
    type: "SET_CURRENT_USER_POSITION",
    payload: position,
  }
}
