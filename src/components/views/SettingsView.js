import React from 'react';
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

import Button from '../misc/Button';
import Container from '../misc/Container';
import LocationInputComponent from '../misc/LocationInputComponent';
import PropertyValue from '../misc/PropertyValue';
import SettingSwitch from '../misc/SettingSwitch';

import * as templates from '../../utilities/templates';

import * as reportActions from '../../actions/reportActions';
import * as searchActions from '../../actions/searchActions';
import * as settingsActions from '../../actions/settingsActions';

class SettingsView extends React.Component {
  render() {
    return <Container>
      <SettingSwitch
        onValueChange={this.props.setDarkMode}
        value={this.props.darkModeOn}
        title={"Nattmodus"}
        description={"BETA: Mørk bakgrunn og lys tekst."} />
      <Button type="list" text="Hjelp" onPress={Actions.HelpView} />
    </Container>
  }
}

function mapStateToProps(state) {
  return {
    theme: state.settingsReducer.themeStyle,
    clusteringOn: state.settingsReducer.clusteringOn,
    darkModeOn: state.settingsReducer.darkModeOn,
    changeCount: state.reportReducer.changeCount,

    kommuneText: state.searchReducer.kommuneText,
    kommuneInput: state.searchReducer.kommuneInput,
    kommuneChosen: state.searchReducer.kommuneChosen,
    kommuneColor: state.searchReducer.kommuneColor,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setClustering: bindActionCreators(settingsActions.setClustering, dispatch),
    setDarkMode: bindActionCreators(settingsActions.setDarkMode, dispatch),
    incrementChangeCount: bindActionCreators(reportActions.incrementChangeCount, dispatch),

    inputKommune: bindActionCreators(searchActions.inputKommune, dispatch),
    chooseKommune: bindActionCreators(searchActions.chooseKommune, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SettingsView);
