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
var baseURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/';


var valid = true;
const vegobjekttyperMedPunkt = [];
import {vegobjekttyper} from '../data/vegobjekttyper';



var SearchView = React.createClass({
  componentDidMount() {
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
        <View style={styles.contentsArea}>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.contents}>
              <View style={styles.searchTypeHeading}><Text style={styles.text}>Hvor?</Text></View>
              <View style={styles.searchParameterContainer}>
                <View style={styles.searchLabel}><Text style={styles.text}>Fylke</Text></View>
                {this.createInputField(
                  'fylke',
                  this.props.fylke_input,
                  this.props.fylke_text,
                  this.props.fylke_chosen,
                  true,
                  this.props.inputFylke,
                  this.chooseFylke
                )}
                <View style={styles.parameterRightPadding}><Text></Text></View>
              </View>
              <View style={styles.parameterBottomPadding}><Text></Text></View>

              <View style={styles.searchParameterContainer}>
                <View style={styles.searchLabel}><Text style={styles.text}>Veg</Text></View>
                {this.createVegInput()}
                <View style={styles.parameterRightPadding}><Text></Text></View>
              </View>
              <View style={styles.parameterBottomPadding}><Text></Text></View>

              <View style={styles.searchParameterContainer}>
                <View style={styles.searchLabel}><Text style={styles.text}>Kommune</Text></View>
              </View>
              <View style={styles.parameterPadding}><Text></Text></View>
            </View>


            <View style={styles.hvaContents}>
              <View style={styles.searchTypeHeading}><Text style={styles.text}>Hva?</Text></View>
              <View style={styles.searchParameterContainer}>
                <View style={styles.searchLabel}><Text style={styles.text}>Type</Text></View>
                {this.createInputField(
                  'vegobjekttype',
                  this.props.vegobjekttyper_input,
                  this.props.vegobjekttyper_text,
                  this.props.vegobjekttyper_chosen,
                  true,
                  this.props.inputVegobjekttyper,
                  this.chooseVegobjekttyper
                )}
                <View style={styles.parameterRightPadding}><Text></Text></View>
              </View>
              <View style={styles.parameterBottomPadding}><Text></Text></View>
              {this.createObjekttyperList()}

            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.parameterBottomPadding}><Text></Text></View>

      {this.createNumerOfObjectsToBeFetcher()}

      <View style={styles.buttonArea}>
        {this.createSearchButton()}
      </View>
      <View style={templates.footer}>
        <Text style={{color: templates.gray}}>Gruppe 16 NTNU</Text>
      </View>
    </View>
  },

  createVegobjekttyperInputField(type, list, textType, choosenBool ,editable, inputFunction, chooserFunction, multiInputEnabled){
    var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(list);
    var color = 'darkgray';
    if(editable==true){
      color = 'green';
    };

    return <View style={styles.inputContainer}>
      <TextInput
        autocorrect= {false}
        autofocus = {editable}
        editable = {editable}
        style={styles.textInput}
        placeholder={'Skriv inn '+type}
        onChangeText={(text) => inputFunction({text})}
        keyboardType = "default"
        returnKeyType = 'done'
        value = {textType}
        />
      <ListView
        style={styles.listViewStyle}
        dataSource={dataSource}
        enableEmptySections= {true}
        renderRow={(rowData) => {
          if(!choosenBool){
            return <TouchableHighlight
              style= {styles.listItem}
              underlayColor="azure"
              onPress = {() => chooserFunction(rowData.navn)}
              >
              <Text style={styles.listItemText}>{rowData.navn}</Text>
            </TouchableHighlight>
          }
          else {
            return <View></View>
          }
          }}/>
    </View>
  },
  chooseVegobjekttyper (input){
    var chosenVegobjekttyper = [];
    chosenVegobjekttyper.push(this.props.vegobjekttyper_input.find((vegobjekttype) => {
      if(vegobjekttype.navn == input){
        return vegobjekttype;
      }
    }))
    this.props.chooseVegobjekttyper(chosenVegobjekttyper);
  },
  createObjekttyperList(){
    return <View style={styles.chosenObjekttyper}>
    </View>
  },

  //Slå sammen med den generelle etter at den er ferdig
  createInputField(type, list, textType, choosenBool ,editable, inputFunction, chooserFunction, multiInputEnabled){
    var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(list);
    var color = 'darkgray';
    if(editable==true){
      color = 'green';
    };

    return <View style={styles.inputContainer}>
      <TextInput
        autocorrect= {false}
        autofocus = {editable}
        editable = {editable}
        style={styles.textInput}
        placeholder={'Skriv inn '+type}
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
              style= {styles.listItem}
              underlayColor="azure"
              onPress = {() => chooserFunction(rowData.navn)}
              >
              <Text style={styles.listItemText}>{rowData.navn}</Text>
            </TouchableHighlight>
          }
          else {
            return <View></View>
          }
          }}/>
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
  createVegInput(){
    return <View style={styles.inputContainer}>
      <TextInput
        autocorrect= {false}
        style={styles.textInput}
        placeholder={'Skriv inn veg. Type+nummer(R136)'}
        onChangeText={(text) => this.props.newInputVeg({text})}
        keyboardType = "default"
        returnKeyType = 'done'
        />
    </View>
  },


  search() {
      if(this.props.fylke_chosen&&this.props.vegobjekttyper_chosen){
        const objektID = this.props.vegobjekttyper_input[0].id;
        const fylkeID = this.props.fylke_input[0].nummer;
        const veg = this.props.new_veg_input.text;
        var preurl = baseURL+objektID+'/statistikk?fylke='+fylkeID+'&vegreferanse='+veg;
        var url = baseURL+objektID+'?fylke='+fylkeID+'&vegreferanse='+veg+'&inkluder=alle&srid=4326&antall=8000';

        fetchTotalNumberOfObjects(preurl).then(function(response){
          if(response.antall==undefined){
            Alert.alert("Ugyldig veg", "Sjekk at veien du har skrevet inn eksiterer og at format er vegkategori+vegnummer (E6 f.eks)");
          }
          else{
            this.props.setURL(url);
            this.props.combineSearchParameters(this.props.fylke_input[0], this.props.new_veg_input, this.props.vegobjekttyper_input[0]);

            Actions.loadingView();
          }
        }.bind(this));

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


  //TODO
  //fungerer nå, men bør gjøre håndtering av manglende input bedre
  createNumerOfObjectsToBeFetcher(){
    if(this.props.fylke_chosen&&this.props.vegobjekttyper_chosen){
      const objektID = this.props.vegobjekttyper_input[0].id;
      const fylkeID = this.props.fylke_input[0].nummer;
      const veg = this.props.new_veg_input.text;
      var preurl = baseURL+objektID+'/statistikk?fylke='+fylkeID+'&vegreferanse='+veg;
      var numberOfObjectsToBeFetched = 0;
      fetchTotalNumberOfObjects(preurl).then(function(response){
        numberOfObjectsToBeFetched = response.antall;
        this.props.setNumberOfObjectsToBeFetched(numberOfObjectsToBeFetched);
      }.bind(this));
      return <View style={styles.numberOfObjectsToBeFetched}>
        <Text style={styles.text}>Antall objekter som blir hentet: {this.props.numberOfObjectsToBeFetched}</Text>
      </View>
    }
    else{
      return <View style={styles.numberOfObjectsToBeFetched}>
        <Text style={styles.text}>Antall objekter som blir hentet: ikke nok data!</Text>
      </View>
    }
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

  contentsArea: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  scrollContainer: {
    backgroundColor: templates.grey,
  },
  contents: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'darkgray',
    backgroundColor: templates.grey,
  },
  hvaContents: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.grey,
  },
  searchTypeHeading: {
    flex: 2,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listViewStyle: {
    flex:1,
  },
  searchParameterContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  searchLabel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.grey,
  },
  inputContainer: {
    flex: 4,
    backgroundColor: 'darkgray'

  },
  parameterBottomPadding: {
    flex: 0.5,
    backgroundColor: templates.grey,
  },
  parameterRightPadding: {
    flex: 0.25
  },
  chosenObjekttyper: {
    flex: 1,
    backgroundColor: 'red',
  },

  numberOfObjectsToBeFetched: {
    flex: 1,
    backgroundColor: templates.grey,
  },
  //components
  listItem: {
    borderWidth: 0.5,
    padding: 2,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'lightgray',
  },
  listItemText: {
    color: 'white',
  },
  textInput: {
    padding: 5,
    height: 40,
    color: 'white',
    borderWidth: 2,
    borderColor: 'lightgray',
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

    //veg fields
    new_veg_input: state.searchReducer.new_veg_input,

    //kommune fields

    //vegobjekttyper fields
    vegobjekttyper_input: state.searchReducer.vegobjekttyper_input,
    vegobjekttyper_valid: state.searchReducer.vegobjekttyper_valid,
    vegobjekttyper_navn: state.searchReducer.vegobjekttyper_navn,
    vegobjekttyper_text: state.searchReducer.vegobjekttyper_text,
    vegobjekttyper_chosen: state.searchReducer.vegobjekttyper_chosen,
    //kommune fields



    combinedSearchParameters: state.searchReducer.combinedSearchParameters,
    numberOfObjectsToBeFetched: state.dataReducer.numberOfObjectsToBeFetched,
  };}

