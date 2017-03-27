
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  ScrollView,
  ActivityIndicator,
  TextInput,
  Navigator
} from 'react-native';

import {fetchFromAPI_all, fetch_Kommuner} from './wrapper';
import {kommuner_allinfo} from '../src/data/kommuner';
import {createBST, searchForKommune} from './utils';
import MapView from 'react-native-maps';

//  Diverse url brukt i testing
var startURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/96?kommune=101';
//var startURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/46?kommune=101&antall=1';
//var startURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/46?kommune=101';
//var startURL ='https://www.vegvesen.no/nvdb/api/v2/vegobjekter/96?kommune=101&inkluder=alle';
var baseURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/96';
//var baseURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/46';

// This is the old rout-chooser, now only used as reference


var RouteChooser = React.createClass({
  getInitialState: function(){
    createBST();
    return {
      current_Kommune: null,
      objects: [],  //array of objects from api
      fetching: false, //bool used to display information whether or not a fetch is ongoing
      kommuner: [],
      kommuneID: '',
      kommuneIDValidated: 'input not validated',
      kommuneFound: false,
      region: {
        latitude: 63.43,
        longitude: 10.41,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      signs: [],
      showMap: true,
      markers: [],
      testMarkers: [{latlng: {latitude: 63.42,longitude: 10.39}, title: 'asd', description: '123'}]
    }
  },

  render: function() {
    return<View style = {styles.container}>
      <View style={styles.top}></View>
      <View style = {styles.header}>
        <Text style ={styles.whiteText}> NVDB-app </Text>
      </View>
      <View style={styles.contents}>
        <View style={styles.searchField}>
          {this.createTextInputField()}
          <TouchableHighlight
            style= {styles.findButton}
            underlayColor="azure"
            onPress = {this.findPressed}
            >
            <Text style={styles.whiteText}>Find</Text>
          </TouchableHighlight>
        </View>
        <View style = {styles.divField}>
          <View style ={styles.padding2}></View>
          {this.createCurrentKommuneField()}
          {this.createFetchingInfo()}
          {this.createShowButton()}
          <View style ={styles.padding2}></View>
        </View>
        <View style={styles.dataArea}>
          <View style={styles.dataPadding}></View>
          <View style={styles.dataField}>
            {this.switchDataArea()}
          </View>
          <View style={styles.dataPadding}></View>
        </View>
        <View style={styles.bottomField}>
          <View style={styles.padding3}></View>
          <TouchableHighlight
            style= {styles.mapButton}
            underlayColor="azure"
            onPress = {this.mapButtonPressed}
            >
            <Text style={styles.whiteText}>View map</Text>
          </TouchableHighlight>
          <View style={styles.padding3}></View>
          <TouchableHighlight
            style= {styles.mapButton}
            underlayColor="azure"
            onPress = {this.openAR}
            >
            <Text style={styles.whiteText}>Open AR</Text>
          </TouchableHighlight>
          <View style={styles.padding3}></View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.greyText}>Gruppe 16 NTNU</Text>
      </View>
    </View>
  },

  switchDataArea(){
    if(this.state.showMap == true) {
      //console.log('Switching to mapview, number of objects: ');
      //console.log(this.state.objects.length);
      return <MapView
        style={styles.map}
        region={this.state.region}
        onRegionChange={this.mapRegionChanged}
        onLongPress={this.mapPressed}
        zoomEnabled={true}
        >

      {this.state.objects.map(function(object) {
        //console.log('#mapping')
        var geometryString = object.geometri.wkt.split('(')[1].slice(0, -1);
        var geometryParts = geometryString.split(' ');

        var objLat = parseFloat(geometryParts[0]);
        var objLong = parseFloat(geometryParts[1]);
        var LatLng = {latitude: objLat, longitude: objLong};
        var chosenColor = 'yellow';
        if(object.geometri.egengeometri==false){
          chosenColor = 'red';
        }
        else if (object.geometri.egengeometri==true){
          chosenColor = 'green';
        }
        var id = object.id;
        var stringID = id.toString();
        return <MapView.Marker
          coordinate={LatLng}
          title={stringID}
          description={stringID}
          key={stringID}
          pinColor={chosenColor}
          />
      })}
    </MapView>

    }
    else{
      return <ScrollView>{this.showObjects()}</ScrollView>
    }

  },

  openAR: function() {
    //do something
  },
  // map shit
  mapRegionChanged(region) {
    this.setState({region});
  },
  mapPressed(press) {
    const coordinate = press.nativeEvent.coordinate;
  },

  mapButtonPressed: function() {
    if(this.state.showMap == false){
      //fyll array markers from objects
      this.setState({showMap: true})
    }
    else {
      this.setState({showMap: false})
    }
  },

  // creating fething status information
  createFetchingInfo: function() {
    return <ActivityIndicator
      animating={this.state.fetching}
      style={[styles.fetchingInfo, {height: 80}]}
      size="large"
      />
  },
  createTextInputField: function() {
    return <View style={styles.textField}>
      <TextInput
        style={styles.textInput}
        maxLength={4}
        placeholder="Type in kommmune id"
        onChangeText={(text) => this.updateTextState({text})}
        keyboardType = 'numeric'
        onSubmitEditing = {this.findPressed}
        />
    </View>
  },
  updateTextState: function(input){
    this.setState({kommuneID: input.text});
  },

  //this is where mapshit happens
  findPressed: function() {
    //console.log('#findPressed');
    this.setState({kommuneIDValidated: 'not validated'});
    var data = searchForKommune(this.state.kommuneID)
    if(data.length == 0){
      this.setState({kommuneIDValidated: 'unkown kommuneID'})
      this.setState({current_Kommune: 'unkown kommune'})
    }
    else if (data.length == 1){
      this.setState({current_Kommune: data[0]}); //works, current_Kommune er riktig
      //console.log(data[0])
      var geometryString = data[0].senterpunkt.wkt.split('(')[1].slice(0, -1);
      var geometryParts = geometryString.split(' ');
      //console.log(geometryString);
      var objLat = parseFloat(geometryParts[0]);
      var objLong = parseFloat(geometryParts[1]);
      this.setState({kommuneFound: true});
      this.setState({kommuneIDValidated: 'kommune found'});
      this.setState({region: {
        latitude: objLat,
        longitude: objLong,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },})
    }
    else{
      console.log('#fetchkommunePressed: ERROR');
    }
  },

  createCurrentKommuneField: function(){
    if (this.state.kommuneFound == true){
      return <View style={styles.currentKommuneField}>
        <Text style={styles.whiteText}> {this.state.current_Kommune.navn}</Text>
      </View>

    }
    else {
      return <View style={styles.currentKommuneField}>
        <Text style={styles.whiteText}> No kommune</Text>
      </View>
    }
  },

  createShowButton: function() {
    return <TouchableHighlight
      style ={styles.showButton}
      underlayColor="azure"
      onPress={this.findObjects}
      >
      <Text style={styles.whiteText}>Fetch objects</Text>
    </TouchableHighlight>
  },
  findObjects: function() {
    //console.log('#route-chooser.findObjects')
    //this.setState({fetching: true});  //lager fetchingbar

    //this.fetchFromAPI(startURL);
    this.fetchFromAPI(this.createURL());
  },
  showObjects: function() {  //creates the view which shows the contents in state.objects, used by render
    try {
      //console.log('route-chooser.showObjects');
      return this.state.objects.map(function(data, i){
        return <View key={i}>
          <Text style={styles.blackText}>{data.id}</Text>
        </View>
      })
    }
    catch (error){
      //catcher error som skjer før data er hentet, objects er tom på det tidspunkt
    }

  },
  fetchFromAPI: function(url) {  //fetches data associated with given url
    //console.log('#route-chooser.fetchFromAPI');
    this.setState({
      objects: [],
    });
    this.setState({fetching: true});
    fetchFromAPI_all(this.updateState_Objects, url);
  },
  updateState_Objects: function(objects, isFinalFetch){  //updates state.objects(and state.fetch) with data
    //console.log('#updateState_Objects');
    //console.log('--> objects is: ');
    //console.log(objects);
    if(isFinalFetch == true){
      this.setState({fetching: false});
    }
    else{
      this.setState({fetching: true});
    }
    this.setState({objects});
  },

  createURL: function() {
    //console.log('#createURL');
    if(this.state.current_Kommune == null){
      console.log('ERROR: current_Kommune er null');
      return('')
      //return(baseURL);
    }
    else {
      return(baseURL+'?kommune='+this.state.current_Kommune.nummer+'&inkluder=alle&srid=4326');
    }
  },


})

