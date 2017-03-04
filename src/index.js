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


export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="startingView"
            component={startingView}
            title="startingView"

            hideNavBar={true}
            type='reset'
            />
          <Scene
            key="searchFormView"
            component={searchFormView}
            title="searchFormView"
            hideNavBar={false}
            initial={true}
            />
          <Scene
            key="storedDataView"
            component={storedDataView}
            title="storedDataView"
            hideNavBar={false}
            />
          <Scene
            key="settingsView"
            component={settingsView}
            title="settingsView"
            hideNavBar={false}
            />
          <Scene
            key="loadingView"
            component={loadingView}
            title="loadingView"
            hideNavBar={true}
            />
          <Scene
            key="currentSearchView"
            component={currentSearchView}
            title="currentSearchView"
            hideNavBar={false}
            type = 'reset'
            />
          <Scene
            key="reportView"
            component={reportView}
            title="reportView"
            hideNavBar={false}
            />
          <Scene
            key="showMapView"
            component={showMapView}
            title="showMapView"
            hideNavBar={false}
            />
        </Scene>
      </Router>
    )
  }
}
