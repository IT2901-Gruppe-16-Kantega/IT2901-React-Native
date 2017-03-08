// View used when user specifies what data to be fetched from NVDB
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as dataActions from '../actions/dataActions'
import * as templates from '../utilities/templates'
import {fetchFromAPI_all} from '../utilities/wrapper'

//move create url from routechooser to utilities and import
var startUrl = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/96?kommune=439'
var baseURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/96';


var valid = true;

var SearchFormView = React.createClass({
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
            {this.props.kommune_input}
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
    this.props.setKommune(this.props.kommune_input);
    setTimeout(this.searchForKommune, 100);
  },
  searchForKommune: function() {
    if(this.props.valid_kommune == true){
      var url = baseURL+'?kommune='+this.props.kommune[0].nummer+'&inkluder=alle&srid=4326';
      var urlShallow = baseURL+'?kommune='+this.props.kommune[0].nummer;
      this.props.fetchDataStart();
      fetchFromAPI_all(this.props.fetchDataReturned, url);
      Actions.loadingView();
    }
    else{
      Alert.alert("Ugyldig data", "Ukjent kommunenummer, vennligst skriv inn et gydlig kommunenummer");
    }
  },
  updateTextState: function(text) {
    console.log('updateText');
    this.props.setKommuneInput(text);
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



function mapStateToProps(state) {
  return {
    kommune_input: state.dataReducer.kommune_input,
    valid_kommune: state.dataReducer.valid_kommune,
    kommune: state.dataReducer.kommune
  };}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(dataActions, dispatch);}

export default connect(mapStateToProps, mapDispatchToProps) (SearchFormView);
