// react imports
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  Dimensions,
  Navigator,
  Platform,
  UIManager,
} from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';

// redux imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import moment from 'moment';

// application view imports
import CurrentSearchView from './components/views/CurrentSearchView'
import LoadingView from './components/views/LoadingView'
import ObjectInfoView from './components/views/ObjectInfoView'
import ReportView from './components/views/ReportView'
import RoadMapView from './components/views/RoadMapView'
import SearchView from './components/views/SearchView'
import SettingsView from './components/views/SettingsView'
import StartingView from './components/views/StartingView'
import StoredDataView from './components/views/StoredDataView'

import NavigationBar from './components/misc/NavigationBar'

// misc imports
import storageEngine from './utilities/storageEngine'
import * as templates from './utilities/templates'

import * as dataActions from './actions/dataActions'
import * as filterActions from './actions/filterActions'
import * as mapActions from './actions/mapActions'

let ScreenWidth = Dimensions.get("window").width;


var scenes = null;

class App extends Component {
  componentWillMount() {
  	if(Platform.OS === "android") {
  		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  	}

    const storage = storageEngine('NVDB-storage')
    storage.initialize();
    var stored = storage.load(function(progress) {
      this.props.setLoadingProgress(progress);
    }.bind(this));
    this.props.loadSearches(stored)

    scenes = Actions.create(
      <Scene key="root">
        <Scene
          key="StartingView"
          component={StartingView}
          type='reset'
          initial={true} />
        <Scene
          key="SearchView"
          component={SearchView} />
        <Scene
          key="StoredDataView"
          component={StoredDataView}
          title="Lagrede søk" />
        <Scene
          key="SettingsView"
          component={SettingsView}
          title="Innstillinger" />
        <Scene
          key="LoadingView"
          component={LoadingView} />
        <Scene
          key="CurrentSearchView"
          component={CurrentSearchView}
          type='reset' />
        <Scene
          key="ReportView"
          component={ReportView}
          title="Rapport" />
        <Scene
          key="RoadMapView"
          component={RoadMapView}
          onRight={ () => this.toggleSidebar() }
          rightTitle="Filtrer"
          onBack={() => this.exitMap()}
          navigationBarStyle={this.props.navigationBarStyle} />
        <Scene
          key="ObjectInfoView"
          component={ObjectInfoView}
          sceneStyle={{paddingTop: 64}} />
    </Scene>
    );
  }

  render() {
    return (
      <Router
        scenes={scenes}
        navBar={NavigationBar}
        sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}>
      </Router>
    )
  }

  toggleSidebar(close) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    var width = ScreenWidth / 2.2;
    var xPos = ScreenWidth - width + 3;
    var frame = {width: width, top: 10};

    if((this.props.sidebarFrame.left == xPos) || close) {
      frame.left = ScreenWidth;
      this.props.toggleSecondSidebar(false);
    } else {
      frame.left = xPos;
    }

    this.props.setSidebarFrame(frame);
  }

  exitMap() {
    Actions.pop();
    this.toggleSidebar(true);
    this.props.removeAllFilters();
  }
}

function mapStateToProps(state) {
  return {
    loadingProgress: state.dataReducer.loadingProgress,
    sidebarFrame: state.mapReducer.sidebarFrame,
    isEditingRoadObject: state.dataReducer.isEditingRoadObject,
    reportViewType: state. reportReducer. reportViewType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeAllFilters: bindActionCreators(filterActions.removeAllFilters, dispatch),
    loadSearches: bindActionCreators(dataActions.loadSearches, dispatch),
    setLoadingProgress: bindActionCreators(dataActions.setLoadingProgress, dispatch),
    setSidebarFrame: bindActionCreators(mapActions.setSidebarFrame, dispatch),
    toggleSecondSidebar: bindActionCreators(mapActions.toggleSecondSidebar, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
