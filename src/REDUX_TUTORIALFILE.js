/* redux:

  create a reducer
  create a store
  whenever you dispatch events
    the reducer(s) act upon the store

  Redux flow:
    a component that needs to know about redux needs a @connect
    and is passed certain props from the store,
    these props will automatically be updated in the component when
    updated in store, and the component is then rendered
    The component also may import som actions that the can call by:
    this.props.dispatch(someAction)
    the component does not know what happens when it is called



*/


//example redux code
import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

/*
      BASICS, REDUCERS
*/
//receives state and action, returns new state for store
//changes state based on action
//action must have a type value
//action can trigger multiple reducers
const userReducer = (state={}, action) => {
  switch (action.type) {
    case 'CHANGE_NAME': {
      state = {...state, name: action.payload};
      break;
    }
    case 'CHANGE_AGE': {
      state = {...state, age: action.payload};
      break;
    }
  }
  return state;
};

const tweetsReducer = (state={}, action) => {
  return state;
};

// the reducers specified to change a part of state will only change that part of state
const reducers = combineReducers({
  user: userReducer,
  tweets: tweetsReducer,
})

//creates store, receives reducer and starting state
const store = createStore(reducers, {
  //starting state, not needed
})

store.subscribe(() => {
  console.log('store changed', store.getState())
})


/*
    MIDDLEWARE
*/
//middleware
//syntax for creating middleware
const loggerTest = (store) => (next) => (action) => {
  console.log('action fired!', action);
  action.type = 'DEC'; //can modify action
  next(action); // calls next action
}

const middleware = applyMiddleware(loggerTest);

const store = createStore(reducers, middleware)


/*
      HANDLING ASYNC
 */
//handling async, thunk allows us to do this
//mat also user react-middleware-promise for cleaner code

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_PENDING': {
      return {...state, fetching: true}
      break;
    }
    case 'FETCH_USERS_REJECTED': {
      return {...state, fetching: false, error: actino.payload}
      break;
    }
    case 'FETCH_USERS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload}
      break;
    }
  }
}

const middleware = applyMiddleware(promise (), thunk, logg())
const store = createStore(reducer, middleware)

store.dispatch((dispatch) => {
  dispatch({type: 'FETCH_USERS_START'})
  //do something async
  // get something from NVDB
  axios.get().then((response) => {
  dispatch({type: 'RECEIVE_USER', payload: reponse})
  })
    .catch((error) => {
  dispatch({type: 'ERROR', payloand})
  })
  //dispatch something else if we want
  dispatch({type: 'bar'})
})

//dispatch witch promise() middleware
store.dispatch({
  type: 'FETCH_USERS',
  payload: axios.get() //return a payload that gives a promise
  //promise-middleware recognizes this and autodispatches pending, fullfilled, rejected messages
  //create reducers that handels these dispatches, see reducer function
})

store.dispatch({type: 'CHANGE_NAME', payload: 'will'})
