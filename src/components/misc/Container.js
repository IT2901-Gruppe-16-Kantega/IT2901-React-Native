import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

var Container = React.createClass({
  render() {
    return <View style={this.props.style.container}>{this.props.children}</View>
  },
});

function mapStateToProps(state) {
  return { style: state.settingsReducer.themeStyle };
}

export default connect(mapStateToProps, null) (Container);
