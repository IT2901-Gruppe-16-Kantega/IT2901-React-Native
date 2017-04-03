//some actions for changing settings
export function setClustering(on) {
  return{
    type: "SET_CLUSTERING",
    payload: on,
  }
}
