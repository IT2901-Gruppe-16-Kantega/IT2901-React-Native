import React, { Component } from 'react';
import { Text } from 'react-native';

import { connect } from 'react-redux'

var PropertyValue = React.createClass({
  render() {
    return <Text style={{paddingTop: 2, paddingBottom: 2}}>
      <Text style={this.props.theme.property}>{this.props.property}: </Text>
      <Text style={this.props.theme.value}>{this.props.value}</Text>
    </Text>
  }
});

function mapStateToProps(state) {
  return {
    theme: state.settingsReducer.themeStyle,
  };
}

export default connect(mapStateToProps, null) (PropertyValue);
