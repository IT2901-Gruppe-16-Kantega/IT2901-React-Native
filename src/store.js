// The store that handles all data associated with application
//importing redux stuff
import { compose, applyMiddleware, createStore} from 'redux'
//Importing middleWare
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
//storage imports
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import storageEngine from './utilities/storageEngine'
import filter from 'redux-storage-decorator-filter'
//import actions and reducers
import * as searchActions from './actions/searchActions'
import reducers from './reducers'

//creating the list of actions that should issue a save
const savingActions = ['ADD_NEW_SEARCH_OBJECT'];
//wrapping the reducer and create the storage enginge
const reducer = storage.reducer(reducers);
const engine = storageEngine('NVDB');
//filter out the only parts of state that should be loaded
engine = filter(engine,
  [
    ['dataReducer', 'allSearches'],
  ],
  [
  ]);
//creating middleware
const middleWare = [];
middleWare.push(thunk);
const storageMiddleware = storage.createMiddleware(engine, [], savingActions);
middleWare.push(storageMiddleware);
//promiseMiddleware might not be used
const promiseMiddleware = promise();
middleWare.push(promiseMiddleware)

//Remove if not debugging
/*
const loggerMiddleware = logger();
middleWare.push(loggerMiddleware);
*/
//Creating the store
const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);
const store = createStoreWithMiddleware(reducer);
const load = storage.createLoader(engine);
//this is called when the app is started and the store is initialized in index.***.js
load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));

//function used to completely erase the saved store
function purgeStore() {
  engine.clear();
}

export {store, purgeStore}
