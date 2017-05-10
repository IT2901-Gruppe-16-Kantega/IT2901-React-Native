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
  NetInfo
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

var Color = require('color');

import Button from '../misc/Button';
import Container from '../misc/Container';
import InputField from '../misc/InputField';
import LocationInputComponent from '../misc/LocationInputComponent';
import PropertyValue from '../misc/PropertyValue';
import TabBar from '../misc/TabBar';

import SearchMap from './search/SearchMap';

import {searchForFylke} from '../../utilities/searchUtils';
import {parseGeometry, getCurrentPosition, isAndroid} from '../../utilities/utils';
import {fetchCloseby, fetchData, getNumberOfObjects} from '../../utilities/wrapper'
import {vegobjekttyper} from '../../data/vegobjekttyper';
import * as templates from '../../utilities/templates'
import * as dataActions from '../../actions/dataActions'
import * as mapActions from '../../actions/mapActions'
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
  componentDidMount() {
    this.getUserPosition();
  }

  render() {
    return (
      <Container>
        {this.renderMainContent()}
        {this.renderDownloadButton()}
        <TabBar
          tabs={[
            {title: tabs.SEARCH, onPress: () => this.props.setChosenSearchTab(tabs.SEARCH)},
            {title: tabs.MAP, onPress: () => this.props.setChosenSearchTab(tabs.MAP)},
            {title: tabs.CLOSEST, onPress: () => {
              // If user retaps same tab, then force user position refresh
              if(this.props.chosenSearchTab === tabs.CLOSEST) {
                this.getUserPosition(true);
              } else {
                this.props.setChosenSearchTab(tabs.CLOSEST);
              }
            }}
          ]}
          />
      </Container>
    );
  }

  componentDidMount() {
    // Add netinfo listener on mount
    NetInfo.isConnected.addEventListener('change', this.handleConnectionChange);

    if(isAndroid()) {
      NetInfo.isConnected.fetch().then(isConnected => {
        this.handleConnectionChange(isConnected);
      });
    }
  }

  componentWillUnmount() {
    // Remove netinfo listener on unmount
    NetInfo.isConnected.removeEventListener('change', this.handleConnectionChange);
  }

  handleConnectionChange(isConnected) {
    // Error message if no internet connectivity
    if (!isConnected) {
      Alert.alert(
        alertType.WARNING,
        'Du ser ikke ut til å være tilkoblet internett.',
        [{text: 'Tilbake', onPress: () => {Actions.pop()}}],
        { cancelable: false }
      )
    }
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
          chosen={this.props.vegobjekttyperChosen}
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
    console.log(road)

    const vegreferanse = road.vegreferanse;
    const {fylke, kommune, kategori, status, nummer} = vegreferanse;
    this.props.selectSearchCoordinate(parseGeometry(road.geometri.wkt)[0]);

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

  getUserPosition(force) {
    const {currentUserPosition} = this.props;

    if(!currentUserPosition || force) {
      console.log("getting position")
      getCurrentPosition(position => {
        this.fetchRoads(position.coords);
        this.props.setCurrentUserPosition(position);
      });
    }
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
      right: 70,
      backgroundColor: Color(this.props.theme.color).alpha(0.5),
      borderRadius: 10,
      height: height,
    }
  }

  validate() {
    if(!this.props.vegobjekttyperChosen) return

    // Reset count before finding new number
    this.props.setNumberOfObjectsToBeFetched(0);
    this.props.generateURL();

    setTimeout(() => {
      getNumberOfObjects(this.props.statisticsURL, number => {
        if(number === 0) this.props.setValidityOfVeg('NOT_VALID');
        else {
          if(this.props.vegInput) this.props.setValidityOfVeg('VALID')
          if(this.props.vegobjekttyperChosen) this.props.setNumberOfObjectsToBeFetched(number)
        }
      });
    }, 5);
  }

  searchButtonPressed() {
    this.forceUpdate(() => {
      var numObjects = this.props.numberOfObjectsToBeFetched;
      if(!this.props.vegobjekttyperChosen) {
        Alert.alert(alertType.ERROR, "Du må velge vegobjekttype før du starter søket.");
      }
      else if(numObjects === 0) {
        Alert.alert(alertType.ERROR, "Dette søket genererer ingen objekter " +
          "(eller så må du vente på at søket fullføres). Det kan også hende at du " +
          "må trykke på et felt på nytt for å oppdatere telleren.");
      }
      else if(!this.props.vegobjekttyperChosen) {
        Alert.alert(alertType.ERROR, "Ingen vegobjekttyper spesifisert");
      }
      else {
        var vegType = this.props.vegInput.substring(0, 1).toUpperCase();
        if(vegType === 'K') {
          if(this.props.kommuneChosen) {
            this.initiateSearch(numObjects);
          }
          else {
            Alert.alert(alertType.ERROR, "Kommune må spesifiseres når vegtype er kommunalveg.")
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
    this.props.combineSearchParameters({
      fylke: fylkeInput ? fylkeInput[0] : null,
      veg: vegInput,
      kommune: kommuneInput ? kommuneInput[0] : null,
      vegobjekttype: vegobjekttyperInput ? vegobjekttyperInput[0] : null,
    });
    Actions.LoadingView();
  }
}

var styles = StyleSheet.create({
  content: {
    padding: 10,
    marginBottom: 110,
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

    statisticsURL: state.searchReducer.statisticsURL,
    url: state.searchReducer.url,

    //misc
    closestRoadsList: state.searchReducer.closestRoadsList,
    combinedSearchParameters: state.searchReducer.combinedSearchParameters,
    numberOfObjectsToBeFetched: state.dataReducer.numberOfObjectsToBeFetched,

    //UI
    chosenSearchTab: state.uiReducer.chosenSearchTab,

    theme: state.settingsReducer.themeStyle,

    currentUserPosition: state.mapReducer.currentUserPosition,
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
    selectSearchCoordinate: bindActionCreators(searchActions.selectSearchCoordinate, dispatch),

    setURL: bindActionCreators(searchActions.setURL, dispatch),
    generateURL: bindActionCreators(searchActions.generateURL, dispatch),

    combineSearchParameters: bindActionCreators(searchActions.combineSearchParameters, dispatch),
    setNumberOfObjectsToBeFetched: bindActionCreators(dataActions.setNumberOfObjectsToBeFetched, dispatch),

    setChosenSearchTab: bindActionCreators(uiActions.setChosenSearchTab, dispatch),

    resetPositionSearchParameters: bindActionCreators(searchActions.resetPositionSearchParameters, dispatch),

    setCurrentUserPosition: bindActionCreators(mapActions.setCurrentUserPosition, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SearchView);
