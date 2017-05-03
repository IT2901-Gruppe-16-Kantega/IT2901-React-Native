import React from 'react';
import { NavBar } from 'react-native-router-flux';

import { connect } from 'react-redux'

var Color = require('color');

class NavigationBar extends React.Component {
  render() {
    const {theme} = this.props;

    return (
      <NavBar
            {...this.props}
            titleStyle={{
              color: theme.primaryTextColor,
              fontWeight: 'bold', fontSize: 25
            }}
            navigationBarStyle={{
              borderBottomColor: Color(theme.primaryTextColor).alpha(0.1),
              borderBottomWidth: 1,
              backgroundColor: theme.container.backgroundColor,
            }}
      />

    );
  }
}

function mapStateToProps(state) {
  return {
    theme: state.settingsReducer.themeStyle,
  }
}

export default connect(mapStateToProps, null) (NavigationBar);
