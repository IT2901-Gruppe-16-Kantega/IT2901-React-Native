/**
* Utility file containing all functions handling the actual communication with NVDB.
* Makes it easier to fetch data from several locations in the application.
* Handles the cases where NVDB contains several pages of data
* and thus must be called several times in order to fetch all objects.
*/

import {fylker} from '../data/fylker';
import {kommuner} from '../data/kommuner';

var fetchFinished = false;
const urlKommuner =  'https://www.vegvesen.no/nvdb/api/v2/omrader/kommuner';
const objekttypeURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekttyper/';
const baseURL = "https://www.vegvesen.no/nvdb/api/v2/";

function startSearch(id, url, statsURL, call) {
  var values = {number: 1, objects: null, roads: null, info: null, roadNumber: 1}
  call(values);
  fetchFromAPI(callback => {
    values.objects = callback;
    call(values);
  }, url);
  fetchObjekttypeInfo(id, callback => {
    values.info = callback;
    call(values);
  })
  getNumberOfObjects(statsURL, callback => {
    values.number = callback;
    call(values);
  })
  if(id !== 532) {
    const roadURL = url.replace("vegobjekter/" + id, 'vegobjekter/532').replace("inkluder=alle", "inkluder=geometri");
    fetchFromAPI(callback => {
      values.roads = callback;
      call(values);
    }, roadURL);
    const roadStatsURL = statsURL.replace("vegobjekter/" + id, 'vegobjekter/532');
    getNumberOfObjects(roadStatsURL, callback => {
      values.roadNumber = callback;
      call(values);
    }, roadStatsURL);
  } else {
    values.roadNumber = 0;
    values.roads = [];
    call(values);
  }
}

function getNumberOfObjects(url, callback) {
  console.log(url)
  fetchData(url).then(response => {
    console.log(response)
    if(!response.antall && response.length > 0 && response[0].code === 4005) {
      callback(0);
    } else {
      callback(response.antall);
    }
  });
}

function fetchFromAPI(callback, url) {
  console.log('#wrapper.fetchFromAPI:');
  var objects = [];
  fetchData(url).then(function(firstObject) {
    var flere = firstObject.metadata.returnert;
    if(flere > 0) {
      recursiveFetch(firstObject, objects, callback);
    }
  })
}

//recursively fetches if result from api contains many object, data "paginert" by NVDB
function recursiveFetch(object, objects, callback) {
  //console.log('#wrapper.recursiveFetch: ');
  var currentObject = object;
  //finds adresse of next object in array
  var nextObjectRef = object.metadata.neste.href;
  //calls fetch on next object in array
  fetchData(nextObjectRef).then(function(nextObject){
    var flere = nextObject.metadata.returnert;
    if(flere > 0){
      this.fetchFinished = false;
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

// the function which handles all communication with NVDB
// path is url of data to be fetched
async function fetchData(path) {
  try {
    const response = await fetch(path);
    const data = await response.json();
    return data;
  } catch(error) {
    console.log('ERROR: wrapper.fetchData');
    return null;
  }
}

//Not currently used, should be used if functionallity for refreshing static data is implemented
function fetchKommuner(callback){
  fetchData(urlKommuner).then(function(data){
    callback(data, true);
  })
}

function fetchCloseby(count, coordinate, callback) {
  const url = baseURL + "posisjon?lat=" + coordinate.latitude + "&lon=" + coordinate.longitude + "&srid=4326&maks_avstand=100&maks_antall=" + count;
  fetchData(url).then(function(data) {
    if(count === 1) {
      var firstObject = data[0];
      if(firstObject.code) {
        callback(firstObject, true);
        return;
      }
      firstObject.fylke = fylker.find(f => {
        return f.nummer === firstObject.vegreferanse.fylke;
      })
      firstObject.kommune = kommuner.find(k => {
        return k.nummer === firstObject.vegreferanse.kommune;
      })
      callback(firstObject, true);
    } else {
      callback(data, true);
    }
  });
}

function fetchObjekttypeInfo(objekttypeID, callback) {
  fetchData(objekttypeURL + objekttypeID).then(function(data) {
    callback(data, true);
  })
}

export {fetchFromAPI, fetchKommuner, fetchObjekttypeInfo, fetchCloseby, fetchData, startSearch, getNumberOfObjects};
