import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as values from '../../utilities/values';
import * as templates from '../../utilities/templates';
import * as filterActions from '../../actions/filterActions';

class ComparatorComponent extends React.Component {
  render() {
    return <TouchableHighlight
      style={this.getButtonStyle()}
      underlayColor={templates.colors.blue}
      onPress={this.selectFunction.bind(this, this.props.type)}>
      <View><Text style={this.getTextStyle()}>{this.props.type}</Text></View>
    </TouchableHighlight>
  }

  selectFunction(type) {
    this.props.selectFunction(this.props.type);

    if(this.props.type === values.comparators.HAS_VALUE || this.props.type === values.comparators.HAS_NOT_VALUE) {
      this.props.deselectFilterValue();
    }
  }

  getButtonStyle() {
    return {
      flex: 1,
      margin: 2,
      padding: 5,
      borderRadius: 3,
      backgroundColor: templates.colors.orange,
    }
  }

  getTextStyle() {
    return {fontSize: 15, textAlign: 'center', fontWeight: this.props.selectedFunction == this.props.type ? 'bold' : '100'}
  }
}

ComparatorComponent.propTypes = {
  type: PropTypes.oneOf(Object.values(values.comparators)).isRequired,

};

function mapStateToProps(state) {
  return {
    selectedFunction: state.filterReducer.selectedFunction,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectFunction: bindActionCreators(filterActions.selectFunction, dispatch),
    deselectFilterValue: bindActionCreators(filterActions.deselectFilterValue, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (ComparatorComponent);
