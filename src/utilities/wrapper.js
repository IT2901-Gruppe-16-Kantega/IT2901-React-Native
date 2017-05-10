import {fylker} from '../data/fylker';
import {kommuner} from '../data/kommuner';
import storageEngine from './storageEngine';

/*
  wrapper.js: file wich contains methods used in fetching data from server
*/
var fetchFinished = false; //bool used to keep information about fetching state
const urlKommuner =  'https://www.vegvesen.no/nvdb/api/v2/omrader/kommuner';
const objekttypeURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekttyper/';
const baseURL = "https://www.vegvesen.no/nvdb/api/v2/";
//fetches from api given url. When result is availiable-> calls callback function given as param
//kan hende denne kan gjøres helt generell, altså at den henter kommuner osv også
//MEN antagelig vil firstobjet.metadata.returnert feile og denne må håndteres

function startSearch(params, url, statsURL, call) {
  const id = params.vegobjekttype.id;
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

  if(id !== 532 && params.kommune) {
    const {nummer} = params.kommune;
    const storage = storageEngine('NVDB-storage');
    storage.loadRoadsFile(nummer, callback => {
      if(callback.success) {
        values.roads = callback.value;
        call(values);
      } else {
        const roadBaseURL = baseURL + 'vegobjekter/532?kommune=' + nummer;
        const roadURL = roadBaseURL + '&inkluder=geometri&srid=4326&antall=8000';
        fetchFromAPI(roads => {
          console.log(roads);
          storage.saveRoads(nummer, roads);
          values.roads = roads;
          call(values);
        }, roadURL);

        const roadStatsURL = roadBaseURL.replace('532', '532/statistikk');
        getNumberOfObjects(roadStatsURL, callback => {
          values.roadNumber = callback;
          call(values);
        }, roadStatsURL);
      }
    })
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
      //console.log('--> flere objekter finnes');
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

// the function wich handles all communication with NVDB
// path is url of data to be fetched
async function fetchData(path) {
  //console.log('#wrapper.fetchdata');
  try {
    const response = await fetch(path);
    const data = await response.json();
    return data;
  } catch(error) {
    console.log('ERROR: wrapper.fetchData');
    return null;
  }
}

/*
  The following methods fetches data from NVDB to be used in specifying offline data
  Kan hende generell fetchFromAPI burde håndtere alt, gjøres etterhver
*/
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
