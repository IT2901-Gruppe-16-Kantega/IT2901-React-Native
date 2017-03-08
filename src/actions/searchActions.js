//
export function createURL(input) {
  return {
    type: "CREATE_URL",
    payload: {
      somePayloadVariable: 'fgh',
      inputPayloadVarible: input,
    }
  }
}
