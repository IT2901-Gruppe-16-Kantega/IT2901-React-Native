import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Linking,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import RNFS from 'react-native-fs'
import userDefaults from 'react-native-user-defaults'

import Button from '../misc/Button'
import Container from '../misc/Container'
import PropertyValue from '../misc/PropertyValue'

import {parseGeometry} from '../../utilities/utils'
import * as templates from '../../utilities/templates'
import * as dataActions from '../../actions/dataActions'
import * as mapActions from '../../actions/mapActions'

/*
Shows information about current search, buttons for viewing map and opening AR
*/
var CurrentSearchView = React.createClass({
  componentDidMount() {
    this.props.resetFetching();
    this.props.setDescription(this.props.currentRoadSearch.description)
    //this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  },

  render() {
    return <Container>
      <TouchableWithoutFeedback
        onPress={()=>{
          console.log("press outside")
          Keyboard.dismiss()
        }}
        >
        <View style={styles.informationArea}>{this.createInformationView()}</View>
      </TouchableWithoutFeedback>
      <View style={styles.buttonArea}>{this.createButtons()}</View>
    </Container>
  },

  createInformationView() {
    console.log(this.props.currentRoadSearch)
    var kommuneValue = "Ikke spesifisert"
    if (this.props.currentRoadSearch.searchParameters[2] != null) {
      kommuneValue = this.props.currentRoadSearch.searchParameters[2].navn
    }
    return <View style={styles.infoText}>
      <Text style={this.props.theme.title}>Informasjon om valgt vegsøk:</Text>
      <PropertyValue property={"Vegobjekttype"} value={this.props.currentRoadSearch.searchParameters[3].navn} />
      <PropertyValue property={"Antall vegobjekter"} value={this.props.currentRoadSearch.roadObjects.length} />
      <PropertyValue property={"Fylke"} value={this.props.currentRoadSearch.searchParameters[0].navn} />
      <PropertyValue property={"Kommune"} value={kommuneValue} />
      <PropertyValue property={"Vei"} value={this.props.currentRoadSearch.searchParameters[1]} />
      {this.createDescriptionArea()}
    </View>
  },

  createDescriptionArea() {
    var placeholder = ""
    if(this.props.description == "") {
      placeholder = "Skriv inn en beskrivelse eller et notat"}
    return  <TextInput
        underlineColorAndroid={templates.colors.lightGray}
        autocorrect={false}
        style={{
          padding: 5,
          height: 40,
          color: this.props.theme.primaryTextColor,
        }}
        onBlur={()=>{console.log("asd")}}
        multiline={true}
        placeholderTextColor={this.props.theme.placeholderTextColor}
        placeholder={placeholder}
        onChangeText={(text) => {
          this.props.setDescription(text)
        }}
        keyboardType="default"
        value={this.props.description}
        onEndEditing={this.saveDescription}
        />
  },
  //TODO this is now implemented using really bad redux-practise, should implement better
  saveDescription() {
    this.props.currentRoadSearch.description = this.props.description
    this.props.searchSaved(this.props.currentRoadSearch)
    //this.props.replaceSearch(this.props.allSearches, this.props.currentRoadSearch)
  },

  createButtons() {
    return <View>

      <View style={styles.topButtons}>
        <Button text="Kart" onPress={Actions.RoadMapView} />
        <Button text="AR" onPress={this.openAR} />
      </View>

      <View style={styles.bottomButtons}>
        <Button text="Rapport" onPress={Actions.ReportView} />
        <Button text="Tilbake" onPress={Actions.StartingView} />
      </View>

    </View>
  },

  openAR() {
    //kan brukes ved mottak av data fra unity
    //this.props.fetchDataReturned(objects, true);
  	if(Platform.OS === "ios") {
  		userDefaults.set("HEI", this.props.currentRoadSearch.roadObjects, "group.nvdb", (err, data) => {
  	      if(!err) Linking.openURL("nvdbAr:");
  	    });
  	} else if (Platform.OS === "android"){
  		// Save data.json
  		let dataPath = RNFS.ExternalStorageDirectoryPath + "/Android/data/com.nvdb/files/data.json";
  		console.log(dataPath);
  		var data = "{ \"objekter\" :" + JSON.stringify(this.props.currentRoadSearch.roadObjects) + "}";
  		RNFS.writeFile(dataPath, data, "utf8")
  			.then((success) => console.log("data.json saved successfully"))
  			.catch((err) => console.error("An error occurred when saving data.json", err));
  		Linking.openURL("nvdbAr:").catch(err => console.error('An error occurred', err));
  		// TODO Save roads.json here
  		//let roadsPath = RNFS.ExternalDirectoryPath + "/roads.json";
  	} else {
  		console.log("Not ios or android")
  	}
  },
});

var styles = StyleSheet.create({
  informationArea: {
    flex: 1,
  },
  infoText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  topButtons: {
    flexDirection: 'row',
  },
  bottomButtons: {
    flexDirection: 'row',
    marginBottom: 30,
  },
})

function mapStateToProps(state) {
  return {
    theme: state.settingsReducer.themeStyle,
    currentRoadSearch: state.dataReducer.currentRoadSearch,
    allSearches: state.dataReducer.allSearches,
    theme: state.settingsReducer.themeStyle,
    description: state.dataReducer.description,
  };}

  function mapDispatchToProps(dispatch) {
    return {
      //dataActions
      resetFetching: bindActionCreators(dataActions.resetFetching, dispatch),
      setRegion: bindActionCreators(mapActions.setRegion, dispatch),
      searchSaved: bindActionCreators(dataActions.searchSaved, dispatch),
      setDescription: bindActionCreators(dataActions.setDescription, dispatch),
    }
  }
  //function mapDispatchToProps(dispatch) {return bindActionCreators(dataActions, dispatch);}
  export default connect(mapStateToProps, mapDispatchToProps) (CurrentSearchView);
