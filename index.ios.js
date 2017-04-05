import React, { Component } from 'react';
import {AppRegistry, Dimensions, StyleSheet, View, Text} from 'react-native';
import {Provider} from 'react-redux'
import App from './src/index'
import {store, purgeStore} from './src/store'

class NVDB extends Component {
  render() {
    return (
      <Provider store = {store}>
        <App/>
      </Provider>);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  AppRegistry.registerComponent('NVDB', () => NVDB);
