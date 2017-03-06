export function templateAction(input) {
  console.log('templateAction');
  return {
    type: "templateAction",
    payload: {
      variable: "some data",
      inputVariable: input,
    }
  }
}

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

//some actions containg fetch

//using thunk,
export function fetchSomething() {
  return function(dispatch) {
    axios.get()
    .then((response) => {
      dispatch({type: "FETCH_SOMETHING_FULFILLED", payload.response.data})
    })
    .catch((err) => {
      dispatch({type: "FETCH_SOMETHING_REJECTED", payload: err})
    })
  }
}

//create action using promsie aswell
