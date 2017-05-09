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

import {isAndroid} from '../../utilities/utils';

import * as templates from '../../utilities/templates';
import * as mapActions from '../../actions/mapActions'
import * as dataActions from '../../actions/dataActions'
import * as reportActions from '../../actions/reportActions'

/*
The callout shown when the user taps a pin on the map view.
*/
class MarkerCallout extends React.Component {
  static propTypes = {
    fullscreen: PropTypes.bool,
    siblings: PropTypes.array.isRequired,
  }

  render() {
    var {siblings, fullscreen, objekttypeInfo} = this.props;

    return (
      <View style={{flex: 1, padding: fullscreen ? 10 : 0}}>
        <Text style={styles.title}>{objekttypeInfo.navn}</Text>
        {this.renderSiblings()}
      </View>
    );
  }

  renderSiblings() {
    return this.props.siblings.map(ro => {
      return (
        <View key={ro.id} style={{ backgroundColor: templates.colors.lightGray, marginBottom: 5, padding: 5, borderRadius: 2 }}>
          {this.getEgenskapInfo(ro)}
          <Button text={ro.id + ""} type="list" onPress={this.openObjectInformation.bind(this, ro)} />
        </View>
      );
    })
  }

  // Called when the user taps the title of the callout
  // Opens the object info view.
  openObjectInformation(ro) {
    this.props.selectObject(ro);
    Actions.ObjectInfoView();
  }

  // Cycles through all the selected filters, and adds information
  // about each of them to the callout bubble.
  getEgenskapInfo(roadObject) {
    var textComponents = [];
    var propertiesAdded = [];

    if(this.props.allSelectedFilters) {
      for(var i = 0; i < this.props.allSelectedFilters.length; i++) {
        const filter = this.props.allSelectedFilters[i];

        // Only add one of each property to the callout
        if(propertiesAdded.includes(filter.egenskap.id)) {
          continue;
        }

        var egenskapsInfo;
        // Check if roadObject has any properties first
        if(roadObject.egenskaper) {
          // Finds the information about the selected property of this object
          egenskapsInfo = roadObject.egenskaper.find(e => {
            return e.id === filter.egenskap.id;
          })
        }

        var tekst = "-";
        if(egenskapsInfo) tekst = egenskapsInfo.verdi;

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
    objekttypeInfo: state.dataReducer.currentRoadSearch.objekttypeInfo,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectObject: bindActionCreators(dataActions.selectObject, dispatch),
    searchSaved: bindActionCreators(dataActions.searchSaved, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (MarkerCallout);
