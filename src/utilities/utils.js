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

import {kommuner_allinfo} from '../data/kommuner';

var BinarySearchTree = require('binary-search-tree').BinarySearchTree;
var bst = new BinarySearchTree({unique: true});

function createBST(){
  for(index in kommuner_allinfo){
    var nummer  = kommuner_allinfo[index].nummer;
    var data = kommuner_allinfo[index];
    bst.insert(nummer, data);
  }
}
function searchForKommune(kommuneID) {
  return new Promise(function(resolve, reject){
    var id = parseInt(kommuneID);
    var kommune = bst.search(id);
    if(kommune.length>0){
      resolve(kommune[0]);
    }
    else {
      reject(Error("Not av valid kommuneID"));
    }
  })}





export {createBST, searchForKommune};
