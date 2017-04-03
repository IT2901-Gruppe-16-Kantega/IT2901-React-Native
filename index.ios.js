import React, { Component } from 'react';
import {AppRegistry, Dimensions, StyleSheet, View, Text, AppState, AsyncStorage} from 'react-native';
import {Provider} from 'react-redux'
import App from './src/index'
import store from './src/store'

var STORAGE_KEY = '@AsyncStorageExample:key';
var STORAGE_KEY2 = '@AsyncStorageExample:store';

class NVDB extends Component {

  state = {
    appState: AppState.currentState
  }

  componentWillMount() {
    console.log('app i starting')
    console.log('checking if store is saved...')
    //check if store exists, else create new store
  }
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY2);
      if (value !== null){
        console.log('value is: '+value)
      } else {
        console.log('value is null')
      }
    } catch (error) {
      console.log('loading failed, error:')
      console.log(error)
    }
  };

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    else if(this.state.appState.match(/active/) && nextAppState === 'background') {
      console.log('App is closed!')
      this.saveStore();
      //Store state
    }
    this.setState({appState: nextAppState});
  }


  render() {
    return (
      <Provider store = {store}>
        <App/>
      </Provider>);
    }

  saveStore() {
    console.log('saving store...')
    try {
      AsyncStorage.setItem(STORAGE_KEY2, JSON.stringify(store));
    } catch (error) {
      console.log('Saving error')
      console.log(erro)
    }

  }



  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  AppRegistry.registerComponent('NVDB', () => NVDB);
