// view shown when fetching/loading data
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/userActions'

//needs access to fetching state etc

var loadingView = React.createClass({
  render() {
    return <View style={{margin: 128}}>
      <Text onPress={Actions.currentSearchView}>currentSearchView</Text>
    </View>
  }
});

function mapStateToProps(state) {return {user: state.userReducer.user};}
function mapDispatchToProps(dispatch) {return bindActionCreators(userActions, dispatch);}
export default connect(mapStateToProps, mapDispatchToProps) (loadingView);
