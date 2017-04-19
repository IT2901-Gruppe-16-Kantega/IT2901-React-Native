export function incrementChangeCount() {
  return {
    type: "INCREMENT_CHANGE_COUNT",
  }
}
export function setReportViewType(input) {
  return {
    type: "SET_REPORTVIEW_TYPE",
    payload: input,
  }
}
export function setRoadObject(input) {
  return {
    type: "SET_ROAD_OBJECT",
    payload: input,
  }
}
export function setReportObject(input) {
  return {
    type: "SET_REPORT_OBJECT",
    payload: input,
  }
}

export function setErrorType(input) {
  return  {
    type: "SET_ERROR_TYPE",
    payload: input,
  }
}
