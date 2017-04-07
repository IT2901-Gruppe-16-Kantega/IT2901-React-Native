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
      <View style={templates.top}></View>
      <View style={styles.header}>
        <Text style={{color: templates.colors.darkGray}}>NVDB-app</Text>
      </View>

      <View style={styles.contents}>
        <Button text={"Nytt søk"} onPress={Actions.SearchView} />
        <Button text={"Lagrede søk"} onPress={Actions.StoredDataView} />
        <Button text={"Innstillinger"} onPress={Actions.SettingsView} />
      </View>

      <View style={styles.bottomPadding}></View>

      <View style={templates.footer}>
        <Text style={{color: templates.gray}}>Gruppe 16 NTNU</Text>
      </View>
    </Container>
  }
});

//move some of this to templates
var styles = StyleSheet.create({
  //Top-leve containers
  header: {
    flex: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.white
  },
  contents: {
    flex: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: templates.colors.white
  },
  bottomPadding: {
    flex: 6.5,
    backgroundColor: templates.colors.white
  },
})

/*                        REDUX STUFF
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
