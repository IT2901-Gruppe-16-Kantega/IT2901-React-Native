// The store that handles all data associated with application
import {AsyncStorage} from 'react-native'
//importing redux stuff
import { compose, applyMiddleware, createStore} from 'redux'
import { persistStore, autoRehydrate} from 'redux-persist'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

//importing reducers
import reducer from './reducers'

//debug
const middleware = applyMiddleware(promise(), thunk, /*logger()*/)

//kjøring
//const middleware = applyMiddleware(promise(), thunk)

const store = createStore(
  reducer,
  undefined,
  compose(
    middleware,
    autoRehydrate()
  )
)

const persistor = persistStore(store, {storage: AsyncStorage},() => {
  console.log('rehydration complete')})

function purgeStore(){
  console.log('Purge store');
  persistor.purge();
}

export {store, purgeStore}
