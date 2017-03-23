import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import { connect } from 'react-redux';

import * as mapActions from '../actions/mapActions'

export class MarkerCallout extends React.Component {
  render() {
    var {roadObject, roadObjectEgenskap} = this.props;

    return <View>
      <Text style={styles.title}>{roadObject.metadata.type.navn}</Text>
      <Text>ID: {roadObject.id}</Text>
      <Text>{this.getEgenskapInfo()}</Text>
    </View>
  }

  getEgenskapInfo() {
    if(!this.props.selectedFilter) {
      return "";
    }
    var egenskapInfo = this.props.selectedFilter.navn;

    if(this.props.roadObjectEgenskap == null) {
      return "Ingen info om " + egenskapInfo;
    } else {
      return egenskapInfo + ": " + this.props.selectedFilter.verdi.toString() + this.getPostfix();
    }
  }

  getPostfix() {
    var {selectedEgenskap} = this.props;
    if(selectedEgenskap.datatype_tekst == "Tall" || selectedEgenskap.datatype_tekst == "Flerverdiattributt, Tall") {
      if(selectedEgenskap.enhet != null) {
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
    selectedFilter: state.mapReducer.selectedFilter,
    selectedFilterValue: state.mapReducer.selectedFilterValue,
  };}

export default connect(mapStateToProps, null) (MarkerCallout);
