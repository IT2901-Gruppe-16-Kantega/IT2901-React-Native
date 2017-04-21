// The store that handles all data associated with application
//importing redux stuff
import { compose, applyMiddleware, createStore} from 'redux'
//Importing middleWare
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import * as searchActions from './actions/searchActions'
import reducers from './reducers'


//Debug
const middleware = applyMiddleware(promise(), thunk, /*logger()*/)

//kjøring
//const middleware = applyMiddleware(promise(), thunk)

const store = createStore(reducers, middleware)


export {store}
