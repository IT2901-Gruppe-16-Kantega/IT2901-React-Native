/*
starting page of application
*/
//import reactm react native, and router shit
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as templates from '../utilities/templates'


//importing to make redux work
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//importing just one action, if only one action is needed, bindActionCreators must be changed
import {fetchUser} from '../actions/userActions'
//only import actions that this component needs
import * as userActions from '../actions/userActions'



var startingView = React.createClass({
  componentWillMount() {
    //just dispactches an action no idea what happens
    this.props.fetchUser();
  },
  render() {
    //may also use this for readability const {user, tweets} = this.props;
    return <View style= {styles.container}>
      <View style={styles.top}></View>
      <View style={styles.header}>
        <Text style={{color: templates.textColorWhite}}>NVDB-app</Text>
      </View>
      <View style={styles.contents}>
        <Text onPress={Actions.searchFormView}>searchFormView</Text>
        <Text onPress={Actions.storedDataView}>storedDataView</Text>
        <Text onPress={Actions.settingsView}>settingsView</Text>
      </View>
      <View style={styles.footer}>

      </View>

    </View>
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'stretch',
  },
  //Top-leve containers
  top: {
    flex: 0.7
  },
  header: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.grayHeader
  },
  contents: {
    flex: 20
  },
  footer: {
    flex:0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
})










/*                        REDUX STUFF
The return of mapStateToProps is what this comoponent may see from the store
these are set as props and automatically updated when store is changed
The return of mapDispatchToProps is which actions this component has access to
*/

function mapStateToProps(state) {return {user: state.userReducer.user};}
function mapDispatchToProps(dispatch) {return bindActionCreators(userActions, dispatch);}
export default connect(mapStateToProps, mapDispatchToProps) (startingView);
