
import {fylker} from '../data/fylker';
import {kommuner} from '../data/kommuner';
import {vegobjekttyper} from '../data/vegobjekttyper';
//Not used:
import {fetchVeger} from './wrapper';


//NOT used??
function filterFylke(f) {
    return f.fylke === parseInt(this);
  }


function searchForFylke(fylke_navn) {
    return new Promise(function(resolve, reject){
      var fylkerArray = fylker.filter(compareInput, fylke_navn);
      if(fylkerArray.length > 0 && fylkerArray.length != 19) {
        resolve(fylkerArray);
      }
      else {
        reject(Error("Not a valid fylke"));
      }
    })
  }

function searchForVegobjekttyper(input){
  return new Promise(function(resolve, reject){
    var vegobjekttyperArray = vegobjekttyper.filter(compareInput, input);
    if(vegobjekttyperArray.length > 0 && vegobjekttyperArray.length != 391) {
      resolve(vegobjekttyperArray);
    }
    else {
      reject(Error("Not a valid vegobjekttype"));
    }
  })
}

//handle chosen fylke
function searchForKommune(input, fylke) {
  if(fylke.length == 0) {
    var filteredKommuneList = kommuner;
  }
  else {
    var filteredKommuneList = kommuner.filter(filterKommuneList, fylke[0].nummer);
  }
  return new Promise(function(resolve, reject){
    var kommunerArray = filteredKommuneList.filter(compareInput, input);
    if(kommunerArray.length > 0 && kommunerArray.length != filteredKommuneList.length) {
      resolve(kommunerArray);
    }
    else {
      reject(Error("Not a valid kommune"));
    }
  })
}

//Comparator used by all search functions
function compareInput(input){
    let stringInput = this.toString().toLowerCase();
    return input.navn.toLowerCase().substring(0, stringInput.length) === stringInput;
  }

function filterKommuneList(input){
  return input.fylke == this;
}

//Not used now, but kept in case we need them
var veger = [];
function fetchVegerFromAPI(fylke, vegtype){
  fetchVeger(fylke, vegtype).then((result) => {
    for(i=0; i<result.objekter.length; i++){
      for(z=0; z<result.objekter[i].egenskaper.length; z++){
        if(result.objekter[i].egenskaper[z].id==4568){
          if(veger.some(vegerContains, result.objekter[i].egenskaper[z].verdi)){
          }
          else{
            veger.push(result.objekter[i].egenskaper[z].verdi)
          }
        }
      }
    }
  });
}

function vegerContains(value) {
  if(value == this){
    return true;
  }
}

function parseGeometry(string) {
  const wkt = string.slice(string.lastIndexOf("(") + 1, -1);
  const wktArray = wkt.split(",")

  objectCoords = [];
  for(var i = 0; i < wktArray.length; i++) {
    const parts = wktArray[i].trim().split(' ');
    const latitude = parseFloat(parts[0]);
    const longitude = parseFloat(parts[1]);

    objectCoords.push({latitude: latitude, longitude: longitude});
  }
  return objectCoords;
}

function randomColor(alpha) {
  var color = 'rgba(';
  for (var i = 0; i < 3; i++) {
    color += Math.random() * 255 + ', ';
  }
  if(alpha) { color += alpha }
  else { color += 1 }
  color += ')'

  return color;
}

export {searchForKommune, searchForFylke, searchForVegobjekttyper, parseGeometry, randomColor};
