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
