import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  Dimensions,
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';


import StartingView from './components/StartingView'
import CurrentSearchView from './components/CurrentSearchView'
import LoadingView from './components/LoadingView'
import ReportView from './components/ReportView'
import SearchView from './components/SearchView'
import RoadMapView from './components/RoadMapView'
import StoredDataView from './components/StoredDataView'
import SettingsView from './components/SettingsView'
import ObjectInfoView from './components/ObjectInfoView'

import * as templates from './utilities/templates'

import * as dataActions from './actions/dataActions'
import * as mapActions from './actions/mapActions'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

let ScreenWidth = Dimensions.get("window").width;

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
            key="SearchView"
            component={SearchView}
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
            title=""
            hideNavBar={false}
            onRight={ this.toggleSidebar.bind(this) }
            rightTitle="Filtrer"
            navigationBarStyle={styles.navigatorStyle}
            />
          <Scene
            key="ObjectInfoView"
            component={ObjectInfoView}
            sceneStyle={{paddingTop: 64}}
            title=""
            hideNavBar={false}
            rightTitle="Rediger"
            onRight={ () => console.log('hei') }
            />
        </Scene>
      </Router>
    )
  }

  toggleSidebar() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    var width = ScreenWidth / 1.5;
    var xPos = ScreenWidth - width;
    var frame = {width: width};

    if(this.props.sidebarFrame.left == xPos) {
      frame.left = ScreenWidth;
      this.props.toggleSecondSidebar(false);
    } else {
      frame.left = xPos;
    }

    this.props.setSidebarFrame(frame);
  }
}

var styles = StyleSheet.create({
  navigatorStyle: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderBottomWidth: 0,
  }
})

function mapStateToProps(state) {
  return {
    //Status information about search
    sidebarFrame: state.mapReducer.sidebarFrame,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSidebarFrame: bindActionCreators(mapActions.setSidebarFrame, dispatch),
    toggleSecondSidebar: bindActionCreators(mapActions.toggleSecondSidebar, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
