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
import SearchView from './components/SearchView'
import newSearchView from './components/newSearchView'
import ShowMapView from './components/ShowMapView'
import StoredDataView from './components/StoredDataView'
import SettingsView from './components/SettingsView'
import * as templates from './utilities/templates'

import * as dataActions from './actions/dataActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


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
            key="newSearchView"
            component={newSearchView}
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
            title=""
            hideNavBar={false}
            navigationBarStyle={styles.navigatorStyle}

            />
        </Scene>
      </Router>
    )
  }
}

var styles = StyleSheet.create({
  navigatorStyle: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderBottomWidth: 0,
  }

 })

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

filterFlex: stat....
};}

function mapDispatchToProps(dispatch) {
return {
createSearchObject: bindActionCreators(dataActions.createSearchObject, dispatch),
}
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
*/
