import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import StartingView from './components/startingView'
import CurrentSearchView from './components/currentSearchView'
import LoadingView from './components/loadingView'
import ReportView from './components/reportView'
import SearchFormView from './components/searchFormView'
import ShowMapView from './components/showMapView'
import StoredDataView from './components/storedDataView'
import SettingsView from './components/settingsView'


export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="startingView"
            component={StartingView}
            title=""
            initial={true}
            hideNavBar={true}
            type='reset'
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
            key="showMapView"
            component={ShowMapView}
            title="Map"
            hideNavBar={false}
            />
        </Scene>
      </Router>
    )
  }
}
