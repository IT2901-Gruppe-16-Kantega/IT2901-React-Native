// The store that handles all data associated with application

//importing redux stuff
import { applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

//importing reducers
import reducer from './reducers'

const middleware = applyMiddleware(promise(), thunk)

export default createStore(reducer, middleware)
