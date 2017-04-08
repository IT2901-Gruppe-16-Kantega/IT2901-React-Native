export function setKeyboardPadding(padding) {
  return {
    type: "SET_KEYBOARD_PADDING",
    payload: padding,
  }
}

export function setChosenSearchTab(input) {
  return {
    type: "SET_CHOSEN_SEARCH_TAB",
    payload: input,
  }
}
