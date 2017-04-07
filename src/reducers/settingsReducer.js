/*
Reducer for different app settings
*/

export default function reducer(state={
  clusteringOn: false,
  darkModeOn: false,
  
}, action) {
  switch (action.type) {
    case "SET_CLUSTERING": {
      return {...state, clusteringOn: action.payload}
    }
    case "SET_DARK_MODE": {
      return {...state, darkModeOn: action.payload}
    }
  }
  return state
}
