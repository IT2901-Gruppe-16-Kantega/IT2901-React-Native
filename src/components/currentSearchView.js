// Shows information about current search, buttons for viewing map and opening AR
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight

  } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as dataActions from '../actions/dataActions'
import * as templates from '../utilities/templates'


var currentSearchView = React.createClass({
  render() {
    return <View style={styles.container}>
      <View style={styles.top}/>
      <View style={styles.header}>
        <Text style={{color: templates.textColorWhite}}>NVDB-app</Text>
      </View>
      <View style={styles.contents}>
        {this.createInformationView()}
      </View>
      <View style={styles.bottom}>
        {this.createButtons()}
      </View>
      <View style={styles.footer}>
        <Text style={{color: templates.gray}}>Gruppe 16 NTNU</Text>
      </View>
    </View>
  },
  createInformationView(){
    return <View style={styles.informationView}>
      <View style={styles.informationPadding}/>
      <View style={styles.information}>
        <Text style={{color: templates.textColorWhite}}>Valgt kommune er {this.props.kommune}</Text>
        <Text style={{color: templates.textColorWhite}}>Antall vegobjekter er {this.props.objects.length}</Text>
        <Text style={{color: templates.textColorWhite}}>Prosentandel med egengeometri</Text>
      </View>
      <View style={styles.informationPadding}/>
    </View>
  },
  createButtons(){
    return <View style={styles.buttons}>
      <View style={styles.buttonArea1}>
        <TouchableHighlight
          style= {styles.button}
          underlayColor="azure"
          onPress = {Actions.showMapView}
          >
          <Text style={{color: templates.textColorWhite}}>Map</Text>
        </TouchableHighlight>
        <View style={styles.buttonPadding}/>
        <TouchableHighlight
          style= {styles.button}
          underlayColor="azure"
          onPress = {this.openAR()}
          >
          <Text style={{color: templates.textColorWhite}}>AR</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.buttonArea2}>
        <TouchableHighlight
          style= {styles.button}
          underlayColor="azure"
          onPress = {Actions.reportView}
          >
          <Text style={{color: templates.textColorWhite}}>Report</Text>
        </TouchableHighlight>
        <View style={styles.buttonPadding}/>
        <TouchableHighlight
          style= {styles.button}
          underlayColor="azure"
          onPress = {this.exit}
          >
          <Text style={{color: templates.textColorWhite}}>Exit</Text>
        </TouchableHighlight>
      </View>

    </View>
  },
  openAR() {
    console.log(this.props.objects.length);

  },
  exit() {
    Actions.startingView();
    this.props.clearData();
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
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.gray
  },
  contents: {
    flex: 11.5,
    flexDirection: 'column',
    backgroundColor: templates.gray
  },
  informationView: {
    flex:1,
    flexDirection: 'row',
  },
  informationPadding: {
    flex: 0.2,
  },
  information: {
    flex:2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  bottom: {
    flex: 2.5,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: templates.gray
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonArea1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  buttonArea2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonPadding: {
    flex: 0.1
  },
  button: {
    borderWidth: 2,
    flex: 1,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'aliceblue',
  },
  footer: {
    flex:0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
})


function mapStateToProps(state) {
  return {
    kommune: state.dataReducer.kommune[0].navn,
    objects: state.dataReducer.objects,

  };}
function mapDispatchToProps(dispatch) {return bindActionCreators(dataActions, dispatch);}
export default connect(mapStateToProps, mapDispatchToProps) (currentSearchView);
