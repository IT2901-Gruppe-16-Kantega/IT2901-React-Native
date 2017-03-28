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

import * as mapActions from '../actions/mapActions'
import * as templates from '../utilities/templates';

import PropertyValue from './PropertyValue';

var MarkerCallout = React.createClass({
  render() {
    var {roadObject, roadObjectEgenskap} = this.props;

    return <View>
      <TouchableHighlight
        onPress={this.openSomething}>
        <Text style={styles.title}>{roadObject.metadata.type.navn}</Text>
      </TouchableHighlight>
      <PropertyValue property={"ID"} value={roadObject.id} />
      {this.getEgenskapInfo()}
    </View>
  },

  openSomething() {
    this.props.selectObject(this.props.roadObject);
    Actions.ObjectInfoView();
  },

  getEgenskapInfo() {
    if(Object.keys(this.props.selectedFilter).length === 0) {
      return <Text>Velg et filter for å få mer informasjon.</Text>
    }
    var {roadObjectEgenskap} = this.props;
    var egenskapNavn = this.props.selectedFilter.navn;

    if(roadObjectEgenskap == null) {
      return <Text>"Ingen info om " + egenskapNavn.toLowerCase()</Text>
    } else {
      return <PropertyValue
        property={egenskapNavn}
        value={roadObjectEgenskap.verdi.toString() + this.getPostfix()} />
    }
  },

  getPostfix() {
    var {selectedFilter} = this.props;

    if(selectedFilter.datatype_tekst == "Tall" || selectedFilter.datatype_tekst == "Flerverdiattributt, Tall") {
      if(selectedFilter.enhet != null) {
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
    selectedFilters: state.mapReducer.selectedFilter,
    selectedFilterValue: state.mapReducer.selectedFilterValue,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectObject: bindActionCreators(mapActions.selectObject, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (MarkerCallout);
