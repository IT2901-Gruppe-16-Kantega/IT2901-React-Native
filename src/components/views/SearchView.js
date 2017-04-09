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

var Color = require('color');

import Button from '../misc/Button';
import Container from '../misc/Container';
import InputField from '../misc/InputField';
import PropertyValue from '../misc/PropertyValue';
import TabBar from '../misc/TabBar';

import SearchMap from './search/SearchMap';

import {searchForFylke, fetchVegerFromAPI} from '../../utilities/utils';
import {fetchTotalNumberOfObjects, fetchVeg, fetchCloseby, fetchData} from '../../utilities/wrapper'
import {vegobjekttyper} from '../../data/vegobjekttyper';
import * as templates from '../../utilities/templates'
import * as dataActions from '../../actions/dataActions'
import * as searchActions from '../../actions/searchActions'
import * as uiActions from '../../actions/uiActions'
import {fylker} from '../../data/fylker';
import {kommuner} from '../../data/kommuner';

const baseURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/';

const tabs = {
  SEARCH: "Søk",
  MAP: "Finn",
  CLOSEST: "Nærmeste",
}

const alertType = {
  ERROR: "Feil",
  WARNING: "Advarsel",
}

var selectedVegreferanse;

/*
View used when user specifies what data to be fetched from NVDB
*/
var SearchView = React.createClass({
  render() {
    return <Container>
      {this.createViewArea()}
      {this.createButton()}
      <TabBar
        elements={[
          {title: tabs.SEARCH, onPress: ()=>{this.props.setChosenSearchTab(tabs.SEARCH)}, chosen: this.props.chosenSearchTab},
          {title: tabs.MAP, onPress: ()=>{this.props.setChosenSearchTab(tabs.MAP)}, chosen: this.props.chosenSearchTab},
          {title: tabs.CLOSEST, onPress: ()=>{
            this.props.setChosenSearchTab(tabs.CLOSEST)
            this.getUserPosition() // Should be done somewhere else
          }, chosen: this.props.chosenSearchTab},
        ]}
        />
    </Container>
  },

  createViewArea() {
    if (this.props.chosenSearchTab === tabs.SEARCH) {
      return <ScrollView
        style={styles.content}
        scrollEnabled={false}
        keyboardShouldPersistTaps='always'>
        {this.createTypeInput()}
        {this.createFylkeInput()}
        {this.createKommuneInput()}
        {this.createVegInput()}
      </ScrollView>
    }
    else if (this.props.chosenSearchTab === tabs.MAP) {
      return <View style={{ flex: 1 }}>
        <SearchMap validate={this.validate} />
        {this.createTypeInput(this.typeInputStyleForMap())}
      </View>
    }
    else if (this.props.chosenSearchTab === tabs.CLOSEST) {
      return <ScrollView
        style={styles.content}
        scrollEnabled={false}
        keyboardShouldPersistTaps='always'
        >
        {this.createTypeInput()}
        {this.createClosestRoadsList()}
      </ScrollView>
    }
  },

  typeInputStyleForMap() {
    var height;
    if(this.props.vegobjekttyper_chosen) { height = 75 }
    else {
      const MaxHeight = 150;
      const NumberOfTypes = this.props.vegobjekttyper_input.length;
      height = Math.min(NumberOfTypes * 50 + 75, 200)
    }
    return {
      position: 'absolute',
      top: 10,
      left: 10,
      right: 10,
      backgroundColor: Color(this.props.theme.backgroundColor).alpha(0.4),
      borderRadius: 10,
      height: height,
    }
  },

  createClosestRoadsList() {
    var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2})
    var dataSource = ds.cloneWithRows(this.props.closestRoadsList)

    return <View style={styles.content}>
      <Text style={this.props.theme.subtitle}>Nærmeste veger:</Text>
      <ListView
        keyboardShouldPersistTaps='always'
        dataSource={dataSource}
        enableEmptySections={true}
        renderRow={(rowData) => {
            return <Button
              style={this.closestRoadListItemStyle(rowData.vegreferanse.kortform)}
              onPress={() => {
                selectedVegreferanse = rowData.vegreferanse.kortform;
                const chosenRoad = this.props.closestRoadsList.find((data) => {
                  if(data.vegreferanse.kortform === rowData.vegreferanse.kortform) {
                    return data;
                  }
                });

                this.chooseClosestRoad(chosenRoad)
              }}
              text={rowData.vegreferanse.kortform + " (" + rowData.avstand + "m)"}
            />
          }
          }/>
        <View style={{flex: 0.17}}><Text></Text></View>
    </View>
  },

  closestRoadListItemStyle(ref) {
    if(ref === selectedVegreferanse) {
      return "listSelected";
    } else {
      return "list";
    }
  },

  chooseClosestRoad(road) {
    this.props.resetPositionSearchParameters();
    const vegreferanse = road.vegreferanse;
    const fylke = vegreferanse.fylke;
    const kommune = vegreferanse.kommune;
    const kategori = vegreferanse.kategori;
    const status = vegreferanse.status;
    const nummer = vegreferanse.nummer;
    console.log(kategori + "." + status + "." + nummer)
    console.log(road)
    if(kategori == 'K') {
      this.props.inputVeg(kategori + status + nummer)
      this.props.chooseFylke([fylker.find(f => f.nummer === fylke)])
      this.props.chooseKommune([kommuner.find(k => k.nummer === kommune)])   
     }
    else {
      this.props.inputVeg(kategori + status + nummer)
      this.props.chooseFylke([fylker.find(f => f.nummer === fylke)])
    }
    this.validate()
  },


  getUserPosition() {
    navigator.geolocation.getCurrentPosition((initialPosition) => {
      fetchCloseby(10, initialPosition.coords, function(closestList) {
        this.props.inputClosestRoads(closestList);

      }.bind(this));
    }, (error) => alert(error.message), {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  },

  createFylkeInput() {
    return <View>
      <View style={styles.inputArea}>
        <InputField type='fylke'
          list={this.props.fylke_input}
          textType={this.props.fylke_text}
          choosenBool={this.props.fylke_chosen}
          inputFunction={this.props.inputFylke}
          chooserFunction={this.props.chooseFylke}
          colorController={this.props.fylke_color}
          updateFunction={this.validate}
          />
      </View>
    </View>
  },

  createKommuneInput() {
    return <View>
      <View style={styles.inputArea}>
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
      </View>
    </View>
  },

  createTypeInput(style) {
    return <View style={[styles.inputArea, style]}>
      <InputField type='vegobjekttype'
        list={this.props.vegobjekttyper_input}
        textType={this.props.vegobjekttyper_text}
        choosenBool={this.props.vegobjekttyper_chosen}
        inputFunction={this.props.inputVegobjekttyper}
        chooserFunction={this.props.chooseVegobjekttyper}
        colorController={this.props.vegobjekttyper_color}
        updateFunction={this.validate}
        />
    </View>
  },

  createVegInput() {
    return <View style={styles.inputArea}>
      <View style={{
          borderBottomWidth: 2,
          borderBottomColor: this.props.veg_color,
        }}>
        <TextInput
          autocorrect= {false}
          style={{
            padding: 5,
            height: 40,
            color: this.props.theme.primaryTextColor,
          }}
          placeholderTextColor={this.props.theme.placeholderTextColor}
          placeholder={'Skriv inn veg'}
          onChangeText={(text) => {
            this.props.inputVeg(text);
            this.validate();
          }}
          returnKeyType='done'
          value={this.props.veg_input}
          />
      </View>
    </View>
  },

  createButton() {
    var count = this.props.numberOfObjectsToBeFetched || 0;
    return <View style={{ alignItems: 'center', position: 'absolute', left: 0, right: 0, bottom: 50, height: 60 }}>
      <Button text={"Last ned objekter (" + count + ")"} onPress={this.searchButtonPressed} style={"search"} />
    </View>
  },

  validate() {
    // Reset count before finding new number
    this.props.setNumberOfObjectsToBeFetched(0);

    this.forceUpdate(() => {
      var vegobjektStr = '532'
      var fylkeStr = ''
      var kommuneStr = ''
      var vegString = ''
      var isValidatingVeg = false
      if(this.props.vegobjekttyper_chosen) { vegobjektStr = this.props.vegobjekttyper_input[0].id }
      //else { vegobjektStr = '532' }
      if(this.props.fylke_chosen) { fylkeStr = 'fylke=' + this.props.fylke_input[0].nummer + '&' }
      //else { fylkeStr = '' }
      if(this.props.kommune_chosen) { kommuneStr = 'kommune=' + this.props.kommune_input[0].nummer + '&' }
      //else { kommuneStr = '' }
      if(this.props.veg_input != "") {
        isValidatingVeg = true
        vegString = '&vegreferanse=' + this.props.veg_input + '&'}
      else {
        //vegString = ''
        //isVegValidation = false
        this.props.setValidityOfVeg('NOT_CHOSEN')
      }
      var url = baseURL + vegobjektStr + '/statistikk?' + fylkeStr + kommuneStr + vegString;
      console.log(url)
      this.check(url, this.props.vegobjekttyper_chosen, isValidatingVeg)
    })
  },

  check(url, shouldFetchNumber, isValidatingVeg) {
    // Create a new fetching url from getting the number of objects to
    // the actual objects.
    var fetchingURL = url.replace("/statistikk", "")
    fetchingURL += 'inkluder=alle&srid=4326&antall=8000'

    this.props.setURL(fetchingURL)
    fetchData(url).then((response) => {
      if(response.antall === 0) {
        this.props.setValidityOfVeg('NOT_VALID')
      }
      else if(response.antall > 0) {
        if(isValidatingVeg) { this.props.setValidityOfVeg('VALID') }
        if(shouldFetchNumber) { this.props.setNumberOfObjectsToBeFetched(response.antall) }
      }
      else if(response[0].code === 4005) {
        if(isValidatingVeg) { this.props.setValidityOfVeg('NOT_VALID') }
      }
      else {
      }
    })
  },

  searchButtonPressed() {
    this.forceUpdate(() => {
      var numObjects = this.props.numberOfObjectsToBeFetched;
      if(numObjects === 0) {
        Alert.alert(alertType.ERROR, "Dette søket genererer ingen objekter " +
          "(eller så må du vente på at søket fullføres). Det kan også hende at du " +
          "må trykke på et felt på nytt for å oppdatere telleren.");
      }
      else if (!this.props.vegobjekttyper_chosen) {
        Alert.alert(alertType.ERROR, "Ingen vegobjekttyper spesifisert");
      }
      else {
        var vegType = this.props.veg_input.substring(0, 1).toUpperCase();
        if(vegType === 'K') {
          if(this.props.kommune_chosen) {
            this.initiateSearch(numObjects);
          }
          else {
            Alert.alert(alertType.ERROR, "Kommune må spesifiseres når vegtype er kommunalveg")
          }
        }
        else {
          this.initiateSearch();
        }
      }
    })
  },

  initiateSearch() {
    if(this.props.numberOfObjectsToBeFetched >= 8000) {
      Alert.alert(alertType.WARNING,
      'Dette søket vil hente ' + this.props.numberOfObjectsToBeFetched +
      ' vegobjekter og kan ta lang tid. Er du sikker på at du vil utføre søket?',
        [{text: 'Utfør', onPress: this.search}, {text: 'Avbryt'}]
      );
    }
    else { this.search(); }
  },

  search() {
    this.props.combineSearchParameters(this.props.fylke_input[0], this.props.veg_input, this.props.kommune_input[0], this.props.vegobjekttyper_input[0]);
    Actions.LoadingView();
  }
});

var styles = StyleSheet.create({
  content: {
    padding: 10,
  },

  inputArea: {
    padding: 10,
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

    //misc
    closestRoadsList: state.searchReducer.closestRoadsList,
    combinedSearchParameters: state.searchReducer.combinedSearchParameters,
    numberOfObjectsToBeFetched: state.dataReducer.numberOfObjectsToBeFetched,

    //UI
    chosenSearchTab: state.uiReducer.chosenSearchTab,

    theme: state.settingsReducer.themeStyle,
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

      inputClosestRoads: bindActionCreators(searchActions.inputClosestRoads, dispatch),

      setURL: bindActionCreators(searchActions.setURL, dispatch),
      combineSearchParameters: bindActionCreators(searchActions.combineSearchParameters, dispatch),
      setNumberOfObjectsToBeFetched: bindActionCreators(dataActions.setNumberOfObjectsToBeFetched, dispatch),

      setChosenSearchTab: bindActionCreators(uiActions.setChosenSearchTab, dispatch),

      resetPositionSearchParameters: bindActionCreators(searchActions.resetPositionSearchParameters, dispatch),
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps) (SearchView);
