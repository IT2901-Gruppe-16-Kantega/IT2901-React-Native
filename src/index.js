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
<<<<<<< HEAD

import * as dataActions from './actions/dataActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
=======
>>>>>>> 2b0182de3ee969764134830de0f0ce351c3c9aa7


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


/*
Kode som brukes for testing med tempobjekter
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

*/
