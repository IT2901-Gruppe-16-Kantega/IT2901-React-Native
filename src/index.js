import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  LayoutAnimation
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import StartingView from './components/startingView'
import CurrentSearchView from './components/currentSearchView'
import LoadingView from './components/loadingView'
import ReportView from './components/reportView'
import SearchFormView from './components/searchFormView'
import RoadMapView from './components/RoadMapView'
import StoredDataView from './components/storedDataView'
import SettingsView from './components/settingsView'

import * as dataActions from './actions/dataActions'
import * as mapActions from './actions/mapActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="startingView"
            component={StartingView}
            title=""
            hideNavBar={true}
            type='reset'
            initial={true}

            />
          <Scene
            key="searchFormView"
            component={SearchFormView}
            title="Search"
            hideNavBar={false}

            />
          <Scene
            key="storedDataView"
            component={StoredDataView}
            title="Stored Data"
            hideNavBar={false}

            />
          <Scene
            key="settingsView"
            component={SettingsView}
            title="Settings"
            hideNavBar={false}
            />
          <Scene
            key="loadingView"
            component={LoadingView}
            title=""
            hideNavBar={true}
            />
          <Scene
            key="currentSearchView"
            component={CurrentSearchView}
            title=""
            hideNavBar={true}
            type = 'reset'
            />
          <Scene
            key="reportView"
            component={ReportView}
            title="Report"
            hideNavBar={false}
            />
          <Scene
            key="RoadMapView"
            component={RoadMapView}
            title="Map"
            hideNavBar={false}
            onRight={ this.toggleFilterFlex.bind(this) }
            rightTitle="Filtrer"
            />
        </Scene>
      </Router>
    )
  }

  toggleFilterFlex() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.filterFlex == 0 ? this.props.setFilterFlex(3) : this.props.setFilterFlex(0);
  }
}

function mapStateToProps(state) {
  return {
    //Status information about search
    filterFlex: state.mapReducer.filterFlex,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFilterFlex: bindActionCreators(mapActions.setFilterFlex, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
