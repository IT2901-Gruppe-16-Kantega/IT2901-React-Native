// View that shows all stored data
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as dataActions from '../actions/dataActions'
import * as templates from '../utilities/templates'
import Accordion from 'react-native-collapsible/Accordion';

import userDefaults from 'react-native-user-defaults'

var StoredDataView = React.createClass({
  componentDidMount() {
    //this.props.startAsyncLoading();
  },

  render() {
    return <View style={templates.container}>
      <View style={templates.top}/>
      <View style={styles.header}>
        <Text style={{color: templates.colors.white}}>NVDB-app</Text>
      </View>
      <View style={styles.contents}>
        <Accordion
          sections={this.props.allSearches}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          />
      </View>
      <View style={templates.footer}>
        <Text style={{color: templates.gray}}>Gruppe 16 NTNU</Text>
      </View>
    </View>
  },

  buttonPress(section){
    this.props.setCurrentRoadSearch(section);
    Actions.currentSearchView();
  },

  _renderHeader(section) {
    return (
      <View style={styles.accordionHeader}>
        <Text style={styles.text}>
          Kommune: {section.searchParameters[0].navn}
        </Text>
      </View>
    );
  },

  //must do padding better than empty textcomponents
  _renderContent(section) {
    return (
      <View style={styles.accordionFrame}>
        <View style={styles.accordionContents}>
          <Text></Text>
          <Text style={styles.text}>Antall vegobjekter: {section.roadObjects.length}</Text>
          <Text style={styles.text}>Beskrivelse: {section.description}</Text>
          <Text style={styles.text}>Dato: {section.date}</Text>


          <Text></Text>
          <TouchableHighlight
            style= {templates.smallButton}
            underlayColor="azure"
            onPress = {() => this.buttonPress(section)}
            >
            <Text style={styles.text}>Open</Text>
          </TouchableHighlight>
          <Text></Text>
        </View>

      </View>

    );
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
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'yellow'
    backgroundColor: templates.colors.darkGray
  },
  contents: {
    flex: 14,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: templates.colors.darkGray
  },
  accordionHeader: {
    //flex:1,
    borderColor: "white",
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.darkGray,
    padding: 10

  },
  accordionFrame: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.darkGray,
  },
  accordionContentsPadding: {
    flex: 0.1,
  },
  accordionContentsFrame: {

  },
  accordionContents: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8A9094',

  },
  accordionContentsPadding: {
    flex: 0.1,
  },
  text: {
    color: templates.colors.white,
  },
})

function mapStateToProps(state) {
  return {
    allSearches: state.dataReducer.allSearches,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //dataActions
    startAsyncLoading: bindActionCreators(dataActions.startAsyncLoading, dispatch),
    setCurrentRoadSearch: bindActionCreators(dataActions.setCurrentRoadSearch, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (StoredDataView);
