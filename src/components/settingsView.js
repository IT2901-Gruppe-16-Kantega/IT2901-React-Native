//currently not used, but may be used to specify username, autoloading on/off etc
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions'

var settingsView = React.createClass({
  render() {
    return <View style={{margin: 128}}>
      <Text>This is the settings page</Text>
    </View>
  }
});


function mapStateToProps(state) {return {user: state.userReducer.user};}
function mapDispatchToProps(dispatch) {return bindActionCreators(userActions, dispatch);}
export default connect(mapStateToProps, mapDispatchToProps) (settingsView);
