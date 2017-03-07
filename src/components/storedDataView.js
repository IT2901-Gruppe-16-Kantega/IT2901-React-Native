// View that shows all stored data
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,

 } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as storedDataActions from '../actions/storedDataActions'
import * as templates from '../utilities/templates'

var StoredDataView = React.createClass({
  render() {
    return <View style={styles.container}>
      <View style={styles.top}/>
        <View style={styles.header}>
          <Text style={{color: templates.textColorWhite}}>NVDB-app</Text>
        </View>
        <View style={styles.contents}>
          <Text style={styles.text}>
            Her vil det komme informasjon om lagrede søk
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={{color: templates.gray}}>Gruppe 16 NTNU</Text>
        </View>
    </View>
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'stretch',
  },
  //Top-leve containers
  top: {
    flex: 0.7
  },
  header: {
    flex: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.gray
  },
  contents: {
    flex: 10.5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: templates.gray
  },
  footer: {
    flex:0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: templates.textColorWhite,
  },
})


function mapStateToProps(state) {return {user: state.dataReducer.fetching};}
function mapDispatchToProps(dispatch) {return bindActionCreators(storedDataActions, dispatch);}
export default connect(mapStateToProps, mapDispatchToProps) (StoredDataView);
