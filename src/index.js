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

import * as dataActions from './actions/dataActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


//export default class App extends Component

class App extends Component {
  componentWillMount(){
    //fill state with some fake objects
    this.props.createSearchObject(
      'TestObject 1',
      [{yolo: '123'}],
      'report',
      [{kommune: 'asd'}]);
      this.props.createSearchObject(
        'TestObject 2',
        [{yolo: '123'}],
        'report',
        [{kommune: 'asd'}]);
      }
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

    function mapStateToProps(state) {
      return {
        //Status information about search
        fetching: state.dataReducer.fetching,
        fetched: state.dataReducer.fetched,
      };}

      function mapDispatchToProps(dispatch) {
        return {
          createSearchObject: bindActionCreators(dataActions.createSearchObject, dispatch),
        }
      }

      export default connect(mapStateToProps, mapDispatchToProps) (App);
