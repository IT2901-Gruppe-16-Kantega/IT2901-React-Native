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

export function fetchDataStart(){
  return{
    type: "FETCH_DATA_START",
    payload: null,
  }
}

export function fetchDataReturned(data, fetched) {
  var fetching = true;
  if(fetched==true){
    fetching = false;
  }
  return{
    type: "FETCH_DATA_RETURNED",
    payload: {
      data: data,
      fetched: fetched,
      fetching: fetching,
    }
  }
}

//function that fetches based on props
