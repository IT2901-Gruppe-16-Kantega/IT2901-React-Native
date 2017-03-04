// View that shows all stored data
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions'

var storedDataView = React.createClass({
  render() {
    return <View style={{margin: 128}}>
      <Text onPress={Actions.loadingView}>loadingView</Text>
    </View>
  }
});


function mapStateToProps(state) {return {user: state.userReducer.user};}
function mapDispatchToProps(dispatch) {return bindActionCreators(userActions, dispatch);}
export default connect(mapStateToProps, mapDispatchToProps) (storedDataView);