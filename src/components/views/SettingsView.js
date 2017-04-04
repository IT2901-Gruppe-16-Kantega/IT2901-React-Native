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

import * as Progress from 'react-native-progress';

import SettingSwitch from '../misc/SettingSwitch';

import * as templates from '../../utilities/templates';
import * as reportActions from '../../actions/reportActions';
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
          <Progress.Circle progress={this.props.changeCount / 100} showsText={true} size={50} />
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
          <SettingSwitch
            onChange={this.props.incrementChangeCount}
            value={false}
            text={"Gjør endring"}
            description={this.props.changeCount} />
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
    changeCount: state.reportReducer.changeCount,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setClustering: bindActionCreators(settingsActions.setClustering, dispatch),
    incrementChangeCount: bindActionCreators(reportActions.incrementChangeCount, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SettingsView);
