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
import CustomizeReportView from './components/views/CustomizeReportView'

import NavigationBar from './components/misc/NavigationBar'

// misc imports
import storageEngine from './utilities/storageEngine'
import * as templates from './utilities/templates'
import * as dataActions from './actions/dataActions'
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
          navBar={NavigationBar}
          title=""
          type='reset'
          hideNavBar={true}
          initial={true}

          />
        <Scene
          key="SearchView"
          component={SearchView}
          hideNavBar={false}
          />
        <Scene
          key="StoredDataView"
          component={StoredDataView}
          navBar={NavigationBar}
          title="Lagrede søk"
          hideNavBar={false} />
        <Scene
          key="SettingsView"
          component={SettingsView}
          title="Innstillinger"
          hideNavBar={false} />
        <Scene
          key="LoadingView"
          component={LoadingView}
          title=""
          hideNavBar={true} />
        <Scene
          key="CurrentSearchView"
          component={CurrentSearchView}
          title=""
          hideNavBar={true}
          type = 'reset' />
        <Scene
          key="ReportView"
          component={ReportView}
          title="Rapport"
          hideNavBar={false}/>
        <Scene
          key="RoadMapView"
          component={RoadMapView}
          title=""
          hideNavBar={false}
          onRight={ this.toggleSidebar.bind(this) }
          rightTitle="Filtrer"
          navigationBarStyle={this.props.navigationBarStyle} />
        <Scene
          key="ObjectInfoView"
          component={ObjectInfoView}
          sceneStyle={{paddingTop: 64}}
          title=""
          hideNavBar={false}
          //rightTitle={this.getObjectInfoViewRightTitle}
          onRight={ () => console.log("Hei") } />

        <Scene
          key="CustomizeReportView"
          component={CustomizeReportView}
          sceneStyle={{paddingTop: 64}}
          title={()=> {
            if(this.props.reportViewType==="NEW") return "Registrer rapport"
            else return "Endre rapport"
          }}
          hideNavBar={false} />
    </Scene>

    );
  }

  render() {
    return (
      <Router
        scenes={scenes}
        sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}>
      </Router>
    )
  }

  getObjectInfoViewRightTitle() {
    if(this.props.isEditingRoadObject) {
      return "Lagre";
    }
    return "Rediger";
  }

  toggleSidebar() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    var width = ScreenWidth / 2.2;
    var xPos = ScreenWidth - width + 3;
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
    loadSearches: bindActionCreators(dataActions.loadSearches, dispatch),
    setLoadingProgress: bindActionCreators(dataActions.setLoadingProgress, dispatch),
    setSidebarFrame: bindActionCreators(mapActions.setSidebarFrame, dispatch),
    toggleSecondSidebar: bindActionCreators(mapActions.toggleSecondSidebar, dispatch),
    setIsEditingRoadObject: bindActionCreators(dataActions.setIsEditingRoadObject, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
