/**
* The Redux store component.
* Handles the main core of a redux implementation
*/

//importing redux
import { compose, applyMiddleware, createStore} from 'redux'
//Importing middleWare
import logger from 'redux-logger'
import thunk from 'redux-thunk'
//importing reducers
import reducers from './reducers'

const middleware = applyMiddleware(thunk)
const store = createStore(reducers, middleware)

export {store}
