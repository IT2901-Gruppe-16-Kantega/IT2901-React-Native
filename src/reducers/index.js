/*
  COMBINES REDUCERS INTO ONE AND EXPORTS,
  IMPORTED BY STORE.js
*/

import {combineReducers} from 'redux'

import dataReducer from './dataReducer'
import fileReducer from './fileReducer'
import searchReducer from './searchReducer'



export default combineReducers({
  dataReducer,
  fileReducer,
  searchReducer,
})
