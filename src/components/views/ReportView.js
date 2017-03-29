import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
  } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as templates from '../../utilities/templates'
import * as reportActions from '../../actions/reportActions'

/*
View that shows information about a single report
*/
var ReportView = React.createClass({
  render() {
    return <View style={templates.container}>
      <View style={templates.top}/>
        <View style={styles.header}>
          <Text style={{color: templates.colors.white}}>NVDB-app</Text>
        </View>
        <View style={styles.contents}>
          <Text style={styles.text}>
            Her vil det komme informasjon om rapporter
          </Text>
        </View>
        <View style={templates.footer}>
          <Text style={{color: templates.gray}}>Gruppe 16 NTNU</Text>
        </View>
    </View>
  }
});

var styles = StyleSheet.create({

  //Top-leve containers
  header: {
    flex: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.white
  },
  contents: {
    flex: 10.5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: templates.colors.white
  },
  text: {
    color: templates.colors.darkGray,
  },
})

function mapStateToProps(state) {
  return {
    fetching: state.dataReducer.fetching,
    fetched: state.dataReducer.fetched,
  };}
  function mapDispatchToProps(dispatch) {return bindActionCreators(reportActions, dispatch);}
  export default connect(mapStateToProps, mapDispatchToProps) (ReportView);