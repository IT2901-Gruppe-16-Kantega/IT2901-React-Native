/*
  COMBINES REDUCERS INTO ONE AND EXPORTS,
  IMPORTED BY STORE.js
*/

import {combineReducers} from 'redux'

import dataReducer from './dataReducer'
import fileReducer from './fileReducer'
import searchesReducer from './searchesReducer'


export default combineReducers({
  dataReducer,
  fileReducer,
  searchesReducer
})
