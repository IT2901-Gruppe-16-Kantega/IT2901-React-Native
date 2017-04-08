import React, { Component } from 'react';
import { NavBar } from 'react-native-router-flux';

import { connect } from 'react-redux'

var NavigationBar = React.createClass({
  render() {
    console.log(this.props.navigationBarStyle.backgroundColor);
    return <NavBar {...this.props} navigationBarStyle={{ backgroundColor: this.props.navigationBarStyle.backgroundColor }} />
  }
});

function mapStateToProps(state) {
  return {
    navigationBarStyle: state.settingsReducer.themeStyle.navigationBarStyle,
  };
}

export default connect(mapStateToProps, null) (NavigationBar);
