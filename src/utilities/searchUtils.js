
import {fylker} from '../data/fylker';
import {kommuner} from '../data/kommuner';
import {vegobjekttyper} from '../data/vegobjekttyper';
//Not used:
import {fetchVeger} from './wrapper';


function searchForFylke(fylkeNavn) {
    return new Promise(function(resolve, reject){
      var fylkerArray = fylker.filter(compareInput, fylkeNavn);
      if(fylkerArray.length > 0 && fylkerArray.length != 19) {
        resolve(fylkerArray);
      }
      else {
        reject(Error("Not a valid fylke"));
      }
    })
  }

function searchForVegobjekttyper(input) {
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
  var filteredKommuneList;
  if(fylke.length === 0) filteredKommuneList = kommuner
  else filteredKommuneList = kommuner.filter(filterKommuneList, fylke[0].nummer)

  return new Promise(function(resolve, reject) {
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
function compareInput(input) {
  const intInput = parseInt(this);
  if(intInput) {
    if(input.nummer) return input.nummer === intInput;
    else if(input.id) return input.id === intInput;
  }

  const stringInput = this.toString().toLowerCase();
  return input.navn.toLowerCase().substring(0, stringInput.length) === stringInput;
}

function filterKommuneList(input) {
  return input.fylke == this;
}

function vegerContains(value) {
  if(value === this){
    return true;
  }
}

export {searchForKommune, searchForFylke, searchForVegobjekttyper};
