export default function reducer(state={
  keyboardPadding: 0,

}, action) {
  //simple switch statement based on type of action
  switch (action.type) {
    case "SET_KEYBOARD_PADDING": {
      return{...state, keyboardPadding: action.payload}
    }
  }
  return state
}
