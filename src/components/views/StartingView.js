import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  NativeEventEmitter
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Button from '../misc/Button'
import Container from '../misc/Container'

import * as templates from '../../utilities/templates'

/*
starting page of application
*/
var StartingView = React.createClass({
  render() {
    return <Container>
      <View style={styles.contents}>
        <Button style={"title"} text={"Nytt søk"} onPress={Actions.SearchView} />
        <Button style={"title"} text={"Lagrede søk"} onPress={Actions.StoredDataView} />
        <Button style={"title"} text={"Innstillinger"} onPress={Actions.SettingsView} />
      </View>
    </Container>
  }
});

var styles = StyleSheet.create({
  contents: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

/* REDUX STUFF
The return of mapStateToProps is what this comoponent may see from the store
these are set as props and automatically updated when store is changed
The return of mapDispatchToProps is which actions this component has access to
*/
function mapStateToProps(state) {
  return {
    fetching: state.dataReducer.fetching
  };
}

function mapDispatchToProps(dispatch) {return bindActionCreators(userActions, dispatch);}
export default connect(mapStateToProps, null) (StartingView);
