import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ListView,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  Modal,
  ActivityIndicator,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Button from '../misc/Button'
import InputField from '../misc/InputField'
import TabBar from '../misc/TabBar'

import {searchForFylke, fetchVegerFromAPI} from '../../utilities/utils';
import {fetchTotalNumberOfObjects, fetchVeg, fetchCloseby, fetchData} from '../../utilities/wrapper'
import {vegobjekttyper} from '../../data/vegobjekttyper';
import * as templates from '../../utilities/templates'
import * as dataActions from '../../actions/dataActions'
import * as searchActions from '../../actions/searchActions'

const baseURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/';


var valid = true;
const vegobjekttyperMedPunkt = [];

/*
View used when user specifies what data to be fetched from NVDB
*/
var SearchView = React.createClass({
  render() {
    return <View style = {templates.container}>
      <View style={templates.top}/>
      <View style={styles.navigatorSpace}/>
      <View style={styles.header}>
        <Text style={{color: templates.colors.orange, padding: 10}}>NVDB-app</Text>
      </View>
      <View style={styles.inputArea}>
        <ScrollView
          style={{backgroundColor: templates.colors.white}}
          scrollEnabled={false}
          keyboardShouldPersistTaps='always'
          >
          {this.createTypeInput()}
          {this.createFylkeInput()}
          {this.createKommuneInput()}
          {this.createVegInput()}
        </ScrollView>
      </View>
      {this.createStatistics()}
      {this.createButton()}
      <TabBar
        elements={[{title: 'Manuell', onPress: this.tabPress, chosen: true},
          {title: "🗺 Kart", onPress: Actions.RoadSelectView, chosen: false},
          {title: "📍 Nærmeste", onPress: this.getUserPosition, chosen: false},
        ]
        }
        />
    </View>
  },
  tabPress() {
    console.log("asd")
  },

  getUserPosition() {
    navigator.geolocation.getCurrentPosition((initialPosition) => {
      fetchCloseby(initialPosition.coords, function(closest) {
        if(closest.code) {
          alert(closest.message);
        } else {
          const veg = closest.vegreferanse.kategori + closest.vegreferanse.nummer;

          this.props.inputVeg(veg);
          this.props.chooseFylke([closest.fylke]);
        }

      }.bind(this));
    }, (error) => alert(error.message), {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );
},

createFylkeInput(){
  return <View>
    <View style={styles.fylkeArea}>
      <View style={styles.searchLabel}><Text style={styles.text}>Fylke</Text></View>
      <InputField type='fylke'
        list={this.props.fylke_input}
        textType={this.props.fylke_text}
        choosenBool={this.props.fylke_chosen}
        inputFunction={this.props.inputFylke}
        chooserFunction={this.props.chooseFylke}
        colorController={this.props.fylke_color}
        updateFunction={this.validate}
        />
      <View style={styles.parameterRightPadding}><Text></Text></View>
    </View>
    <View style={styles.parameterBottomPadding}><Text></Text></View>
  </View>
},
createKommuneInput(){
  return <View>
    <View style={styles.kommuneArea}>
      <View style={styles.searchLabel}><Text style={styles.text}>Kommune</Text></View>
      <InputField type='kommune'
        list={this.props.kommune_input}
        textType={this.props.kommune_text}
        choosenBool={this.props.kommune_chosen}
        inputFunction={this.props.inputKommune}
        chooserFunction={this.props.chooseKommune}
        colorController={this.props.kommune_color}
        updateFunction={this.validate}
        extData={this.props.fylke_input}
        />
      <View style={styles.parameterRightPadding}><Text></Text></View>
    </View>
    <View style={styles.parameterBottomPadding}><Text></Text></View>
  </View>
},
createTypeInput(){
  return <View>
    <View style={styles.typeArea}>
      <View style={styles.searchLabel}><Text style={styles.text}>Type</Text></View>
      <InputField type='vegobjekttype'
        list={this.props.vegobjekttyper_input}
        textType={this.props.vegobjekttyper_text}
        choosenBool={this.props.vegobjekttyper_chosen}
        inputFunction={this.props.inputVegobjekttyper}
        chooserFunction={this.props.chooseVegobjekttyper}
        colorController={this.props.vegobjekttyper_color}
        updateFunction={this.validate}
        />
      <View style={styles.parameterRightPadding}><Text></Text></View>
    </View>
    <View style={styles.parameterBottomPadding}><Text></Text></View>
  </View>
},
createVegInput() {
  return  <View>
    <View style={styles.vegArea}>
      <View style={styles.searchLabel}><Text style={styles.text}>Veg</Text></View>
      <View style={{
          flex: 4,
          backgroundColor: templates.colors.white,
          borderBottomWidth: 2,
          borderBottomColor: this.props.veg_color,
        }}>
        <TextInput
          autocorrect= {false}
          style={{
            padding: 5,
            height: 40,
            color: templates.colors.darkGray,
            backgroundColor:templates.colors.lightGray
          }}
          placeholderColor={templates.colors.placeholderColor}
          placeholder={'Skriv inn veg'}
          onChangeText={(text) => {
            this.props.inputVeg(text);
            this.validate();

          }}
          keyboardType = "default"
          returnKeyType = 'done'
          />
      </View>
      <View style={styles.parameterRightPadding}><Text></Text></View>
    </View>
    <View style={styles.parameterBottomPadding}><Text></Text></View>
  </View>
},

createStatistics(){
  return <View style={styles.statisticsArea}>
    <Text style={styles.text}>Antall objekter som blir hentet: {this.props.numberOfObjectsToBeFetched}</Text>
  </View>
},

createButton(){
  return <View style={styles.buttonArea}>
    <Button text="Søk" onPress={this.search} style={"small"} />
  </View>
},

validate() {
  this.forceUpdate(() => {
    var vegobjektStr = '532'
    var fylkeStr = ''
    var kommuneStr = ''
    var vegString = ''
    var isValidatingVeg = false
    if(this.props.vegobjekttyper_chosen) {vegobjektStr = this.props.vegobjekttyper_input[0].id}
    else {vegobjektStr = '532'}
    if(this.props.fylke_chosen) {fylkeStr = 'fylke='+this.props.fylke_input[0].nummer+'&'}
    else {fylkeStr = ''}
    if(this.props.kommune_chosen) {kommuneStr = 'kommune='+this.props.kommune_input[0].nummer+'&'}
    else {kommuneStr = ''}
    if(this.props.veg_input != ""){
      isValidatingVeg = true
      vegString = '&vegreferanse='+this.props.veg_input+'&'}
    else {
      vegString = ''
      isVegValidation = false
      this.props.setValidityOfVeg('NOT_CHOSEN')
    }
    var url = baseURL+vegobjektStr+'/statistikk?'+fylkeStr+kommuneStr+vegString
    this.check(url, this.props.vegobjekttyper_chosen, isValidatingVeg)
  })
},

check(url, shouldFetchNumber, isValidatingVeg) {
  var fetchingURL = url.replace("/statistikk", "")
  var fetchingURL = fetchingURL+'inkluder=alle&srid=4326&antall=8000'
  this.props.setURL(fetchingURL)
  fetchData(url).then((response)=>{
    if(response.antall == 0){
      this.props.setValidityOfVeg('NOT_VALID')
    }
    else if(response.antall>0){
      if(isValidatingVeg) {this.props.setValidityOfVeg('VALID')}
      if(shouldFetchNumber) {this.props.setNumberOfObjectsToBeFetched(response.antall)}
    }
    else if(response[0].code==4005){
      if(isValidatingVeg) {this.props.setValidityOfVeg('NOT_VALID')}
    }
    else{
    }
  })
},

search() {
  this.forceUpdate(()=>{
    var numObjects = this.props.numberOfObjectsToBeFetched
    if(numObjects==0){
      Alert.alert("Feil", "Dette søket generer ingen objekter");
    }
    else if (!this.props.vegobjekttyper_chosen){
      Alert.alert("Feil", "Ingen vegobjekttyper spesifisert")
    }
    else{
      var vegType = this.props.veg_input.substring(0,1).toLowerCase();
      if(vegType=='k'){
        if(this.props.kommune_chosen){
          this.initiateSearch(numObjects);
        }
        else{
          Alert.alert("Feil", "Kommune må spesifiseres når vegtype er kommunalveg")
        }
      }
      else{
        this.initiateSearch(numObjects);
      }
    }
  })
},
initiateSearch(numObjects) {
  if(numObjects>7999) {
    Alert.alert("Advarsel!",
    'Dette søket vil hente '+this.props.numberOfObjectsToBeFetched+
    ' vegobjekter og kan ta lang tid. Er du sikker på at du vil utføre søket?',[
      {text: 'Utfør', onPress: () => {
        this.props.combineSearchParameters(this.props.fylke_input[0], this.props.veg_input, this.props.kommune_input[0], this.props.vegobjekttyper_input[0]);
        Actions.LoadingView();
      }},
      {text: 'Avbryt'},
    ]);
  }
  else {
    this.props.combineSearchParameters(this.props.fylke_input[0], this.props.veg_input, this.props.kommune_input[0], this.props.vegobjekttyper_input[0]);
    Actions.LoadingView();
  }
},
});





var styles = StyleSheet.create({

  //Top-leve containers

  navigatorSpace: {
    flex:1.3,
    backgroundColor: templates.colors.white,
  },
  header: {
    flex: 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.white
  },
  inputArea: {
    flex: 13.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },


  //Big components
  kommuneArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.white,
    minHeight:0,
    maxHeight:130,
  },
  fylkeArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  typeArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.white,
    minHeight:0,
    maxHeight:162,
  },
  vegobjekttypeArea2: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: templates.colors.white
  },
  vegArea: {
    flex: 1,
    flexDirection: 'row',
  },
  statisticsArea: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: templates.colors.white,
  },
  buttonArea: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: templates.colors.white
  },
  //small components
  searchLabel: {
    flex: 1,
    padding: 11,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: templates.colors.white,
  },
  parameterBottomPadding: {
    flex: 0.5,
    backgroundColor: templates.colors.white,
  },
  parameterRightPadding: {
    flex: 0.25
  },


  text: {
    color: templates.colors.darkGray,
  },
})

