import {fylker} from '../data/fylker';
import {kommuner} from '../data/kommuner';

/*
  wrapper.js: file wich contains methods used in fetching data from server
*/
var fetch_finished = false; //bool used to keep information about fetching state
const url_kommuner =  'https://www.vegvesen.no/nvdb/api/v2/omrader/kommuner';
const objekttypeURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekttyper/';
const baseURL = "https://www.vegvesen.no/nvdb/api/v2/";
//fetches from api given url. When result is availiable-> calls callback function given as param
//kan hende denne kan gjøres helt generell, altså at den henter kommuner osv også
//MEN antageli vil firstobjet.metadata.returnert feile og denne må håndteres

function fetchFromAPI_all(callback, url) {
  //console.log('#wrapper.fetchFromAPI');
  var objects = [];
  fetchData(url).then(function(firstObject){
    var flere = firstObject.metadata.returnert;
    if(flere > 0) {
      //console.log('--> flere objekter finnes');
      recursiveFetch(firstObject, objects, callback);
    }
    else {
      //console.log('--> ingen flere objekter');
    }
  })
}


//recursively fetches if result from api contains many object, data "paginert" by NVDB
function recursiveFetch(object, objects, callback){
  //console.log('#wrapper.recursiveFetch: ');
  var currentObject = object;
  //finds adresse of next object in array
  var nextObjectRef = object.metadata.neste.href;
  //calls fetch on next object in array
  fetchData(nextObjectRef).then(function(nextObject){
    var flere = nextObject.metadata.returnert;
    if(flere > 0){
      this.fetch_finished = false;
      //console.log('--> flere objekter finnes');
      callback(objects, false);
      recursiveFetch(nextObject, objects, callback);
    }
    else{
      //console.log('--> ingen flere objekter');
      callback(objects, true);
    }
  })
  for(var i = 0; i < currentObject.objekter.length; i++){
    objects.push(currentObject.objekter[i]);
  }
  return objects;
}

// the function wich handels all communication with NVDB
// _path is url of data to be fetched
async function fetchData(_path) {
  //console.log('#wrapper.fetchdata');
  try {
    const response = await fetch(_path);
    const data = await response.json();
    return data;
  } catch(error) {
    console.log('ERROR: wrapper.fetchData');
  }
}

async function fetchTotalNumberOfObjects(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch(error) {
    console.log('ERROR: wrapper.fetchTotalNumberOfObjects');
  }
}

async function fetchVeg(url){
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch(error) {
    return error;
  }
}

/*
  The following methods fetches data from NVDB to be used in specifying offline data
  Kan hende generell fetchFromAPI burde håndtere alt, gjøres etterhver
*/
function fetch_Kommuner(callback){
  fetchData(url_kommuner).then(function(data){
    callback(data, true);
  })
}

function fetchCloseby(coordinate, callback) {
  const url = baseURL + "posisjon?lat=" + coordinate.latitude + "&lon=" + coordinate.longitude + "&maks_avstand=200&maks_antall=10";
  fetchData(url).then(function(data) {
    const firstElement = data[0];
    if(firstElement.code) {
      callback(firstElement, true);
    }
    else {
      firstElement.fylke = fylker.find(f => {
        return f.nummer === firstElement.vegreferanse.fylke;
      })
      firstElement.kommune = kommuner.find(k => {
        return k.nummer === firstElement.vegreferanse.kommune;
      })
      callback(firstElement, true);
    }
  })
}

function fetchObjekttypeInfo(objekttypeID, callback) {
  fetchData(objekttypeURL + objekttypeID).then(function(data) {
    callback(data, true);
  })
}

async function fetchVeger(fylke, vegkategori){
  //egenskap="4591=8AND4566=5492"
  var url = baseURL + "vegobjekter/532?egenskap=4591=" + fylke[0].nummer + "AND4566=" + vegkategori[0].id + "&inkluder=egenskaper&antall=8000";
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch(error) {
    console.log('ERROR: wrapper.fetchVeger');
  }
}

export {fetchFromAPI_all, fetch_Kommuner,fetchTotalNumberOfObjects, fetchVeger, fetchObjekttypeInfo, fetchVeg, fetchCloseby, fetchData};
