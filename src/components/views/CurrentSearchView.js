import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Linking,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Share
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import RNFS from 'react-native-fs'

import Button from '../misc/Button'
import Container from '../misc/Container'
import PropertyValue from '../misc/PropertyValue'

import {parseGeometry, AR} from '../../utilities/utils'
import * as templates from '../../utilities/templates'
import * as dataActions from '../../actions/dataActions'
import * as mapActions from '../../actions/mapActions'

/*
Shows information about current search, buttons for viewing map and opening AR
*/
class CurrentSearchView extends React.Component {
  componentDidMount() {
    this.props.resetFetching();
    if(this.props.currentRoadSearch) {
      this.props.setDescription(this.props.currentRoadSearch.description)
    }
  }

  render() {
    if(!this.props.currentRoadSearch) {
      return (
        <Container>
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={this.props.theme.title}>Ingen/feil søk spesifisert.</Text>
          </View>
        </Container>
      );
    }

    return <Container>
      {this.createInfoView()}
      <View style={styles.buttonArea}>{this.createButtons()}</View>
    </Container>
  }

  createInfoView() {
    const {currentRoadSearch} = this.props;
    const {vegobjekttype, kommune, fylke, veg} = currentRoadSearch.searchParameters;

    const kommuneValue = kommune ? kommune.navn : "Ikke spesifisert";
    const fylkeValue = fylke ? fylke.navn : "Ikke spesifisert";
    const vegValue = veg ? veg : "Ikke spesifisert";

    return (
      <View style={{flex: 2, padding: 20 }}>
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
          <View style={styles.informationArea}>
            <View style={styles.info}>
              <Button type={"small"} text={"Del dette søket"} onPress={() => this.shareString()} />
              <TouchableHighlight
                onPress={this.shareString.bind(this, currentRoadSearch.key)}>
                <View><PropertyValue property={"Søke-ID"} value={currentRoadSearch.key} /></View>
              </TouchableHighlight>
              <PropertyValue property={"Vegobjekttype"} value={currentRoadSearch.searchParameters.vegobjekttype.navn} />
              <PropertyValue property={"Antall vegobjekter"} value={currentRoadSearch.roadObjects.length} />
              <PropertyValue property={"Fylke"} value={fylkeValue} />
              <PropertyValue property={"Kommune"} value={kommuneValue} />
              <PropertyValue property={"Veg"} value={vegValue} />
              {this.createDescriptionArea()}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  shareString(value) {
    var message;
    if(!value) {
      //vegar.kart://vegobjekter/<type>?fylke=16&kommune=1601&vegreferanse=K5040
      const params = this.props.currentRoadSearch.searchParameters;
      message = 'vegar.kart://vegobjekter/' + params.vegobjekttype.id + '?';

      if(params.fylke) message += "fylke=" + params.fylke.nummer + "&"
      if(params.kommune) message += "kommune=" + params.kommune.nummer + "&"
      if(params.veg) message += "vegreferanse=" + params.veg + "&"
    } else message = value + "";

    Share.share({ message })
  }

  createDescriptionArea() {
    const {theme, description} = this.props;
    const placeholder = description || "Skriv inn en beskrivelse eller et notat"
    return  <View style={styles.descriptionArea}>
      <Text style={theme.subtitle}>Beskrivelse/notater</Text>
      <TextInput
        underlineColorAndroid={templates.colors.lightGray}
        autocorrect={false}
        style={{
          flex: 1,
          padding: 5,
          fontSize: 15,
          color: theme.secondaryTextColor,
          backgroundColor: theme.color,
        }}
        multiline={true}
        placeholderTextColor={theme.placeholderTextColor}
        placeholder={placeholder}
        onChangeText={text => this.props.setDescription(text)}
        keyboardType="default"
        value={description}
        onEndEditing={this.saveDescription.bind(this)}
        />
    </View>
  }

  saveDescription() {
    this.props.currentRoadSearch.description = this.props.description;
    this.props.searchSaved(this.props.currentRoadSearch);
  }

  createButtons() {
    const objektNavn = this.props.currentRoadSearch.searchParameters.vegobjekttype.navn;

    return (
      <View>
        <View style={styles.topButtons}>
          <Button text="Kart" type={"half"} onPress={() => Actions.RoadMapView({title: objektNavn})} />
          <Button text="AR" type={"half"} onPress={this.openAR.bind(this)} />
        </View>
        <View style={styles.bottomButtons}>
          <Button text="Rapport" type={"half"} onPress={Actions.ReportView} />
          <Button text="Tilbake" type={"half"} onPress={this.goBack.bind(this)} />
        </View>
      </View>
    );
  }

  goBack() {
    // If from StoredDataView, pop, else go to StartingView (if from search)
    if(Actions.pop()) {
      Actions.pop();
    } else {
      Actions.StartingView();
    }
  }

  openAR() {
    AR(Platform.OS, this.props.currentRoadSearch, url => {
      if(url) {
        Linking.canOpenURL(url).then(supported => {
          if(supported) Linking.openURL(url)
          else alert("AR-applikasjon ikke installert.")
        })
      }
    });
  }
}

var styles = StyleSheet.create({
  informationArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  info: {
    flex: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  descriptionArea: {
    marginTop: 20,
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',

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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //dataActions
    resetFetching: bindActionCreators(dataActions.resetFetching, dispatch),
    setRegion: bindActionCreators(mapActions.setRegion, dispatch),
    searchSaved: bindActionCreators(dataActions.searchSaved, dispatch),
    setDescription: bindActionCreators(dataActions.setDescription, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (CurrentSearchView);
