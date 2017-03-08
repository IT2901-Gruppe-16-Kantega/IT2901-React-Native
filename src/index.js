import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import startingView from './components/startingView'
import currentSearchView from './components/currentSearchView'
import loadingView from './components/loadingView'
import reportView from './components/reportView'
import searchFormView from './components/searchFormView'
import showMapView from './components/showMapView'
import storedDataView from './components/storedDataView'
import settingsView from './components/settingsView'
// Changes Vegard
import ARConnection from './components/ARConnection'


export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="startingView"
            component={startingView}
            title=""
            initial={true}
            hideNavBar={true}
            type='reset'
            />
          <Scene
            key="searchFormView"
            component={searchFormView}
            title="Search"
            hideNavBar={false}

            />
          <Scene
            key="storedDataView"
            component={storedDataView}
            title="Stored Data"
            hideNavBar={false}
            />
          <Scene
            key="settingsView"
            component={settingsView}
            title="Settings"
            hideNavBar={false}
            />
          <Scene
            key="loadingView"
            component={loadingView}
            title=""
            hideNavBar={true}
            />
          <Scene
            key="currentSearchView"
            component={currentSearchView}
            title=""
            hideNavBar={true}
            type = 'reset'
            />
          <Scene
            key="reportView"
            component={reportView}
            title="Report"
            hideNavBar={false}
            />
          <Scene
            key="showMapView"
            component={showMapView}
            title="Map"
            hideNavBar={false}
            />

          <Scene
            key="ARConnection"
            component={ARConnection}
            title="ARConnection"
            hideNavBar={false}
            />
        </Scene>
      </Router>
    )
  }
}
