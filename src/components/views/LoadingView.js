import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Progress from 'react-native-progress';

import Container from '../misc/Container'
import PropertyValue from '../misc/PropertyValue'

import {fetchFromAPI_all, fetchObjekttypeInfo, fetchTotalNumberOfObjects} from '../../utilities/wrapper'
import * as templates from '../../utilities/templates'
import * as dataActions from '../../actions/dataActions'
import * as mapActions from '../../actions/mapActions'
import * as searchActions from '../../actions/searchActions'

/*
view shown when fetching/loading data
*/
var LoadingView = React.createClass({
  componentWillMount() {
    fetchObjekttypeInfo(this.props.combinedSearchParameters[3].id, function(data) {
      this.props.setObjekttypeInfo(data);

      // SELECT THE FIRST FILTER AS DEFAULT FOR THE MAPVIEW
      this.props.selectedFilter = data.egenskapstyper[0];

      fetchFromAPI_all(this.props.fetchDataReturned, this.props.url);
    }.bind(this));

    this.props.fetchDataStart();
  },

  render() {
    return <Container>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Progress.CircleSnail
          animated={true}
          size={200}
          thickness={10}
          color={[templates.colors.orange, templates.colors.blue, templates.colors.green]} />
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={this.props.theme.title}>Informasjon om søket</Text>
          <PropertyValue property={"Antall objekter hentet"} value={this.props.numberOfObjectsFetchedSoFar} />
          <PropertyValue property={"Antall objekter totalt"} value={this.props.numberOfObjectsToBeFetched} />
        </View>
      </View>
    </Container>
  },

  //this may be really bad as componentDidUpdate may be called a lot of times
  componentDidUpdate() {
    if(this.props.fetched) {
      this.props.createSearchObject(
        'description',
        this.props.objects,
        'report',
        this.props.combinedSearchParameters,
        this.props.objekttypeInfo
      );

      this.props.resetSearchParameters();
      Actions.CurrentSearchView();
      }
    },
});

function mapStateToProps(state) {
  return {
    theme: state.settingsReducer.themeStyle,

    url: state.searchReducer.url,

    //Fields used when creating URL
    kommune: state.searchReducer.kommune_input,

    //Needed when creating roadSearch object
    objects: state.dataReducer.objects,
    combinedSearchParameters: state.searchReducer.combinedSearchParameters,

    //Status information about search
    fetching: state.dataReducer.fetching,
    fetched: state.dataReducer.fetched,
    numberOfObjectsToBeFetched: state.dataReducer.numberOfObjectsToBeFetched,
    numberOfObjectsFetchedSoFar: state.dataReducer.numberOfObjectsFetchedSoFar,

    objekttypeInfo: state.dataReducer.objekttypeInfo,
    allSearches: state.dataReducer.allSearches,
    selectedFilter: state.filterReducer.selectedFilter,
  };
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (LoadingView);
