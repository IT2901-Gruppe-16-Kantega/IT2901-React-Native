import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import * as mapActions from '../actions/mapActions'

export class MarkerCallout extends React.Component {
  render() {
    var {roadObject, roadObjectEgenskap} = this.props;

    return <View>
      <Text style={styles.title}>{roadObject.metadata.type.navn}</Text>
      <Text>ID: {roadObject.id}</Text>
      <Text>{this.getEgenskapInfo()}</Text>
      <TouchableHighlight
        onPress={Actions.ObjectInfoView}>
        <Text>HeiHeiHeiHeiHeiHeiHeiHeiHeiHeiHeiHeiHeiHeiHeiHeiHeiHeiHeiHeiHeiHeiHei</Text>
      </TouchableHighlight>
    </View>
  }

  openSomething() {
    console.log("hei");
  }

  getEgenskapInfo() {
    console.log(this.props.roadObjectEgenskap)

    if(!this.props.selectedFilter) {
      return "Velg et filter for å få mer informasjon.";
    }
    var egenskapInfo = this.props.selectedFilter.navn;

    if(this.props.roadObjectEgenskap == null) {
      return "Ingen info om " + egenskapInfo;
    } else {
      return egenskapInfo + ": " + this.props.roadObjectEgenskap.verdi.toString() + this.getPostfix();
    }
  }

  getPostfix() {
    var {selectedFilter} = this.props;

    if(selectedFilter.datatype_tekst == "Tall" || selectedFilter.datatype_tekst == "Flerverdiattributt, Tall") {
      if(selectedFilter.enhet != null) {
        return " " + this.props.selectedEgenskap.enhet.kortnavn;
      }
    }
    return "";
  }
}

var styles = StyleSheet.create({
  title: {
    fontSize: 20,
  }
})

function mapStateToProps(state) {
  return {
    selectedFilters: state.mapReducer.selectedFilter,
    selectedFilterValue: state.mapReducer.selectedFilterValue,
  };
}

export default connect(mapStateToProps, null) (MarkerCallout);
