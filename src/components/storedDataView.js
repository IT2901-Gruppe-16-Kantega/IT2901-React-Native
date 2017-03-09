// View that shows all stored data
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight

} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as dataActions from '../actions/dataActions'
import * as templates from '../utilities/templates'
import Accordion from 'react-native-collapsible/Accordion';


var StoredDataView = React.createClass({
  componentWillMount() {
    console.log(this.props.allSearches);
  },
  _renderHeader(section) {
    return (
      <View>
        <Text style={styles.text}>
          {section.searchParameters[0].navn} on:
           {section.date}
        </Text>
      </View>
    );
  },

  _renderContent(section) {
    return (
      <View>
        <Text>Description: {section.description}
          Number of objects: {section.roadObjects.length}
        </Text>
        <TouchableHighlight
          style= {templates.smallButton}
          underlayColor="azure"
          onPress = {() => this.buttonPress(section)}
          >
          <Text style={{color: templates.textColorWhite}}>Open</Text>
        </TouchableHighlight>
      </View>
    );
  },
  render() {
    return <View style={styles.container}>
      <View style={styles.top}/>
      <View style={styles.header}>
        <Text style={{color: templates.textColorWhite}}>NVDB-app</Text>
      </View>
      <View style={styles.contents}>
        <Accordion
          sections={this.props.allSearches}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          />
      </View>
      <View style={styles.footer}>
        <Text style={{color: templates.gray}}>Gruppe 16 NTNU</Text>
      </View>
    </View>
  },
  buttonPress(section){
    this.props.setCurrentRoadSearch(section);
    console.log(section);
    Actions.currentSearchView();
    //do something
  }
});




//function mapDispatchToProps(dispatch) {return bindActionCreators(storedDataActions, dispatch);}
function mapStateToProps(state) {
  return {
    allSearches: state.dataReducer.allSearches,
  };}

  function mapDispatchToProps(dispatch) {
    return {
      //dataActions
      setCurrentRoadSearch: bindActionCreators(dataActions.setCurrentRoadSearch, dispatch),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps) (StoredDataView);

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
    footer: {
      flex:0.7,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: templates.textColorWhite,
    },
  })
