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

import PropertyValue from '../misc/PropertyValue'

import {fetchFromAPI_all, fetchObjekttypeInfo, fetchTotalNumberOfObjects} from '../../utilities/wrapper'
import * as templates from '../../utilities/templates'
import * as dataActions from '../../actions/dataActions'
import * as mapActions from '../../actions/mapActions'
import * as searchActions from '../../actions/searchActions'

const baseURL = 'https://www.vegvesen.no/nvdb/api/v2/';

/*
view shown when fetching/loading data
*/
var LoadingView = React.createClass({
  //create URL happens here here
  componentWillMount() {
    console.log('loadingView')

    //prefetches total number of objects to be fetched
    const preFetchURL = 'vegobjekter/96/statistikk';
    /*const preURL = baseURL + preFetchURL + '?kommune=' + this.props.kommune.nummer;
    var numberOfObjectsToBeFetched = 0;
    fetchTotalNumberOfObjects(preURL).then(function(response) {
      numberOfObjectsToBeFetched = response.antall;
      this.props.setNumberOfObjectsToBeFetched(numberOfObjectsToBeFetched);
    }.bind(this));*/

    fetchObjekttypeInfo(this.props.combinedSearchParameters[2].id, function(data) {
      this.props.setObjekttypeInfo(data);

      // SELECT THE FIRST FILTER AS DEFAULT FOR THE MAPVIEW
      this.props.selectedFilter = data.egenskapstyper[0];

      console.log(this.props.url);
      fetchFromAPI_all(this.props.fetchDataReturned, this.props.url);
    }.bind(this));

    this.props.fetchDataStart();
  },

  render() {
    return <View style={templates.container}>
      <View style={templates.top}/>
      <View style={styles.header}>
        <Text style={{color: templates.colors.white}}>NVDB-app</Text>
      </View>
      <View style={styles.contents}>
        <ActivityIndicator
          animating={this.props.fetching}
          style={[styles.fetchingStatus, {height: 80}]}
          size="large"
        />
        <View style={styles.fetchingInfo}>
          <View style={styles.padding}/>
          <View style={styles.progressInfo}>
            <Text style={styles.text}>Informasjon om søket:</Text>
            <PropertyValue property={"Antall objekter hentet"} value={this.props.numberOfObjectsFetchedSoFar} />
            <PropertyValue property={"Antall objekter totalt"} value={this.props.numberOfObjectsToBeFetched} />
        </View>
        </View>
      </View>
      <View style={templates.footer}>
        <Text style={{color: templates.gray}}>Gruppe 16 NTNU</Text>
      </View>
    </View>
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

    /* Cancel is urrently deprecated because the fetch is in wrapper is not cancelled
        Need to find a way to stop the ongoing fetch in wrapper
        <TouchableHighlight
          style= {templates.smallButton}
          underlayColor="azure"
          onPress = {this.cancelSearch}
          >
          <Text style={{color: templates.textColorWhite}}>Cancel</Text>
        </TouchableHighlight>
    cancelSearch() {
      this.props.resetSearchParameters();
      this.props.resetFetching();
      Actions.StartingView();
    }
    */
  });

  function mapStateToProps(state) {
    return {
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
      selectedFilter: state.mapReducer.selectedFilter,
    };}

    function mapDispatchToProps(dispatch) {
      return {
        //dataActions
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

    var styles = StyleSheet.create({
      //Top-leve containers

      header: {
        flex: 7.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: templates.colors.white
      },
      contents: {
        flex: 10.5,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: templates.colors.white
      },
      fetchingStatus: {  //used by fetching status
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
      },
      fetchingInfo: {
        flex: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      padding: {
        flex: 0.4,
      },
      progressInfo: {
        flex: 1.5,
      },
      text: {
        color: templates.colors.darkGray,
      },
    })