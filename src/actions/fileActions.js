//

//Called unity app is closed
export function storeRoadSearch(roadSearch) {
  return {
    type: "STORE_ROAD_SEARCH",
    payload: roadSearch
  }
}
