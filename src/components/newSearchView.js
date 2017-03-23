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

import {searchForFylke, fetchVeierFromAPI} from '../utilities/utils';

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


var newSearchView = React.createClass({
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
              {this.createInputField(
                'fylke',
                this.props.fylke_input,
                this.props.fylke_text,
                this.props.fylke_chosen,
                true,
                this.props.inputFylke,
                this.chooseFylke
              )}
              <Text style={styles.text}>Velg vegtype</Text>
              {this.createInputField(
                'Vegkategorier',
                this.props.vegkategori_input,
                this.props.vegkategori_text,
                this.props.vegkategori_chosen,
                this.props.vegkategori_enabled,
                this.props.inputVegkategori,
                this.chooseVegkategori,
                true
              )}
              <Text style={styles.text}>Velg vegnummer</Text>
              {this.createInputField(
                'Vegnummer',
                this.props.veg_input,
                this.props.veg_text,
                this.props.veg_chosen,
                this.props.veg_enabled,
                this.props.inputVeg,
                this.chooseVeg,
                true
              )}
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


  //Slå sammen med den generelle etter at den er ferdig
  createInputField(type, list, textType, choosenBool ,editable, inputFunction, chooserFunction, multiInputEnabled){
    var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(list);
    var color = 'darkgray';
    if(editable==true){
      color = 'green';
      if(type=='Vegnummer'){
        //TODO

        //give the user som feedback that vegnummer is not currently availiable

        fetchVeierFromAPI(this.props.fylke_input, this.props.vegkategori_input);
      }
    };

    return <View style={{backgroundColor: color}}>
      <TextInput
        autocorrect= {false}
        autofocus = {editable}
        editable = {editable}
        style={styles.textInput}
        placeholder={type}
        onChangeText={(text) => inputFunction({text})}
        keyboardType = "default"
        returnKeyType = 'done'
        value = {textType}
        />
      <ListView
        dataSource={dataSource}
        enableEmptySections= {true}
        renderRow={(rowData) => {
          if(!choosenBool){
            return <TouchableHighlight
              style= {templates.smallButton}
              underlayColor="azure"
              onPress = {() => chooserFunction(rowData.navn)}
              >
              <Text>{rowData.navn}</Text>
            </TouchableHighlight>
          }
          else {
            return <View></View>
          }
          }}/>
    </View>
  },
  chooseVegkategori(input){
    var chosenVegkategori = [];
    chosenVegkategori.push(this.props.vegkategori_input.find((vegkategori) => {
      if(vegkategori.navn == input){
        return vegkategori;
      }
    }))
    this.props.chooseVegkategori(chosenVegkategori);
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

  chooseVeg(input){
    var chosenVeg = [];
    chosenVeg.push(this.props.veg_input.find((veg) => {
      if(veg.navn == input){
        return veg;
      }
    }))
    this.props.chooseVeg(chosenVeg);
  },


  //DEPRACTED, createInputField used, this is kept for safety reasons
  createFylkeInputField(type, list, textType, choosenBool ,editable, inputFunction, chooserFunction){
    var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1.guid != r2.guid});
    var dataSource = ds.cloneWithRows(list);
    return <View>
      <TextInput
        autocorrect= {false}
        autofocus = {editable}
        editable = {editable}
        style={styles.textInput}
        placeholder={type}
        onChangeText={(text) => inputFunction({text})}
        keyboardType = "default"
        returnKeyType = 'done'
        value = {textType}
        />
      <ListView
        dataSource={dataSource}
        enableEmptySections= {true}
        renderRow={(rowData) => {
          if(!choosenBool){
            return <TouchableHighlight
              style= {templates.smallButton}
              underlayColor="azure"
              onPress = {() => chooserFunction(rowData.navn)}
              >
              <Text>{rowData.navn}</Text>
            </TouchableHighlight>
          }
          else {
            return <View></View>
          }
          }}/>
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
  textInput2: {
    padding: 5,
    height: 40,
    color: 'black',
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

    //vegkategori fields
    vegkategori_enabled: state.searchReducer.vegkategori_enabled,
    vegkategori_input: state.searchReducer.vegkategori_input,
    vegkategori_valid: state.searchReducer.vegkategori_valid,
    vegkategori_navn: state.searchReducer.vegkategori_navn,
    vegkategori_text: state.searchReducer.vegkategori_text,
    vegkategori_chosen: state.searchReducer.vegkategori_chosen,

    //veg fields
    veg_enabled: state.searchReducer.veg_enabled,
    veg_input: state.searchReducer.veg_input,
    veg_valid: state.searchReducer.veg_valid,
    veg_navn: state.searchReducer.veg_navn,
    veg_text: state.searchReducer.veg_text,
    veg_chosen: state.searchReducer.veg_chosen,
    fetching_veier: state.searchReducer.fetching_veier,

    combinedSearchParameters: state.searchReducer.combinedSearchParameters,
    numberOfObjectsToBeFetched: state.dataReducer.numberOfObjectsToBeFetched,
  };}

function mapDispatchToProps(dispatch) {
  return {
    //input search variables, uses searchActions to set variables before creatingURL
    inputFylke: bindActionCreators(searchActions.inputFylke, dispatch),
    chooseFylke: bindActionCreators(searchActions.chooseFylke, dispatch),

    inputVegkategori: bindActionCreators(searchActions.inputVegkategori, dispatch),
    chooseVegkategori: bindActionCreators(searchActions.chooseVegkategori, dispatch),

    inputVeg: bindActionCreators(searchActions.inputVeg, dispatch),
    chooseVeg: bindActionCreators(searchActions.chooseVeg, dispatch),

    combineSearchParameters: bindActionCreators(searchActions.combineSearchParameters, dispatch),
    setNumberOfObjectsToBeFetched: bindActionCreators(dataActions.setNumberOfObjectsToBeFetched, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SearchView);
