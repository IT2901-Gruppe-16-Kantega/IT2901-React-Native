import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Picker,
} from 'react-native';


import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PropertyValue from './PropertyValue';
import Button from '../misc/Button'

import * as templates from '../../utilities/templates';
import * as mapActions from '../../actions/mapActions'
import * as dataActions from '../../actions/dataActions'
import * as reportActions from '../../actions/reportActions'

/*
The callout shown when the user taps a pin on the map view.
*/
class MarkerCallout extends React.Component {
  static propTypes = {
    roadObject: PropTypes.object.isRequired,
  }

  render() {
    var {roadObject} = this.props;
    return (
      <View style={{flex: 1}}>
        <Text style={styles.title}>{roadObject.metadata.type.navn}</Text>
        {this.getEgenskapInfo()}
        <Button key={roadObject.id} text={roadObject.id + ""} type="medium" onPress={this.openObjectInformation.bind(this, roadObject)} />
        {this.renderSiblings()}
      </View>
    );
  }

  renderSiblings() {
    const {roadObject} = this.props;

    // The roadObject that belongs to the callout has no parents,
    // and therefore no siblings
    if(!(roadObject.relasjoner && roadObject.relasjoner.foreldre)) return <View />;

    const siblings = this.props.roadObjects.filter(this.findSiblings.bind(this));
    if(siblings.length === 0) return <View />

    var siblingButtons = siblings.map(ro => {
      return <Button key={ro.id} text={ro.id + ""} type="small" onPress={this.openObjectInformation.bind(this, ro)} />
    })

    return (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>Søskenobjekter</Text>
        {siblingButtons}
      </View>
    );
  }

  findSiblings(o) {
    const {roadObject} = this.props;
    const parentOfThis = roadObject.relasjoner.foreldre[0].vegobjekter[0];
    if(!(o.relasjoner && o.relasjoner.foreldre)) return false;

    return parentOfThis === o.relasjoner.foreldre[0].vegobjekter[0] && o.id !== roadObject.id;
  }

  // Called when the user taps the title of the callout
  // Opens the object info view.
  openObjectInformation(ro) {
    this.props.selectObject(ro);
    Actions.ObjectInfoView();
  }

  // Cycles through all the selected filters, and adds information
  // about each of them to the callout bubble.
  getEgenskapInfo() {
    var textComponents = [<Text key={"spacer"}> </Text>];
    var propertiesAdded = [];

    if(this.props.allSelectedFilters) {
      for(var i = 0; i < this.props.allSelectedFilters.length; i++) {
        const filter = this.props.allSelectedFilters[i];

        // Only add one of each property to the callout
        if(propertiesAdded.includes(filter.egenskap.id)) {
          continue;
        }

        // Finds the information about the selected property of this object
        const egenskapsInfo = this.props.roadObject.egenskaper.find(e => {
          return e.id == filter.egenskap.id;
        })

        var tekst = "-";
        if(egenskapsInfo) { tekst = egenskapsInfo.verdi }

        textComponents.push(
          <PropertyValue key={filter.egenskap.id + i} property={filter.egenskap.navn} value={tekst} />
        );
        propertiesAdded.push(filter.egenskap.id);
      }

      return textComponents;
    }
  }

  // Returns eventual postfixes, for example 'mm' for measurements
  getPostfix() {
    var {selectedFilter} = this.props;

    if(selectedFilter.datatype_tekst == "Tall" || selectedFilter.datatype_tekst == "Flerverdiattributt, Tall") {
      if(selectedFilter.enhet && this.props.selectedEgenskap && this.props.selectedEgenskap.enhet) {
        return " " + this.props.selectedEgenskap.enhet.kortnavn;
      }
    }
    return "";
  }
}

var styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: templates.colors.blue,
  }
})

function mapStateToProps(state) {
  return {
    selectedFilter: state.filterReducer.selectedFilter,
    selectedFilterValue: state.filterReducer.selectedFilterValue,
    allSelectedFilters: state.filterReducer.allSelectedFilters,
    currentRoadSearch: state.dataReducer.currentRoadSearch,

    roadObjects: state.dataReducer.currentRoadSearch.roadObjects,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectObject: bindActionCreators(dataActions.selectObject, dispatch),
    searchSaved: bindActionCreators(dataActions.searchSaved, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (MarkerCallout);
