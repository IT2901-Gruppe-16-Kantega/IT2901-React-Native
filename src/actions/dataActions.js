// will contain actions that depend on NVDB
import wrapper from '../utilities/wrapper'

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

export function setKommune(input) {
  return {
    type: "SET_KOMMUNE",
    payload: input
  }
}

export function fetchData(input){
  return{
    type: "FETCH_DATA",
    payload: null,
  }
}
//function that fetches based on props
