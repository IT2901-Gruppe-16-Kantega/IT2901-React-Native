import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SettingSwitch from '../misc/SettingSwitch';
import Button from '../misc/Button'
import {purgeStore} from '../../store'



import * as templates from '../../utilities/templates';
import * as settingsActions from '../../actions/settingsActions';

/*
currently not used, but may be used to specify username, autoloading on/off etc
*/
var SettingsView = React.createClass({
  render() {
    return <View style={templates.container}>
      <View style={templates.top}/>
        <View style={styles.header}>
          <Text style={{color: templates.colors.darkGray}}>NVDB-app</Text>
        </View>
        <View style={styles.contents}>
          <SettingSwitch
            onChange={this.props.setClustering}
            value={this.props.clusteringOn}
            text={"Markørgruppering"}
            description={"BETA: Grupper nære martmarkører."} />
          <SettingSwitch
            disabled={true}
            onChange={null}
            value={false}
            text={"Autolagring"}
            description={"IMPLEMENTER: Lagre søk automatisk."} />
          <Button text="Purge Store" onPress={purgeStore} style={"big"} />


        </View>
        <View style={templates.footer}>
          <Text style={{color: templates.darkGray}}>Gruppe 16 NTNU</Text>
        </View>
    </View>
  }
});

var styles = StyleSheet.create({
  //Top-leve containers
  header: {
    flex: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.white
  },
  contents: {
    flex: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: templates.colors.white
  },
  text: {
    color: templates.colors.darkGray,
  },
})


function mapStateToProps(state) {
  return {
    clusteringOn: state.settingsReducer.clusteringOn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setClustering: bindActionCreators(settingsActions.setClustering, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SettingsView);
