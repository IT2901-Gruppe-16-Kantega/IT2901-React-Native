import React from 'react';
import { NavBar } from 'react-native-router-flux';

import { connect } from 'react-redux'

class NavigationBar extends React.Component {
  render() {
    return <NavBar {...this.props} navigationBarStyle={{ backgroundColor: this.props.navigationBarStyle.backgroundColor }} />
  }
}

function mapStateToProps(state) {
  return {
    navigationBarStyle: state.settingsReducer.themeStyle.navigationBarStyle,
  }
}

export default connect(mapStateToProps, null) (NavigationBar);
