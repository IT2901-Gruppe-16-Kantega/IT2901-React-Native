// View used when user specifies what data to be fetched from NVDB
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Alert,
  ListView,
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as searchActions from '../actions/searchActions'
import * as templates from '../utilities/templates'

import * as dataActions from '../actions/dataActions'

import {searchForFylke} from '../utilities/utils';

import {fetchTotalNumberOfObjects} from '../utilities/wrapper'
var preFetchURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/96/statistikk';

var valid = true;
const vegobjekttyperMedPunkt = [];
//temp
import {vegobjekttyper} from '../data/vegobjekttyper';



/*      ---Layout----
  TWO PARTS:
  1. Where
  2. What

Flow:
1. fill in fylke, vei
- url will be genrated after imidiately, and setNumberOfObjectsToBeFetched()


*/


var SearchView = React.createClass({
  componentDidMount() {
    //some intialization

    //sorting out all vegobjekttyper that we are using,
    /*
    console.log('vegobjekttyper');
    for(i=0; i<vegobjekttyper.length; i++){
      if(vegobjekttyper[i].stedfesting == "PUNKT"){
        vegobjekttyperMedPunkt.push(vegobjekttyper[i]);
      }
    }
    */
  },

  render() {
    return <View style = {templates.container}>
      <View style={templates.top}/>
      <View style={styles.navigatorSpace}/>
      <View style={styles.header}>
        <Text style={{color: templates.textColorWhite}}>NVDB-app</Text>
        <Text/>
      </View>
      <View style={styles.contentsFrame}>
        <View style={styles.sidePaddings}/>
        <View style={styles.contentsArea}>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.whereContents}>
              <Text style={styles.text}>Where?</Text>
              {this.createInputField('fylke')}
            </View>
            <View style={styles.whatContents}>

            </View>
          </ScrollView>
        </View>
        <View style={styles.sidePaddings}/>
      </View>
      <View style={styles.buttonArea}>
        {this.createSearchButton()}
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
    if(this.props.kommune_valid==true){
      this.props.combineSearchParameters(this.props.kommune_input);
      Actions.loadingView();
    }
    else{
      Alert.alert("Ugyldig data", "Sjekk felter for korrekt input");
    }
  },
  createSearchButton(){
    return <TouchableHighlight
      style= {templates.smallButton}
      underlayColor="azure"
      onPress = {this.search}
      >
      <Text style={{color: templates.textColorWhite}}>Search</Text>
    </TouchableHighlight>
  },

  createInputField(type, list){
    var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1.guid != r2.guid});
    var dataSource = ds.cloneWithRows(this.props.fylke_input);
    return <View>
      <TextInput
        autocorrect= {false}
        style={styles.textInput}
        placeholder={type}
        onChangeText={(text) => this.props.inputFylke({text})}
        keyboardType = "default"
        returnKeyType = 'done'
        value = {this.props.fylke_text}
        />
      <ListView
        dataSource={dataSource}
        enableEmptySections= {true}
        renderRow={(rowData) => {
          if(!this.props.fylke_chosen){
            return <TouchableHighlight
              style= {templates.smallButton}
              underlayColor="azure"
              onPress = {() => this.chooseFylke(rowData.navn)}
              >
              <Text>{rowData.navn}</Text>
            </TouchableHighlight>
          }
          else {
            return <View></View>
          }
          } } />
    </View>
  },
  chooseFylke(input){
    var chosenFylke = [];
    chosenFylke.push(this.props.fylke_input.find((fylke) => {
      if(fylke.navn == input){
        return fylke;
      }
    }))
    this.props.chooseFylke(chosenFylke);
  },

  createNumerOfObjectsToBeFetcher(){
    var preUrl = preFetchURL+'?kommune='+this.props.kommune.nummer;
    var numberOfObjectsToBeFetched = 0;
    fetchTotalNumberOfObjects(preUrl).then(function(response){
      numberOfObjectsToBeFetched = response.antall;
      this.props.setNumberOfObjectsToBeFetched(numberOfObjectsToBeFetched);
    }.bind(this));
  }
});

var styles = StyleSheet.create({

  //Top-leve containers
  navigatorSpace:{
    flex:1.3,
    backgroundColor: templates.gray,
  },
  header: {
    flex: 1.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: templates.gray
  },
  contentsFrame: {
    flex: 15.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  //Containers in contentsFrame
  scrollContainer: {
    backgroundColor: 'lightgray'
  },
  sidePaddings: {
    flex: 1,
    backgroundColor: templates.gray,

  },
  contentsArea: {
    flex: 10,
  },
  whereContents: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    backgroundColor: 'green',
  },
  whatContents: {
    flex: 1,
    backgroundColor: 'white',
  },
  //components
  textInput: {
    padding: 5,
    height: 40,
    color: 'white',
    borderWidth: 2,
  },

  buttonArea: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: templates.gray
  },

  text: {
    color: templates.textColorWhite,
  },
})



function mapStateToProps(state) {
  return {
    //fylke fields
    fylke_input: state.searchReducer.fylke_input,
    fylke_valid: state.searchReducer.fylke_valid,
    fylke_navn: state.searchReducer.fylke_navn,
    fylke_text: state.searchReducer.fylke_text,
    fylke_chosen: state.searchReducer.fylke_chosen,

    combinedSearchParameters: state.searchReducer.combinedSearchParameters,
    numberOfObjectsToBeFetched: state.dataReducer.numberOfObjectsToBeFetched,
  };}

function mapDispatchToProps(dispatch) {
  return {
    //input search variables, uses searchActions to set variables before creatingURL
    inputFylke: bindActionCreators(searchActions.inputFylke, dispatch),
    combineSearchParameters: bindActionCreators(searchActions.combineSearchParameters, dispatch),
    chooseFylke: bindActionCreators(searchActions.chooseFylke, dispatch),


    setNumberOfObjectsToBeFetched: bindActionCreators(dataActions.setNumberOfObjectsToBeFetched, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SearchView);
