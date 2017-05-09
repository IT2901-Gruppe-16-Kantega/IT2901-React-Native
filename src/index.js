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
	Linking
} from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';

import moment from 'moment';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import userDefaults from 'react-native-user-defaults'


// application view imports
import CurrentSearchView from './components/views/CurrentSearchView'
import HelpView from './components/views/HelpView'
import LoadingView from './components/views/LoadingView'
import ObjectInfoView from './components/views/ObjectInfoView'
import ReportView from './components/views/ReportView'
import RoadMapView from './components/views/RoadMapView'
import SearchView from './components/views/SearchView'
import SettingsView from './components/views/SettingsView'
import StartingView from './components/views/StartingView'
import StoredDataView from './components/views/StoredDataView'
import WelcomeView from './components/views/WelcomeView'

import MarkerCallout from './components/misc/MarkerCallout'
import NavigationBar from './components/misc/NavigationBar'

// misc imports
import storageEngine from './utilities/storageEngine'
import * as templates from './utilities/templates'
import { isAndroid } from './utilities/utils'

import * as dataActions from './actions/dataActions'
import * as filterActions from './actions/filterActions'
import * as mapActions from './actions/mapActions'
import * as searchActions from './actions/searchActions'
import * as settingsActions from './actions/settingsActions'
import * as uiActions from './actions/uiActions'

let ScreenWidth = Dimensions.get("window").width;

var scenes = null;

class App extends Component {
  componentDidMount() {
    Linking.addEventListener('url', this.handleDeepLink.bind(this));

    Linking.getInitialURL().then(url => {
      this.handleDeepLink(url);
    })

    this.props.setNavbarHeight(Navigator.NavigationBar.Styles.General.TotalNavHeight);

    this.load();
  }

  componentWillMount() {
  	if(isAndroid()) {
  		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  	}

    scenes = Actions.create(
      <Scene key="root">
        <Scene key="WelcomeView" component={WelcomeView} hideNavBar={true} />
        <Scene key="StartingView" component={StartingView} type='reset' initial={true} hideNavBar={true} />
        <Scene key="SearchView" component={SearchView} title="Nytt søk" hideNavBar={false} />
        <Scene key="StoredDataView" component={StoredDataView} title="Lagrede søk" hideNavBar={false} />
        <Scene key="SettingsView" component={SettingsView} title="Innstillinger" hideNavBar={false} />
        <Scene key="HelpView" component={HelpView} title="Hjelp" hideNavBar={false} />
        <Scene key="LoadingView" component={LoadingView} type='reset' hideNavBar={true} />
        <Scene key="CurrentSearchView" component={CurrentSearchView} title="Info om søk" hideNavBar={false} />
        <Scene key="ReportView" component={ReportView} title="Rapport" hideNavBar={false} />
        <Scene key="ObjectInfoView" component={ObjectInfoView} title="Objektinfo" hideNavBar={false} />
				<Scene key="MarkerCallout" component={MarkerCallout} hideNavBar={false} />
				<Scene key="RoadMapView"
          navigationBarStyle={{ backgroundColor: 'rgba(0,0,0,0) '}}
          component={RoadMapView}
          onRight={ () => this.toggleSidebar() }
          rightTitle="Filtrer"
          onBack={() => this.exitMap()} />
    </Scene>
    );
  }

