import React, { Component } from 'react';
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

import PropertyValue from './PropertyValue';
import Button from '../misc/Button'

import * as templates from '../../utilities/templates';
import * as mapActions from '../../actions/mapActions'
import * as dataActions from '../../actions/dataActions'
import * as reportActions from '../../actions/reportActions'




/*
The callout shown when the user taps a pin on the map view.
*/
var MarkerCallout = React.createClass({
  render() {
    var {roadObject} = this.props;

    return <View style={{flex: 1}}>
      <TouchableHighlight
        onPress={this.openObjectInformation}>
        <Text style={styles.title}>{roadObject.metadata.type.navn}</Text>
      </TouchableHighlight>
      <PropertyValue property={"ID"} value={roadObject.id} />
      {this.getEgenskapInfo()}
      <Button style = "list" text="Rapporter" onPress={() => {
          this.props.setReportViewType("NEW")
          this.props.setRoadObject(this.props.roadObject)
          Actions.CustomizeReportView()
        }
          } />
    </View>
  },


  // Called when the user taps the title of the callout
  // Opens the object info view.
  openObjectInformation() {
    this.props.selectObject(this.props.roadObject);
    Actions.ObjectInfoView();
  },

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
  },

  // Returns eventual postfixes, for example 'mm' for measurements
  getPostfix() {
    var {selectedFilter} = this.props;

    if(selectedFilter.datatype_tekst == "Tall" || selectedFilter.datatype_tekst == "Flerverdiattributt, Tall") {
      if(selectedFilter.enhet && this.props.selectedEgenskap && this.props.selectedEgenskap.enhet) {
        return " " + this.props.selectedEgenskap.enhet.kortnavn;
      }
    }
    return "";
  },

});

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

  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectObject: bindActionCreators(mapActions.selectObject, dispatch),
    searchSaved: bindActionCreators(dataActions.searchSaved, dispatch),
    reportRoadObject: bindActionCreators(dataActions.reportRoadObject, dispatch),
    setReportViewType: bindActionCreators(reportActions.setReportViewType, dispatch),
    setRoadObject: bindActionCreators(reportActions.setRoadObject, dispatch),

    }
};

export default connect(mapStateToProps, mapDispatchToProps) (MarkerCallout);
