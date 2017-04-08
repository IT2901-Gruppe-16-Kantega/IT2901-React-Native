
//some actions for changing settings
export function setClustering(on) {
  return {
    type: "SET_CLUSTERING",
    payload: on,
  }
}

export function setDarkMode(on) {
  return {
    type: "SET_DARK_MODE",
    payload: on,
  }
}
