//some toplevecomponent, to be DEPRECATED
//move redux stuff to index.ios.js

/* ABOUT REDUX:
  Overview:
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


  This file is the provider, the top leve redux component,
  provider should perhaps be index.ios.js instead
*/

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import {Provider} from 'react-redux'

import startingView from './components/startingView'
import store from './store'

//may need to wrap startingView in <View></View>

var TempStart = React.createClass({
  render(){
    return(
      <Provider store = {store}>
        <Text>YOlo</Text>
      </Provider>)
  }
})

module.exports = TempStart;
