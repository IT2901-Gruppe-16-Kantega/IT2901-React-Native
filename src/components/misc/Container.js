import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/*
Default container for all views. Background color
and other styles based on selected theme.
*/
class Container extends React.Component {
  render() {
    return <View style={this.props.style.mainContainer}>
      {this.props.children}
    </View>
  }
}

function mapStateToProps(state) {
  return { style: state.settingsReducer.themeStyle };
}

export default connect(mapStateToProps, null) (Container);
