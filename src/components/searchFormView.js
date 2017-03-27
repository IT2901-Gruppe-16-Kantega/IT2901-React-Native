// View used when user specifies what data to be fetched from NVDB
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Alert,
  ListView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as searchActions from '../actions/searchActions'
import * as templates from '../utilities/templates'


import {searchForFylke} from '../utilities/utils';



var valid = true;


/*

  DPRECATED SEARCH VIEW, new in components.SearchView

*/


var SearchFormView = React.createClass({

  render() {
    return <View style = {templates.container}>
      <View style={templates.top}></View>
      <View style={styles.header}>
        <Text style={{color: templates.colors.white}}>NVDB-app</Text>
      </View>
      <View style={styles.contents}>
        <View style={styles.inputAreaPadding}></View>
        <View style={styles.inputArea}>
          <Text style={styles.text}>Kommune</Text>
          <TextInput
            style={{padding: 5,
              height: 30,
              color: 'white',
              borderWidth: 2,
              borderColor: this.props.kommune_input_color_border,
              backgroundColor: this.props.kommune_input_color}}
            maxLength={4}
            placeholder="Type in kommmune id"
            onChangeText={(text) => this.props.inputKommune({text})}
            keyboardType = "numbers-and-punctuation"
            returnKeyType = 'done'
            />
          <Text style={{color: 'white'}}>
            {this.props.kommune_navn}
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
          <Text style={{color: templates.colors.white}}>Search</Text>
        </TouchableHighlight>
      </View>
      <View style={templates.footer}>
        <Text style={{color: templates.gray}}>Gruppe 16 NTNU</Text>
      </View>
    </View>
  },

  search() {
    //Check that all input fields are valid
    //Then combine all parameters to one file

    //Should also check the number of objects that are going to be fetcehd here
    //and give the user the ability to cancel the search if there is going to be
    // long waiting time
    if(this.props.kommune_valid){
      this.props.combineSearchParameters(this.props.kommune_input);
      Actions.loadingView();
    }
    else {
      Alert.alert("Ugyldig data", "Sjekk felter for korrekt input.");
    }
  },
});

var styles = StyleSheet.create({
  //Top-leve containers
  header: {
    flex: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.darkGray
  },
  contents: {
    flex: 10.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: templates.colors.darkGray
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
    color: templates.colors.darkGray,
    backgroundColor: 'white',
  },
  buttonArea: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: templates.colors.darkGray
  },
  text: {
    color: templates.colors.white,
  },
})



function mapStateToProps(state) {
  return {
    //field used to hold input in text field for kommune
    fylke_input: state.searchReducer.fylke_input,
    kommune_input: state.searchReducer.kommune_input,
    fylke_valid: state.searchReducer.fylke_valid,

    //boolean used to check whether or not input kommuneid is valid
    kommune_valid: state.searchReducer.kommune_valid,
    kommune_input_color: state.searchReducer.kommune_input_color,
    kommune_input_color_border: state.searchReducer.kommune_input_color_border,

    valid_all: state.searchReducer.valid_all,
    combinedSearchParameters: state.searchReducer.combinedSearchParameters,

    //only used in debugging
    kommune_navn: state.searchReducer.kommune_navn,

  };}

function mapDispatchToProps(dispatch) {
  return {
    //input search variables, uses searchActions to set variables before creatingURL
    inputKommune: bindActionCreators(searchActions.inputKommune, dispatch),
    inputFylke: bindActionCreators(searchActions.inputFylke, dispatch),
    combineSearchParameters: bindActionCreators(searchActions.combineSearchParameters, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SearchFormView);