function mapDispatchToProps(dispatch) {
  return {
    //input search variables, uses searchActions to set variables before creatingURL
    inputFylke: bindActionCreators(searchActions.inputFylke, dispatch),
    chooseFylke: bindActionCreators(searchActions.chooseFylke, dispatch),

    newInputVeg: bindActionCreators(searchActions.newInputVeg, dispatch),

    inputVegobjekttyper: bindActionCreators(searchActions.inputVegobjekttyper, dispatch),
    chooseVegobjekttyper: bindActionCreators(searchActions.chooseVegobjekttyper, dispatch),

    setURL: bindActionCreators(searchActions.setURL, dispatch),
    combineSearchParameters: bindActionCreators(searchActions.combineSearchParameters, dispatch),
    setNumberOfObjectsToBeFetched: bindActionCreators(dataActions.setNumberOfObjectsToBeFetched, dispatch),

    //TO be DEPRECATED
    inputVegkategori: bindActionCreators(searchActions.inputVegkategori, dispatch),
    chooseVegkategori: bindActionCreators(searchActions.chooseVegkategori, dispatch),

    inputVeg: bindActionCreators(searchActions.inputVeg, dispatch),
    chooseVeg: bindActionCreators(searchActions.chooseVeg, dispatch),


  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SearchView);
