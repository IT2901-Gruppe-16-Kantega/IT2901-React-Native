import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import * as templates from '../utilities/templates'

export var Footer = React.createClass({
  render() {
    return <View style={styles.footer}>
      <Text style={{color: templates.gray}}>Gruppe 16 NTNU</Text>
    </View>
  }
})

var styles = StyleSheet.create({
  footer: {
    flex:0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