function mapStateToProps(state) {
  return {
    //fylke fields
    fylke_input: state.searchReducer.fylke_input,
    fylke_text: state.searchReducer.fylke_text,
    fylke_chosen: state.searchReducer.fylke_chosen,
    fylke_color: state.searchReducer.fylke_color,

    //veg fields
    veg_input: state.searchReducer.veg_input,
    veg_color: state.searchReducer.veg_color,
    veg_valid: state.searchReducer.veg_valid,

    //kommune
    kommune_input: state.searchReducer.kommune_input,
    kommune_text: state.searchReducer.kommune_text,
    kommune_chosen: state.searchReducer.kommune_chosen,
    kommune_color: state.searchReducer.kommune_color,

    //vegobjekttyper fields
    vegobjekttyper_input: state.searchReducer.vegobjekttyper_input,
    vegobjekttyper_text: state.searchReducer.vegobjekttyper_text,
    vegobjekttyper_chosen: state.searchReducer.vegobjekttyper_chosen,
    vegobjekttyper_color: state.searchReducer.vegobjekttyper_color,

    combinedSearchParameters: state.searchReducer.combinedSearchParameters,
    numberOfObjectsToBeFetched: state.dataReducer.numberOfObjectsToBeFetched,

  };}

  function mapDispatchToProps(dispatch) {
    return {
      //input search variables, uses searchActions to set variables before creatingURL
      inputFylke: bindActionCreators(searchActions.inputFylke, dispatch),
      chooseFylke: bindActionCreators(searchActions.chooseFylke, dispatch),

      inputVeg: bindActionCreators(searchActions.inputVeg, dispatch),
      setValidityOfVeg: bindActionCreators(searchActions.setValidityOfVeg, dispatch),
      resetVegField: bindActionCreators(searchActions.resetVegField, dispatch),

      inputKommune: bindActionCreators(searchActions.inputKommune, dispatch),
      chooseKommune: bindActionCreators(searchActions.chooseKommune, dispatch),

      inputVegobjekttyper: bindActionCreators(searchActions.inputVegobjekttyper, dispatch),
      chooseVegobjekttyper: bindActionCreators(searchActions.chooseVegobjekttyper, dispatch),

      setURL: bindActionCreators(searchActions.setURL, dispatch),
      combineSearchParameters: bindActionCreators(searchActions.combineSearchParameters, dispatch),
      setNumberOfObjectsToBeFetched: bindActionCreators(dataActions.setNumberOfObjectsToBeFetched, dispatch),

    }
  }

  export default connect(mapStateToProps, mapDispatchToProps) (SearchView);
