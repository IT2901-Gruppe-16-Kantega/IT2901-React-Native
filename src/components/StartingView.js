/*
starting page of application
*/
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeEventEmitter
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as templates from '../utilities/templates'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

var StartingView = React.createClass({
  render() {
    return <View style= {templates.container}>
      <View style={templates.top}></View>
      <View style={styles.header}>
        <Text style={{color: templates.colors.white}}>NVDB-app</Text>
      </View>
      <View style={styles.contents}>
        <TouchableHighlight
          style= {templates.button}
          underlayColor="azure"
          onPress = {Actions.SearchView}
          >
          <Text style={{color: templates.colors.white}}>Nytt søk</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style= {templates.button}
          underlayColor="azure"
          onPress = {Actions.storedDataView}
          >
          <Text style={{color: templates.colors.white}}>Lagrede søk</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style= {templates.button}
          underlayColor="azure"
          onPress = {Actions.settingsView}
          >
          <Text style={{color: templates.colors.white}}>Innstillinger</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.bottomPadding}></View>
      <View style={templates.footer}>
        <Text style={{color: templates.gray}}>Gruppe 16 NTNU</Text>
      </View>
    </View>
  }
});

//move some of this to templates
var styles = StyleSheet.create({
  //Top-leve containers
  header: {
    flex: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.darkGray
  },
  contents: {
    flex: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: templates.colors.darkGray
  },
  bottomPadding: {
    flex: 6.5,
    backgroundColor: templates.colors.darkGray
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