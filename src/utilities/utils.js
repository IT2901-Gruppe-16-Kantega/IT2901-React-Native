/*
Given an array A of n elements with values or records A0 ... An−1, sorted such that A0 ≤ ... ≤ An−1, and target value T, the following subroutine uses binary search to find the index of T in A.[6]

Set L to 0 and R to n − 1.
If L > R, the search terminates as unsuccessful.
Set m (the position of the middle element) to the floor (the largest previous integer) of (L + R) / 2.
If Am < T, set L to m + 1 and go to step 2.
If Am > T, set R to m – 1 and go to step 2.
Now Am = T, the search is done; return m.
This iterative procedure keeps track of the search boundaries via two variables. Some implementations may place the comparison for equality at the end of the algorithm, resulting in a faster comparison loop but costing one more iteration on average.[7]
*/

import {fylker} from '../data/fylker';
import {kommuner} from '../data/kommuner';
import {vegobjekttyper} from '../data/vegobjekttyper';
import {fetchVeger} from './wrapper';





//NOT used??
function filterFylke(f) {
    return f.fylke === parseInt(this);
  }

/*
    NEW METOHDS CURRENTLY USED

*/

function searchForFylke(fylke_navn){
    return new Promise(function(resolve, reject){
      var fylkerArray = [];
      fylkerArray = fylker.filter(compareInput, fylke_navn);
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
    var vegobjekttyperArray = [];
    vegobjekttyperArray = vegobjekttyper.filter(compareInput, input);
    if(vegobjekttyperArray.length > 0 && vegobjekttyperArray.length != 391) {
      resolve(vegobjekttyperArray);
    }
    else {
      reject(Error("Not a valid vegobjekttype"));
    }
  })
}

function searchForKommune(input){
  return new Promise(function(resolve, reject){
    var kommunerArray = [];
    kommunerArray = kommuner.filter(compareInput, input);
    if(kommunerArray.length > 0 && kommunerArray.length != 391) {
      resolve(kommunerArray);
    }
    else {
      reject(Error("Not a valid kommune"));
    }
  })
}


function compareInput(input){
    let stringInput = this.toString().toLowerCase();
    return input.navn.toLowerCase().substring(0, stringInput.length) === stringInput;
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
  if(value==this){
    return true;
  }
}






export {searchForKommune, searchForFylke, searchForVegobjekttyper};