/*
Layout components
*/

//Colors
var grayHeader = '#444f55'
var bakgroundOfSearch = '#646a70'
var textColorWhite = '#ffffff'
var textColorBlack = '#000000'

//Styles
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
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: grayHeader
  },
  contents: {
    flex: 20
  },
  footer: {
    flex:0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //containers in contents
  //searchfield and children
  searchField: {
    backgroundColor: grayHeader,
    //flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingTop: 5
  },
  textField: {
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 2,
    paddingRight: 10
  },
  textInput: {
    height: 30,
    color: textColorWhite,
    backgroundColor: bakgroundOfSearch
  },
  findButton: {
    flex: 2.355,
    borderWidth: 2,
    height: 30,
    width: 70,
    padding: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: 'aliceblue',

  },
  //divField, to be deprecated
  divField: {
    flex: 0.7,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: grayHeader
  },

  currentKommuneField: {
    flex: 1,

  },
  fetchingInfo: {  //used by fetching status
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  showButton: {
    flex: 1,
    borderWidth: 2,
    height: 30,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'aliceblue',
  },
  padding2: {
    flex: 0.09,
  },

  //dataField
  dataArea: {
    flex: 9,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',

  },
  dataField: {
    flex: 20,
  },
  dataPadding: {
    flex: 0.5,
    backgroundColor: grayHeader
  },
  //bottomField, mapbutton
  bottomField: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: grayHeader,
    flexDirection: 'row',
    paddingTop:1.8
  },
  mapButton: {
    flex: 2,
    borderWidth: 2,
    height: 30,
    width: 70,
    padding: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: 'aliceblue',
  },
  padding3:{
    flex: 0.11

  },
  map: {
    flex: 8,
  },

  whiteText: {
    color: textColorWhite,
  },
  blackText: {
    color: textColorBlack,
  },
  greyText: {
    color: grayHeader
  }


})


module.exports = RouteChooser;
