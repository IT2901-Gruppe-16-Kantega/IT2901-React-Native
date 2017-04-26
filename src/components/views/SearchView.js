import React from 'react';
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
import LocationInputComponent from '../misc/LocationInputComponent';
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
  MAP: "Kart",
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
class SearchView extends React.Component {
  render() {
    return (
      <Container>
        {this.renderMainContent()}
        {this.renderDownloadButton()}
        <TabBar
          tabs={[
            {title: tabs.SEARCH, onPress: ()=>{this.props.setChosenSearchTab(tabs.SEARCH)}},
            {title: tabs.MAP, onPress: ()=>{this.props.setChosenSearchTab(tabs.MAP)}},
            {title: tabs.CLOSEST, onPress: ()=>{
              this.props.setChosenSearchTab(tabs.CLOSEST)
              this.getUserPosition() // Should be done somewhere else
            }},
          ]}
          />
      </Container>
    );
  }

  renderMainContent() {
    if (this.props.chosenSearchTab === tabs.SEARCH) {
      return (
        <ScrollView
          style={styles.content}
          scrollEnabled={true}
          keyboardShouldPersistTaps='always'>
          {this.renderTypeInput()}
          <LocationInputComponent withVeg validate={this.validate.bind(this)} />
        </ScrollView>
      );
    }
    else if (this.props.chosenSearchTab === tabs.MAP) {
      return (
        <View style={{ flex: 1 }}>
          <SearchMap validate={this.validate.bind(this)} />
          {this.renderTypeInput(this.typeInputStyleForMap())}
        </View>
      );
    }
    else if (this.props.chosenSearchTab === tabs.CLOSEST) {
      return (
        <ScrollView
          style={styles.content}
          scrollEnabled={false}
          keyboardShouldPersistTaps='always'
          >
          {this.renderTypeInput()}
          {this.renderClosestRoadsList()}
        </ScrollView>
      );
    }
  }

  renderTypeInput(style) {
    return (
      <View style={[styles.inputArea, style]}>
        <InputField type='vegobjekttype'
          list={this.props.vegobjekttyperInput}
          textType={this.props.vegobjekttyperText}
          choosen={this.props.vegobjekttyperChosen}
          inputFunction={this.props.inputVegobjekttyper}
          chooserFunction={this.props.chooseVegobjekttyper}
          colorController={this.props.vegobjekttyperColor}
          updateFunction={this.validate.bind(this)}
          />
      </View>
    );
  }

  renderDownloadButton() {
    const count = this.props.numberOfObjectsToBeFetched || 0;
    const buttonText = "Last ned objekter (" + count + ")";
    return (
      <View style={styles.downloadButtonContainer}>
        <Button text={buttonText} onPress={this.searchButtonPressed.bind(this)} type={"search"} />
      </View>
    );
  }

