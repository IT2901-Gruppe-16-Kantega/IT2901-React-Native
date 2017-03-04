// View used when user specifies what data to be fetched from NVDB
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as dataActions from '../actions/dataActions'
import * as templates from '../utilities/templates'


var searchFormView = React.createClass({
  render() {
    return <View style = {styles.container}>
      <View style={styles.top}></View>
      <View style={styles.header}>
        <Text style={{color: templates.textColorWhite}}>NVDB-app</Text>
      </View>
      <View style={styles.contents}>
        <View style={styles.inputAreaPadding}></View>
        <View style={styles.inputArea}>

          <TextInput
            style={styles.textInput}
            maxLength={4}
            placeholder="Type in kommmune id"
            onChangeText={(text) => this.updateTextState({text})}
            keyboardType = 'numeric'
            />
          <Text style={{color: 'white'}}>
            {this.props.kommune}
          </Text>
        </View>
        <View style={styles.inputAreaPadding}></View>
      </View>
      <View style={styles.buttonArea}>
        <TouchableHighlight
          style= {templates.smallButton}
          underlayColor="azure"
          onPress = {this.search}
          >
          <Text style={{color: templates.textColorWhite}}>Search</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.footer}>
        <Text style={{color: templates.gray}}>Gruppe 16 NTNU</Text>
      </View>
    </View>
  },
  search: function(){
    this.props.fetchData(this.props.kommune);
    Actions.loadingView();
  },
  updateTextState: function(text) {
    console.log('updateText');
    this.props.setKommune(text);
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: templates.gray
  },
  inputArea: {
    flex: 10,
    flexDirection: 'column'
  },
  inputAreaPadding:{
    flex: 1,
  },
  textInput: {
    padding: 5,
    height: 30,
    color: templates.gray,
    backgroundColor: 'white'
  },
  buttonArea: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: templates.gray
  },
  footer: {
    flex:0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
})



function mapStateToProps(state) {return {kommune: state.dataReducer.kommune};}
function mapDispatchToProps(dispatch) {return bindActionCreators(dataActions, dispatch);}
export default connect(mapStateToProps, mapDispatchToProps) (searchFormView);
