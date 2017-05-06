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

export function setNavbarHeight(height) {
  return {
    type: "SET_NAVBAR_HEIGHT",
    payload: height,
  }
}

export function setDeeplink(value) {
  return {
    type: "SET_DEEPLINK",
    payload: value,
  }
}
