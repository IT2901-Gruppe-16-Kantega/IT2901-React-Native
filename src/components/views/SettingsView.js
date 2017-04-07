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

import Container from '../misc/Container';
import SettingSwitch from '../misc/SettingSwitch';

import * as templates from '../../utilities/templates';
import * as reportActions from '../../actions/reportActions';
import * as settingsActions from '../../actions/settingsActions';

var SettingsView = React.createClass({
  render() {
    return <Container>
      <SettingSwitch
        onChange={this.props.setClustering}
        value={this.props.clusteringOn}
        title={"Markørgruppering"}
        description={"BETA: Grupper nære martmarkører."} />
      <SettingSwitch
        disabled={true}
        onChange={null}
        value={false}
        title={"Autolagring"}
        description={"IMPLEMENTER: Lagre søk automatisk."} />
      <SettingSwitch
        onChange={this.props.incrementChangeCount}
        value={false}
        title={"Gjør endring"}
        description={"Antall endringer: " + this.props.changeCount} />
      <SettingSwitch
        onChange={this.props.setDarkMode}
        value={this.props.darkModeOn}
        title={"Nattmodus"}
        description={"Mørk bakgrunn og lys tekst."} />
    </Container>
  }
});

function mapStateToProps(state) {
  return {
    clusteringOn: state.settingsReducer.clusteringOn,
    darkModeOn: state.settingsReducer.darkModeOn,
    changeCount: state.reportReducer.changeCount,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setClustering: bindActionCreators(settingsActions.setClustering, dispatch),
    setDarkMode: bindActionCreators(settingsActions.setDarkMode, dispatch),
    incrementChangeCount: bindActionCreators(reportActions.incrementChangeCount, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SettingsView);