  renderClosestRoadsList() {
    var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2})

    return (
      <View style={styles.content}>
        <Text style={this.props.theme.subtitle}>Nærmeste veger:</Text>
        <ListView
          keyboardShouldPersistTaps='always'
          dataSource={ds.cloneWithRows(this.props.closestRoadsList)}
          enableEmptySections={true}
          renderRow={(rowData) => {
              const {kortform} = rowData.vegreferanse;
              return <Button
                type={kortform === selectedVegreferanse ? "listSelected" : "list"}
                onPress={() => {
                  selectedVegreferanse = kortform;
                  this.chooseClosestRoad(rowData);
                }}
                text={kortform + " (" + rowData.avstand + "m)"}
              />
            }}/>
      </View>
    );
  }

  chooseClosestRoad(road) {
    this.props.resetPositionSearchParameters();

    const vegreferanse = road.vegreferanse;
    const {fylke, kommune, kategori, status, nummer} = vegreferanse;

    if(kategori === 'K') {
      this.props.inputVeg(kategori + status + nummer)
      this.props.chooseFylke(fylke)
      this.props.chooseKommune(kommune)
     }
    else {
      this.props.inputVeg(kategori + status + nummer)
      this.props.chooseFylke(fylke)
    }
    this.validate()
  }

  getUserPosition() {
    navigator.geolocation.getCurrentPosition((initialPosition) => {
      fetchCloseby(10, initialPosition.coords, function(closestList) {
        this.props.inputClosestRoads(closestList);

      }.bind(this));
    }, (error) => alert(error.message), {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  typeInputStyleForMap() {
    var height;
    if(this.props.vegobjekttyperChosen) { height = 75 }
    else {
      const MaxHeight = 150;
      const NumberOfTypes = this.props.vegobjekttyperInput.length;
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
  }

  validate() {
    // Reset count before finding new number
    this.props.setNumberOfObjectsToBeFetched(0);

    this.forceUpdate(() => {
      var vegobjektStr = '532'
      var fylkeStr = ''
      var kommuneStr = ''
      var vegString = ''
      var isValidatingVeg = false
      if(this.props.vegobjekttyperChosen) { vegobjektStr = this.props.vegobjekttyperInput[0].id }
      if(this.props.fylkeChosen) { fylkeStr = 'fylke=' + this.props.fylkeInput[0].nummer + '&' }
      if(this.props.kommuneChosen) { kommuneStr = 'kommune=' + this.props.kommuneInput[0].nummer + '&' }
      if(this.props.vegInput !== "") {
        isValidatingVeg = true
        vegString = '&vegreferanse=' + this.props.vegInput + '&'}
      else {
        this.props.setValidityOfVeg('NOT_CHOSEN')
      }
      var url = baseURL + vegobjektStr + '/statistikk?' + fylkeStr + kommuneStr + vegString;
      this.check(url, this.props.vegobjekttyperChosen, isValidatingVeg)
    })
    /*setTimeout(() => {
      this.props.generateURL();
    }, 10);*/
  }

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
    })
  }

  searchButtonPressed() {
    this.forceUpdate(() => {
      var numObjects = this.props.numberOfObjectsToBeFetched;
      if(numObjects === 0) {
        Alert.alert(alertType.ERROR, "Dette søket genererer ingen objekter " +
          "(eller så må du vente på at søket fullføres). Det kan også hende at du " +
          "må trykke på et felt på nytt for å oppdatere telleren.");
      }
      else if (!this.props.vegobjekttyperChosen) {
        Alert.alert(alertType.ERROR, "Ingen vegobjekttyper spesifisert");
      }
      else {
        var vegType = this.props.vegInput.substring(0, 1).toUpperCase();
        if(vegType === 'K') {
          if(this.props.kommuneChosen) {
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
  }

  initiateSearch() {
    if(this.props.numberOfObjectsToBeFetched >= 8000) {
      Alert.alert(alertType.WARNING,
      'Dette søket vil hente ' + this.props.numberOfObjectsToBeFetched +
      ' vegobjekter og kan ta lang tid. Er du sikker på at du vil utføre søket?',
        [{text: 'Utfør', onPress: this.search.bind(this)}, {text: 'Avbryt'}]
      );
    }
    else { this.search(); }
  }

  search() {
    const {fylkeInput, vegInput, kommuneInput, vegobjekttyperInput} = this.props;
    this.props.combineSearchParameters(
      fylkeInput ? fylkeInput[0] : null, vegInput, kommuneInput ? kommuneInput[0] : null, vegobjekttyperInput ? vegobjekttyperInput[0] : null);
    Actions.LoadingView();
  }
}

var styles = StyleSheet.create({
  content: {
    padding: 10,
  },
  downloadButtonContainer: {
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 50,
    height: 60,
  }
})

function mapStateToProps(state) {
  return {
    fylkeInput: state.searchReducer.fylkeInput,
    fylkeChosen: state.searchReducer.fylkeChosen,

    kommuneInput: state.searchReducer.kommuneInput,
    kommuneChosen: state.searchReducer.kommuneChosen,

    vegInput: state.searchReducer.vegInput,

    //vegobjekttyper fields
    vegobjekttyperInput: state.searchReducer.vegobjekttyperInput,
    vegobjekttyperText: state.searchReducer.vegobjekttyperText,
    vegobjekttyperChosen: state.searchReducer.vegobjekttyperChosen,
    vegobjekttyperColor: state.searchReducer.vegobjekttyperColor,

    //misc
    closestRoadsList: state.searchReducer.closestRoadsList,
    combinedSearchParameters: state.searchReducer.combinedSearchParameters,
    numberOfObjectsToBeFetched: state.dataReducer.numberOfObjectsToBeFetched,

    //UI
    chosenSearchTab: state.uiReducer.chosenSearchTab,

    theme: state.settingsReducer.themeStyle,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //input search variables, uses searchActions to set variables before creatingURL
    chooseFylke: bindActionCreators(searchActions.chooseFylke, dispatch),

    inputVeg: bindActionCreators(searchActions.inputVeg, dispatch),
    setValidityOfVeg: bindActionCreators(searchActions.setValidityOfVeg, dispatch),

    chooseKommune: bindActionCreators(searchActions.chooseKommune, dispatch),

    inputVegobjekttyper: bindActionCreators(searchActions.inputVegobjekttyper, dispatch),
    chooseVegobjekttyper: bindActionCreators(searchActions.chooseVegobjekttyper, dispatch),

    inputClosestRoads: bindActionCreators(searchActions.inputClosestRoads, dispatch),

    setURL: bindActionCreators(searchActions.setURL, dispatch),
    generateURL: bindActionCreators(searchActions.generateURL, dispatch),

    combineSearchParameters: bindActionCreators(searchActions.combineSearchParameters, dispatch),
    setNumberOfObjectsToBeFetched: bindActionCreators(dataActions.setNumberOfObjectsToBeFetched, dispatch),

    setChosenSearchTab: bindActionCreators(uiActions.setChosenSearchTab, dispatch),

    resetPositionSearchParameters: bindActionCreators(searchActions.resetPositionSearchParameters, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SearchView);
