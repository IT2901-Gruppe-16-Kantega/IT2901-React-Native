//Connection with AR
import { connect } from 'react-redux';
// Changes Vegard
import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import RNFS from 'react-native-fs';
import { Actions } from 'react-native-router-flux'; // Unused?
import { bindActionCreators } from 'redux';
import * as dataActions from '../actions/dataActions';
import * as templates from '../utilities/templates';

var ARConnection = React.createClass({
  componentWillMount() {
    //this.sendToAR();
  },
  render() {
    return <View style={styles.container}>
        <TouchableHighlight
          style= {styles.button}
          underlayColor="azure"
          onPress = {this.sendToAR}
          >
          <Text style={{color: templates.textColorWhite}}>SendToAR</Text>
        </TouchableHighlight>
      </View>
  },

// Changes Vegard
// Not working ATM
// TODO make this to avoid lagspike async
// TODO remove unused features from android gradle i.e camera
// NB remember to correct he node_module shit - add link and so on
  sendToAR () {
    // Android handling code
    console.log('Writing file');
    if (Platform.OS === 'android'){
      let mainpath = RNFS.DocumentDirectoryPath+'/data.json';
      RNFS.writeFile(mainpath, JSON.stringify(this.props.objects), 'utf8')
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

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //Top-leve containers
  top: {
    flex: 0.7
  },
  header: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.gray
  },
  contents: {
    flex: 11.5,
    flexDirection: 'column',
    backgroundColor: templates.gray
  },
  informationView: {
    flex:1,
    flexDirection: 'row',
  },
  informationPadding: {
    flex: 0.2,
  },
  information: {
    flex:2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  bottom: {
    flex: 2.5,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: templates.gray
  },
  buttons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonArea1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  buttonArea2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonPadding: {
    flex: 0.1
  },
  button: {
    borderWidth: 2,
    flex: 1,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'aliceblue',
  },
  footer: {
    flex:0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

function mapStateToProps(state) {
  return {
    objects: state.dataReducer.objects,
  };}
// Changes Vegard
function mapDispatchToProps(dispatch) {return bindActionCreators(dataActions, dispatch);}
export default connect(mapStateToProps, mapDispatchToProps) (ARConnection);
