export function selectFunction(selectedFunction) {
  return {
    type: "SELECT_FUNCTION",
    payload: selectedFunction,
  }
}

export function deselectFunction() {
  return { type: "DESELECT_FUNCTION" }
}

export function selectFilter(filter) {
  return {
    type: "SELECT_FILTER",
    payload: filter,
  }
}

export function deselectFilter() {
  return { type: "DESELECT_FILTER" }
}

export function selectFilterValue(filterValue) {
  return {
    type: "SELECT_FILTER_VALUE",
    payload: filterValue,
  }
}

export function deselectFilterValue() {
  return { type: "DESELECT_FILTER_VALUE" }
}

export function inputFilterValueText(text) {
  return {
    type: "INPUT_FILTER_VALUE_TEXT",
    payload: text,
  }
}

export function clearFilterValueText() {
  return { type: "CLEAR_FILTER_VALUE_TEXT" }
}

export function addFilter(filter) {
  return {
    type: "ADD_FILTER",
    payload: filter,
  }
}

export function removeFilter(filter) {
  console.log(filter);
  return {
    type: "REMOVE_FILTER",
    payload: filter,
  }
}

export function removeAllFilters() {
  return { type: "REMOVE_ALL_FILTERS" }
}
