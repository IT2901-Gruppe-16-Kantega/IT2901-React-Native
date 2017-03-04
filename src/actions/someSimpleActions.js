//file containing some actions


//can do action in any way we want, only mandatory var is type
export function doSomething() {
  return {
    type: "DO_SOMETHING",
    payload: {
      somePayloadVariable: 'asd',
      anotherPayloadVarible: 123,
    }
  }
}

export function doSomethingWithInput(input) {
  return {
    type: "DO_SOMETHING_WITH_PAYLOAD",
    payload: {
      somePayloadVariable: 'fgh',
      inputPayloadVarible: input,
    }
  }
}
