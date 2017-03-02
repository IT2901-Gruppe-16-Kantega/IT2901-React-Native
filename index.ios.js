import React, { Component } from 'react';
import {AppRegistry, Dimensions, StyleSheet, View} from 'react-native';
import RouteChooser from './old_src/route-chooser';

//<RouteChooser/> replace with <Index/>

var NVDB = React.createClass({
  getInitialState() {
    return {
    }
  },
  render() {
    return (
      <View style={styles.container}>
        <RouteChooser/>
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('NVDB', () => NVDB);
