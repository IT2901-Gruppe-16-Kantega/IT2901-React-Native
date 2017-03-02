/*
  COMBINES REDUCERS INTO ONE AND EXPORTS,
  IMPORTED BY STORE.js
*/

import {combineReducers} from 'redux'

import tweets from '.tweetsReducer'
import user from '.userReducer'

export default combineReducers({
  tweets,
  user
})
