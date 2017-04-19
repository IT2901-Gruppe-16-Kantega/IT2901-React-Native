import React, { Component } from 'react';
import { Text } from 'react-native';

import { connect } from 'react-redux'
import PropTypes from 'prop-types';

var PropertyValue = React.createClass({
  propTypes: {
    property: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  },

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
