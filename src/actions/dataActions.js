// will contain actions that depend on NVDB
import wrapper from '../utilities/wrapper'
import {createBST, searchForKommune} from '../utilities/utils';
createBST();

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

export function setKommuneInput(input) {
  return {
    type: "SET_KOMMUNE_INPUT",
    payload: input
  }
}

export function setKommune(kommune_input){
  var kommune = searchForKommune(kommune_input)
  if(kommune.length>0){
    return {
      type: "SET_KOMMUNE",
      payload: kommune,
    }
  }
  else {
    return {
      type: "ERROR",
      payload: "unkown kommune"
    }
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
export function clearData(){
  return{
    type: "CLEAR_DATA",
  }
}

//function that fetches based on props
