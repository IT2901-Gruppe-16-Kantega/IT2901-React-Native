// view shown when fetching/loading data
import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as templates from '../utilities/templates'

//import only the actions that we need
import * as dataActions from '../actions/dataActions'
import * as searchActions from '../actions/searchActions'

import {fetchFromAPI_all} from '../utilities/wrapper'


var baseURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/96';

//needs access to fetching state etc
//this.props.fetching

var LoadingView = React.createClass({
  componentWillMount() {
    var url = baseURL+'?kommune='+this.props.kommune.nummer+'&inkluder=alle&srid=4326';
    this.props.fetchDataStart();
    fetchFromAPI_all(this.props.fetchDataReturned, url);

  },
  render() {
    return <View style={styles.container}>
      <View style={styles.top}/>
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
            <Text style={styles.text}> Antall objekter hentet er {this.props.objects_size}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={{color: templates.gray}}>Gruppe 16 NTNU</Text>
      </View>
    </View>
  },
  //may change to componentWillUpdate if we want it to be called before props change
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

  });


  var styles = StyleSheet.create({
    container: {
      flex: 1,
      //justifyContent: 'center',
      alignItems: 'stretch',
    },
    //Top-leve containers
    top: {
      flex: 0.7
    },
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
    footer: {
      flex:0.7,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: templates.textColorWhite,
    },
  })

  function mapStateToProps(state) {
    return {
      combinedSearchParameters: state.searchReducer.combinedSearchParameters,

      fetching: state.dataReducer.fetching,
      fetched: state.dataReducer.fetched,

      kommune: state.searchReducer.kommune_input,
      objects: state.dataReducer.objects,
      objects_size: state.dataReducer.numberOfObjects,
    };}

    function mapDispatchToProps(dispatch) {
      return {
        fetchDataStart: bindActionCreators(dataActions.fetchDataStart, dispatch),
        fetchDataReturned: bindActionCreators(dataActions.fetchDataReturned, dispatch),
        createSearchObject: bindActionCreators(dataActions.createSearchObject, dispatch),
        resetSearchParameters: bindActionCreators(searchActions.resetSearchParameters, dispatch)
      }
    }
    export default connect(mapStateToProps, mapDispatchToProps) (LoadingView);
