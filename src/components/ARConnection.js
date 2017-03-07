//Connection with AR
import { connect } from 'react-redux';
// Changes Vegard
import React, { Component } from 'react';
import {
  View,
  Platform
} from 'react-native';
import RNFS from 'react-native-fs';
import { Actions } from 'react-native-router-flux'; // Unused?
import { bindActionCreators } from 'redux';
import * as dataActions from '../actions/dataActions';

var ARConnection = React.createClass({
  render() {
    return
      <View>
      </View>
  },
  componentDidUpdate() {
    this.sendToAR(this.props.objects);
  },

// Changes Vegard
// Not working ATM
// TODO make this to avoid lagspike async
// TODO remove unused features from android gradle i.e camera
// NB remember to correct he node_module shit - add link and so on
  sendToAR (objects) {
    // Android handling code
    if (Platform.OS === 'android'){
      let mainpath = RNFS.DocumentDirectoryPath+'/data.json';
      RNFS.writeFile(mainpath, this.props.objects, 'utf8')
      .then((success) => {
        console.log('File written');
      })
      .catch((err) => {
        console.log(err.message);
      });
      // Now data should be available cross apps
    }
    // iOS handling code
    else{
      console.log('FeelsBad');
    }

    //send objects elle lagre fil
  }

});


function mapStateToProps(state) {
  return {
    objects: state.dataReducer.objects,
  };}
// Changes Vegard
function mapDispatchToProps(dispatch) {return bindActionCreators(dataActions, dispatch);}
export default connect(mapStateToProps, mapDispatchToProps) (ARConnection);
