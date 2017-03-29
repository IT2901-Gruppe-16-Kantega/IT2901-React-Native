import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as templates from '../../utilities/templates';
import * as filterActions from '../../actions/filterActions';

class ComparatorComponent extends React.Component {
  render() {
    return <TouchableHighlight
      style={this.getButtonStyle()}
      onPress={() => this.props.selectFunction(this.props.type)}>
      <View><Text style={this.getTextStyle()}>{this.props.type}</Text></View>
    </TouchableHighlight>
  }

  getButtonStyle() {
    return {
      margin: 2,
      padding: 5,
      borderRadius: 3,
      backgroundColor: templates.colors.orange,
    }
  }

  getTextStyle() {
    return {fontWeight: this.props.selectedFunction == this.props.type ? 'bold' : 'normal'}
  }
}

function mapStateToProps(state) {
  return {
    selectedFunction: state.filterReducer.selectedFunction,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectFunction: bindActionCreators(filterActions.selectFunction, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (ComparatorComponent);
