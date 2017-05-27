/**
* Combines all reducers into one and export the combined reducers
*/

import {combineReducers} from 'redux'

import dataReducer from './dataReducer'
import filterReducer from './filterReducer'
import mapReducer from './mapReducer'
import reportReducer from './reportReducer'
import searchReducer from './searchReducer'
import settingsReducer from './settingsReducer'
import uiReducer from './uiReducer'

export default combineReducers({
  dataReducer,
  filterReducer,
  mapReducer,
  reportReducer,
  searchReducer,
  settingsReducer,
  uiReducer,
})
