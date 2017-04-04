 /*
  COMBINES REDUCERS INTO ONE AND EXPORTS,
  IMPORTED BY STORE.js
*/

import {combineReducers} from 'redux'

import dataReducer from './dataReducer'
import fileReducer from './fileReducer'
import filterReducer from './filterReducer'
import mapReducer from './mapReducer'
import reportReducer from './reportReducer'
import searchReducer from './searchReducer'
import settingsReducer from './settingsReducer'
import uiReducer from './uiReducer'

export default combineReducers({
  dataReducer,
  fileReducer,
  filterReducer,
  mapReducer,
  reportReducer,
  searchReducer,
  settingsReducer,
  uiReducer,
})
