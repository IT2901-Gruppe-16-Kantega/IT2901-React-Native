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

import {kommuner_allinfo} from '../app/data/kommuner';

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
  var id = parseInt(kommuneID);
  return bst.search(id);
  //if bst does not find something it returns empty arry, this should be handeled in route-chooser
}


/*
function searchForKommune(kommuneID) {
  console.log('#createBST');
  var id = parseInt(kommuneID);
  console.log('--> id: '+id);
  var bst = new BinarySearchTree({unique:true});
  for(index in alle_kommuner){
    //console.log('index is now: '+ index);
    //console.log('kommune is: ');
    //console.log(alle_kommuner[index]);
    var nummer  = alle_kommuner[index].nummer;
    var data = alle_kommuner[index];
    bst.insert(nummer, data);
  }
  return bst.search(id);

  //if bst does not find something it returns empty arry, this should be handeled in route-chooser
}

*/

export {createBST, searchForKommune};
