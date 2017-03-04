/*
  COMBINES REDUCERS INTO ONE AND EXPORTS,
  IMPORTED BY STORE.js
*/

import {combineReducers} from 'redux'

import tweetsReducer from './tweetsReducer'
import userReducer from './userReducer'
import dataReducer from './dataReducer'

export default combineReducers({
  tweetsReducer,
  userReducer,
  dataReducer
})
