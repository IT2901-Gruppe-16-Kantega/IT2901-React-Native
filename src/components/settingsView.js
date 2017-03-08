//currently not used, but may be used to specify username, autoloading on/off etc
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,

 } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as settingsActions from '../actions/settingsActions'
import * as templates from '../utilities/templates'

var SettingsView = React.createClass({
  render() {
    return <View style={styles.container}>
      <View style={styles.top}/>
        <View style={styles.header}>
          <Text style={{color: templates.textColorWhite}}>NVDB-app</Text>
        </View>
        <View style={styles.contents}>
          <Text style={styles.text}>
            Her vil det komme settings slik at bruker kan definiere div instillinger
            slik som f.eks skru av/på autolagring av søk.
            Samt spesifisering av forhåndsutfylte søkeparametre:
            kommune, veg, skilt e.l kommer opp standard ved nytt søk
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
function mapDispatchToProps(dispatch) {return bindActionCreators(settingsActions, dispatch);}
export default connect(mapStateToProps, mapDispatchToProps) (SettingsView);
