export default function reducer(state={
  keyboardPadding: 0,

  chosenSearchTab: "KART",

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
  }
  return state
}
