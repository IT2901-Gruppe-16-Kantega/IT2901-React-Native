// view shown when fetching/loading data
import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as templates from '../utilities/templates'
import * as dataActions from '../actions/dataActions'
import * as searchActions from '../actions/searchActions'
import {fetchFromAPI_all, fetchTotalNumberOfObjects} from '../utilities/wrapper'

var baseURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/96';
var preFetchURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/96/statistikk';

var LoadingView = React.createClass({


  //create URL happens here here
  componentWillMount() {
    //prefetches total number of objects to be fetched
    var preUrl = preFetchURL+'?kommune='+this.props.kommune.nummer;
    var numberOfObjectsToBeFetched = 0;
    fetchTotalNumberOfObjects(preUrl).then(function(response){
      numberOfObjectsToBeFetched = response.antall;
      this.props.setNumberOfObjectsToBeFetched(numberOfObjectsToBeFetched);
    }.bind(this));

    //Creates url and fetches objects
    var url = baseURL+'?kommune='+this.props.kommune.nummer+'&inkluder=alle&srid=4326&antall=8000';
    this.props.fetchDataStart();
    fetchFromAPI_all(this.props.fetchDataReturned, url);

  },
  render() {
    return <View style={templates.container}>
      <View style={templates.top}/>
      <View style={styles.header}>
        <Text style={{color: templates.textColorWhite}}>NVDB-app</Text>
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
            <Text style={styles.text}> Some information about progress:</Text>
            <Text style={styles.text}></Text>
            <Text style={styles.text}> Kommune, er {this.props.kommune.navn}</Text>
            <Text style={styles.text}> Antall objekter hentet er {this.props.numberOfObjectsFetchedSoFar}</Text>
            <Text style={styles.text}> Antall objekter som skal hentes er {this.props.numberOfObjectsToBeFetched}</Text>

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
    if(this.props.fetched==true){
      this.props.createSearchObject(
        'description',
        this.props.objects,
        'report',
        this.props.combinedSearchParameters);
        this.props.resetSearchParameters();
        Actions.currentSearchView();
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
      Actions.startingView();
    }
    */
  });



  function mapStateToProps(state) {
    return {
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
    };}

    function mapDispatchToProps(dispatch) {
      return {
        //dataActions
        fetchDataStart: bindActionCreators(dataActions.fetchDataStart, dispatch),
        fetchDataReturned: bindActionCreators(dataActions.fetchDataReturned, dispatch),
        createSearchObject: bindActionCreators(dataActions.createSearchObject, dispatch),
        setNumberOfObjectsToBeFetched: bindActionCreators(dataActions.setNumberOfObjectsToBeFetched, dispatch),
        resetSearchParameters: bindActionCreators(searchActions.resetSearchParameters, dispatch),
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
        backgroundColor: templates.gray
      },
      contents: {
        flex: 10.5,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: templates.gray
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
        color: templates.textColorWhite,
      },
    })
