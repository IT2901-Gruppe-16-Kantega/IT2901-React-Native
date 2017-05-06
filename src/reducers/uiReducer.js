export default function reducer(state={
  keyboardPadding: 0,

  chosenSearchTab: "Søk",
  navbarHeight: 0,
  deeplink: "",

}, action) {
  //simple switch statement based on type of action
  switch (action.type) {
    case "SET_KEYBOARD_PADDING": {
      return{...state, keyboardPadding: action.payload}
    }
    case "SET_CHOSEN_SEARCH_TAB": {
      return {
        ...state,
        chosenSearchTab: action.payload
      }
    }
    case "SET_NAVBAR_HEIGHT": {
      return {...state, navbarHeight: action.payload}
    }
    case "SET_DEEPLINK": {
      return {...state, deeplink: action.payload}
    }
  }
  return state
}
