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

//needs access to fetching state etc
//this.props.fetching

var LoadingView = React.createClass({
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
            <Text style={styles.text}> Kommune er {this.props.kommune_navn}</Text>
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
      Actions.currentSearchView();
    }
  }
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

//trenger nok ingen actions
function mapStateToProps(state) {
  return {
    fetching: state.dataReducer.fetching,
    fetched: state.dataReducer.fetched,
    kommune_navn: state.dataReducer.kommune[0].navn,
    objects_size: state.dataReducer.numberOfObjects,
  };}
//function mapDispatchToProps(dispatch) {return bindActionCreators(userActions, dispatch);}
export default connect(mapStateToProps, null) (LoadingView);
