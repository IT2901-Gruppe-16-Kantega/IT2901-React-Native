// Shows information about current search, buttons for viewing map and opening AR
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions'

var currentSearchView = React.createClass({
  render() {
    return <View style={{margin: 128}}>
      <Text onPress={Actions.reportView}>reportView</Text>
      <Text onPress={Actions.showMapView}>showMapView</Text>
      <Text>AR</Text>
      <Text onPress={Actions.startingView}>Exit</Text>
    </View>
  }
});


function mapStateToProps(state) {return {user: state.userReducer.user};}
function mapDispatchToProps(dispatch) {return bindActionCreators(userActions, dispatch);}
export default connect(mapStateToProps, mapDispatchToProps) (currentSearchView);
