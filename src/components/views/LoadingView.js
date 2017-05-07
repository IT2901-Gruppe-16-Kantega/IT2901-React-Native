import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Progress from 'react-native-progress';

import Button from '../misc/Button'
import Container from '../misc/Container'
import PropertyValue from '../misc/PropertyValue'

import {fetchFromAPI, fetchObjekttypeInfo, startSearch} from '../../utilities/wrapper'
import * as templates from '../../utilities/templates'

import * as dataActions from '../../actions/dataActions'
import * as mapActions from '../../actions/mapActions'
import * as searchActions from '../../actions/searchActions'

const ScreenWidth = Dimensions.get("window").width;

/*
view shown when fetching/loading data
*/
class LoadingView extends React.Component {
  componentWillMount() {
    /*fetchObjekttypeInfo(this.props.combinedSearchParameters.vegobjekttype.id, function(data) {
      this.props.setObjekttypeInfo(data);

      fetchFromAPI(this.props.fetchDataReturned, this.props.url);
    }.bind(this));*/
    this.props.fetchDataStart();

    const id = this.props.combinedSearchParameters.vegobjekttype.id;
    startSearch(id, this.props.url, this.props.statisticsURL, callback => {
      if(callback.number) this.props.setNumberOfObjectsToBeFetched(callback.number);
      if(callback.info) this.props.setObjekttypeInfo(callback.info);
      if(callback.roads) this.props.roadsReturned(callback.roads);
      if(callback.objects) this.props.objectsReturned(callback.objects);
    })
  }

  componentDidMount() {
    this.interval = setInterval(this.increment.bind(this), 1000);
  }

  increment() {
    this.props.incrementFakeProgress();
  }

  //this may be really bad as componentDidUpdate may be called a lot of times
  componentWillReceiveProps(nextProps) {
    if(nextProps.fetched !== this.props.fetched) {
      console.log("fetching done");
    }
  }

  componentDidUpdate() {
    console.log(this.props)
    //if(this.props.fetched) {
    if(this.props.numberOfObjectsToBeFetched > 0 && this.props.numberOfObjectsFetchedSoFar === this.props.numberOfObjectsToBeFetched && this.props.objekttypeInfo && this.props.roads.length > 0) {
      console.log("do it")
      this.props.createSearchObject(
        '', // description
        this.props.objects,
        this.props.roads, // roads
        [], // report
        this.props.combinedSearchParameters,
        this.props.objekttypeInfo
      );

      this.props.resetSearchParameters();
      this.props.resetFakeProgress();
      Actions.CurrentSearchView({type: 'reset'});
    }
  }

  render() {
    const {numberOfObjectsToBeFetched, numberOfObjectsFetchedSoFar} = this.props;
    const progress = numberOfObjectsFetchedSoFar / numberOfObjectsToBeFetched;

    return (
      <Container>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Progress.Circle
            size={ScreenWidth / 1.5}
            progress={progress}
            borderWidth={3}
            thickness={10}
            showsText={true}
            color={templates.colors.green} />
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={this.props.theme.title}>Informasjon om søket</Text>
            <PropertyValue property={"Veger hentet"} value={this.props.roads.length > 0 ? "JA" : "NEI"} />
            <PropertyValue property={"Vegobjekttypeinfo hentet"} value={this.props.objekttypeInfo ? "JA" : "NEI"} />

            <PropertyValue property={"Antall objekter hentet"} value={this.props.numberOfObjectsFetchedSoFar} />
            <PropertyValue property={"Antall objekter totalt"} value={this.props.numberOfObjectsToBeFetched} />
          </View>
        </View>
      </Container>
    );
  }

  randomColor() {
    const colors = [templates.colors.orange, templates.colors.blue, templates.colors.green];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

function mapStateToProps(state) {
  return {
    theme: state.settingsReducer.themeStyle,

    url: state.searchReducer.url,
    statisticsURL: state.searchReducer.statisticsURL,

    //Fields used when creating URL
    kommune: state.searchReducer.kommuneInput,

    //Needed when creating roadSearch object
    objects: state.dataReducer.objects,
    roads: state.dataReducer.roads,

    combinedSearchParameters: state.searchReducer.combinedSearchParameters,

    //Status information about search
    fetching: state.dataReducer.fetching,
    fetched: state.dataReducer.fetched,
    numberOfObjectsToBeFetched: state.dataReducer.numberOfObjectsToBeFetched,
    numberOfObjectsFetchedSoFar: state.dataReducer.numberOfObjectsFetchedSoFar,

    objekttypeInfo: state.dataReducer.objekttypeInfo,
    allSearches: state.dataReducer.allSearches,
    selectedFilter: state.filterReducer.selectedFilter,

    fakeProgress: state.searchReducer.fakeProgress,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDataStart: bindActionCreators(dataActions.fetchDataStart, dispatch),
    fetchDataReturned: bindActionCreators(dataActions.fetchDataReturned, dispatch),
    createSearchObject: bindActionCreators(dataActions.createSearchObject, dispatch),
    setNumberOfObjectsToBeFetched: bindActionCreators(dataActions.setNumberOfObjectsToBeFetched, dispatch),
    resetSearchParameters: bindActionCreators(searchActions.resetSearchParameters, dispatch),
    setObjekttypeInfo: bindActionCreators(dataActions.setObjekttypeInfo, dispatch),
    resetFetching: bindActionCreators(dataActions.resetFetching, dispatch),

    resetFakeProgress: bindActionCreators(searchActions.resetFakeProgress, dispatch),
    incrementFakeProgress: bindActionCreators(searchActions.incrementFakeProgress, dispatch),

    objectsReturned: bindActionCreators(dataActions.objectsReturned, dispatch),
    roadsReturned: bindActionCreators(dataActions.roadsReturned, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (LoadingView);