  load(done) {
    const storage = storageEngine('NVDB-storage');
    storage.initialize();

    storage.getSettings((settings, firstOpen) => {
      if(firstOpen) Actions.WelcomeView({type: 'reset'})
    });

    var stored = storage.load(progress => {
      this.props.setLoadingProgress(progress);
    });
    this.props.loadSearches(stored)
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleDeepLink.bind(this))
  }

  render() {
    return (
      <Router
        scenes={scenes}
        navBar={NavigationBar}
        sceneStyle={{ paddingTop: this.props.navbarHeight }}>
      </Router>
    )
  }

  // Supported links:
  //...rapport/124123123123
  //...vegobjekter/96?fylke=16&kommune=1601&&vegreferanse=K5040&inkluder=alle&srid=4326&antall=8000
  getParameters(value) {
    var result = {};
    if(value && value.length > 1) {
      value.split("&").forEach(part => {
        const param = part.split("=");
        result[param[0]] = param[1] ? param[1] : null;
      })
    }
    console.log(result);
    return result;
  }

  getRoute(value) {
    const routeParts = value.split("/");

    const route = routeParts[0].toLowerCase();
    const id = parseInt(routeParts[1]);
    console.log(id)

    if(isNaN(id)) {
      return { type: 'feil', message: "Klarte ikke å tolke " + value }
    }
    else if(route == 'vegobjekter') {
      return { type: "søk", vegobjekttype: id };
    }
    else if(route === 'rapport') {
      return { type: "rapport", id: id }
    }
    else {
      return { type: 'main' }
    }
  }

  handleDeepLink(e) {
    const url = e ? e.url : e;
    if(!url) return;

    const decoded = decodeURI(url);
    this.props.setDeeplink(decoded);

    if(this.props.loadingProgress < 1) {
      setTimeout(() => {
        this.handleDeepLink(url);
      }, 100);
      return;
    }

    this.props.setDeeplink("");

    const parts = decoded.replace(/.*?:\/\//g, "").split("?");

    const route = this.getRoute(parts[0]);
    const params = this.getParameters(parts[1]);

    this.props.setDarkMode(params["natt"]);
    if(route.type === 'feil') {
      this.handleError(route.message);
    }
    else if(route.type === 'søk') {
      const vegobjekttype = route.vegobjekttype;
      const fylke = parseInt(params["fylke"]) || parseInt(params["f"]);
      const kommune = parseInt(params["kommune"]) || parseInt(params["k"]);
      const veg = params["vegreferanse"] || params["v"];

      if(vegobjekttype) { this.props.chooseVegobjekttyper(vegobjekttype) }
      if(fylke) { this.props.chooseFylke(fylke) }
      if(kommune) { this.props.chooseKommune(kommune) }
      if(veg) { this.props.inputVeg(veg) }

      this.props.generateURL();

      setTimeout(() => {
        const {fylkeInput, vegInput, kommuneInput, vegobjekttyperInput} = this.props;
        this.props.combineSearchParameters({
          fylke: fylkeInput ? fylkeInput[0] : null,
          veg: vegInput,
          kommune: kommuneInput ? kommuneInput[0] : null,
          vegobjekttype: vegobjekttyperInput ? vegobjekttyperInput[0] : null,
        });
        Actions.LoadingView();
      }, 10);
    }
    else if(route.type === 'rapport') {
      this.props.setCurrentRoadSearch(null);
      this.props.setCurrentRoadSearch(route.id);

      setTimeout(() => {
        if(this.props.currentRoadSearch) {
          if(isAndroid()) {
            const storage = storageEngine('NVDB-storage')
            storage.loadReport(id);
          }
          else {
            userDefaults.get("report", "group.vegar", (err, data) => {
              if(!err) {
                const obj = JSON.parse(data);
                for(var i = 0; i < obj.reportObjects.length; i++) {
                  const reportObject = obj.reportObjects[i];
                  this.props.selectObject(reportObject.vegobjekt);
                  for(var j = 0; j < reportObject.endringer.length; j++) {
                    const change = reportObject.endringer[j];
                    this.props.reportChange(this.props.currentRoadSearch, this.props.selectedObject, change);
                  }
                }
              }
            }).catch(err => console.log(err))
          }
          Actions.CurrentSearchView();
          //Actions.ReportView();
        } else {
          alert("Søket med ID " + route.id + " finnes ikke.")
        }
      }, 10);
    } else {
      Actions.StartingView();
    }
  }

  handleError(message) {
    alert(message)
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
    navigationBarStyle: state.settingsReducer.themeStyle.navigationBarStyle,
    loadingProgress: state.dataReducer.loadingProgress,
    sidebarFrame: state.mapReducer.sidebarFrame,
    isEditingRoadObject: state.dataReducer.isEditingRoadObject,
    reportViewType: state.reportReducer.reportViewType,

    vegobjekttyperInput: state.searchReducer.vegobjekttyperInput,
    fylkeInput: state.searchReducer.fylkeInput,
    kommuneInput: state.searchReducer.kommuneInput,
    vegInput: state.searchReducer.vegInput,

    currentRoadSearch: state.dataReducer.currentRoadSearch,
    selectedObject: state.dataReducer.selectedObject,

    navbarHeight: state.uiReducer.navbarHeight,
    deeplink: state.uiReducer.deeplink,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeAllFilters: bindActionCreators(filterActions.removeAllFilters, dispatch),
    loadSearches: bindActionCreators(dataActions.loadSearches, dispatch),
    setLoadingProgress: bindActionCreators(dataActions.setLoadingProgress, dispatch),
    setSidebarFrame: bindActionCreators(mapActions.setSidebarFrame, dispatch),
    toggleSecondSidebar: bindActionCreators(mapActions.toggleSecondSidebar, dispatch),

    inputVegobjekttyper: bindActionCreators(searchActions.inputVegobjekttyper, dispatch),
    inputFylke: bindActionCreators(searchActions.inputFylke, dispatch),
    inputKommune: bindActionCreators(searchActions.inputKommune, dispatch),

    chooseVegobjekttyper: bindActionCreators(searchActions.chooseVegobjekttyper, dispatch),
    chooseFylke: bindActionCreators(searchActions.chooseFylke, dispatch),
    chooseKommune: bindActionCreators(searchActions.chooseKommune, dispatch),
    inputVeg: bindActionCreators(searchActions.inputVeg, dispatch),

    combineSearchParameters: bindActionCreators(searchActions.combineSearchParameters, dispatch),
    generateURL: bindActionCreators(searchActions.generateURL, dispatch),

    setDarkMode: bindActionCreators(settingsActions.setDarkMode, dispatch),
    setCurrentRoadSearch: bindActionCreators(dataActions.setCurrentRoadSearch, dispatch),
    selectObject: bindActionCreators(dataActions.selectObject, dispatch),
    reportChange: bindActionCreators(dataActions.reportChange, dispatch),

    setNavbarHeight: bindActionCreators(uiActions.setNavbarHeight, dispatch),
    setDeeplink: bindActionCreators(uiActions.setDeeplink, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
