// react imports
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  Dimensions,
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

// redux imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// application view imports
import CurrentSearchView from './components/views/CurrentSearchView'
import LoadingView from './components/views/LoadingView'
import ObjectInfoView from './components/views/ObjectInfoView'
import ReportView from './components/views/ReportView'
import RoadMapView from './components/views/RoadMapView'
import RoadSelectView from './components/views/RoadSelectView'
import SearchView from './components/views/SearchView'
import SettingsView from './components/views/SettingsView'
import StartingView from './components/views/StartingView'
import StoredDataView from './components/views/StoredDataView'

// misc imports
import * as templates from './utilities/templates'
import * as dataActions from './actions/dataActions'
import * as mapActions from './actions/mapActions'

let ScreenWidth = Dimensions.get("window").width;

import storageEngine from './utilities/storageEngine'


class App extends Component {
  componentWillMount() {
    const storage = storageEngine('NVDB-storage')
    storage.initialize();
    var stored = storage.load();
    console.log(stored)
    this.props.loadSearches(stored)
  }
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            key="StartingView"
            component={StartingView}
            title=""
            hideNavBar={true}
            type='reset'
            initial={true}

            />
          <Scene
            key="SearchView"
            component={SearchView}
            title={<Text style={{color:"orange"}}></Text>}
            hideNavBar={false}
            navigationBarStyle={styles.navigatorStyle}
            />
          <Scene
            key="RoadSelectView"
            component={RoadSelectView}
            title="Velg veg" />
          <Scene
            key="StoredDataView"
            component={StoredDataView}
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
            hideNavBar={false} />
          <Scene
            key="RoadMapView"
            component={RoadMapView}
            title=""
            hideNavBar={false}
            onRight={ this.toggleSidebar.bind(this) }
            rightTitle="Filtrer"
            navigationBarStyle={styles.navigatorStyle} />
          <Scene
            key="ObjectInfoView"
            component={ObjectInfoView}
            sceneStyle={{paddingTop: 64}}
            title=""
            hideNavBar={false}
            rightTitle="Rediger"
            onRight={ () => console.log('hei') } />
        </Scene>
      </Router>
    )
  }

  toggleSidebar() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    var width = ScreenWidth / 2.2;
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
    loadSearches: bindActionCreators(dataActions.loadSearches, dispatch),
    setSidebarFrame: bindActionCreators(mapActions.setSidebarFrame, dispatch),
    toggleSecondSidebar: bindActionCreators(mapActions.toggleSecondSidebar, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
