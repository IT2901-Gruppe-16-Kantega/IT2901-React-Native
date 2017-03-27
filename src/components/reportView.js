// View that shows informatin about a single report
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
  } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as templates from '../utilities/templates'
import * as reportActions from '../actions/reportActions'

var ReportView = React.createClass({
  render() {
    return <View style={styles.container}>
      <View style={styles.top}/>
        <View style={styles.header}>
          <Text style={{color: templates.colors.white}}>NVDB-app</Text>
        </View>
        <View style={styles.contents}>
          <Text style={styles.text}>
            Her vil det komme informasjon om rapporter
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={{color: templates.colors.darkGray}}>Gruppe 16 NTNU</Text>
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
    backgroundColor: templates.colors.darkGray
  },
  contents: {
    flex: 10.5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: templates.colors.darkGray
  },
  footer: {
    flex:0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: templates.colors.white,
  },
})

function mapStateToProps(state) {
  return {
    fetching: state.dataReducer.fetching,
    fetched: state.dataReducer.fetched,
  };}
  function mapDispatchToProps(dispatch) {return bindActionCreators(reportActions, dispatch);}
  export default connect(mapStateToProps, mapDispatchToProps) (ReportView);
