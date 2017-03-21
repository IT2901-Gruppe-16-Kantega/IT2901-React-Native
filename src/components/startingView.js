/*
starting page of application
*/
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as templates from '../utilities/templates'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//importing just one action, if only one action is needed, bindActionCreators must be changed
//only import actions that this component needs



var StartingView = React.createClass({
  componentWillMount() {
  },
  render() {
    return <View style= {templates.container}>
      <View style={templates.top}></View>
      <View style={styles.header}>
        <Text style={{color: templates.textColorWhite}}>NVDB-app</Text>
      </View>
      <View style={styles.contents}>
        <TouchableHighlight
          style= {templates.button}
          underlayColor="azure"
          onPress = {Actions.SearchView}
          >
          <Text style={{color: templates.textColorWhite}}>New search</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style= {templates.button}
          underlayColor="azure"
          onPress = {Actions.storedDataView}
          >
          <Text style={{color: templates.textColorWhite}}>Stored data</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style= {templates.button}
          underlayColor="azure"
          onPress = {Actions.settingsView}
          >
          <Text style={{color: templates.textColorWhite}}>Settings</Text>
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
    backgroundColor: templates.gray
  },
  contents: {
    flex: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: templates.gray
  },
  bottomPadding: {
    flex: 6.5,
    backgroundColor: templates.gray
  },
})

/*                        REDUX STUFF
The return of mapStateToProps is what this comoponent may see from the store
these are set as props and automatically updated when store is changed
The return of mapDispatchToProps is which actions this component has access to
*/

function mapStateToProps(state) {
  return {
    fetching: state.dataReducer.fetching};}
    //function mapDispatchToProps(dispatch) {return bindActionCreators(userActions, dispatch);}
    export default connect(mapStateToProps, null) (StartingView);
