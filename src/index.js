import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import StartingView from './components/StartingView'
import CurrentSearchView from './components/CurrentSearchView'
import LoadingView from './components/LoadingView'
import ReportView from './components/ReportView'
import SearchFormView from './components/SearchFormView'
import ShowMapView from './components/ShowMapView'
import StoredDataView from './components/StoredDataView'
import SettingsView from './components/SettingsView'


export default class App extends Component {
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
            />
          <Scene
            key="searchFormView"
            component={SearchFormView}
            title="Search"
            hideNavBar={false}
            initial={true}

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
