/*
  wrapper.js: file wich contains methods used in fetching data from server
*/
var fetch_finished = false; //bool used to keep information about fetching state
var url_kommuner =  'https://www.vegvesen.no/nvdb/api/v2/omrader/kommuner';
//fetches from api given url. When result is availiable-> calls callback function given as param
//kan hende denne kan gjøres helt generell, altså at den henter kommuner osv også
//MEN antageli vil firstobjet.metadata.returnert feile og denne må håndteres
function fetchFromAPI_all(callback, url){
  //console.log('#wrapper.fetchFromAPI');
  var objects = [];
  fetchData(url).then(function(firstObject){
    var flere = firstObject.metadata.returnert;
    if(flere > 0){
      //console.log('--> flere objekter finnes');
      recursiveFetch(firstObject, objects, callback);
    }
    else{
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

async function fetchTotalNumberOfObjects(url){
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch(error) {
    console.log('ERROR: wrapper.fetchTotalNumberOfObjects');
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

//TODO!
// create that actually fetches what we need!

async function fetchVeier(fylke, vegkategori){
  var url = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/532?fylke='+fylke.nummer+'&inkluder=egenskaper';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch(error) {
    console.log('ERROR: wrapper.fetchVeier');
  }
}

export {fetchFromAPI_all, fetch_Kommuner,fetchTotalNumberOfObjects, fetchVeier};
