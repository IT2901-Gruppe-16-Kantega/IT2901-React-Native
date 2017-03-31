import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropertyValue from './PropertyValue';

import * as templates from '../../utilities/templates';
import * as mapActions from '../../actions/mapActions'

var MarkerCallout = React.createClass({
  render() {
    var {roadObject, roadObjectEgenskap} = this.props;

    return <View>
      <TouchableHighlight
        onPress={this.openObjectInformation}>
        <Text style={styles.title}>{roadObject.metadata.type.navn}</Text>
      </TouchableHighlight>
      <PropertyValue property={"ID"} value={roadObject.id} />
      {this.getEgenskapInfo()}
    </View>
  },

  openObjectInformation() {
    this.props.selectObject(this.props.roadObject);
    Actions.ObjectInfoView();
  },

  getEgenskapInfo() {
    var textComponents = [<Text> </Text>];

    if(this.props.allSelectedFilters) {
      for(var i = 0; i < this.props.allSelectedFilters.length; i++) {
        const filter = this.props.allSelectedFilters[i];
        const egenskapsInfo = this.props.roadObject.egenskaper.find(e => {
          return e.id == filter.egenskap.id;
        })

        var tekst = "-";
        if(egenskapsInfo) { tekst = egenskapsInfo.verdi }

        textComponents.push(
          <PropertyValue key={filter.egenskap.navn + i} property={filter.egenskap.navn} value={tekst} />
        );
      }

      return textComponents;
    }
  },

  getPostfix() {
    var {selectedFilter} = this.props;

    if(selectedFilter.datatype_tekst == "Tall" || selectedFilter.datatype_tekst == "Flerverdiattributt, Tall") {
      if(selectedFilter.enhet && this.props.selectedEgenskap && this.props.selectedEgenskap.enhet) {
        return " " + this.props.selectedEgenskap.enhet.kortnavn;
      }
    }
    return "";
  }
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectObject: bindActionCreators(mapActions.selectObject, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (MarkerCallout);
