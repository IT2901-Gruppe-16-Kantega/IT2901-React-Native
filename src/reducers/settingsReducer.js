/*
Reducer for different app settings
*/

export default function reducer(state={
  clusteringOn: false,

}, action) {
  switch (action.type) {
    case "SET_CLUSTERING": {
      return {...state, clusteringOn: action.payload}
    }
  }
  return state
}
