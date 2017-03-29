import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Accordion from 'react-native-collapsible/Accordion';

import Button from '../misc/Button'
import PropertyValue from '../misc/PropertyValue'

import * as templates from '../../utilities/templates'
import * as dataActions from '../../actions/dataActions'

/*
View that shows all stored data
*/
var StoredDataView = React.createClass({
  render() {
    return <View style={templates.container}>
      <View style={templates.top}/>
      <View style={styles.header}>
        <Text style={{color: templates.colors.darkGray}}>NVDB-app</Text>
      </View>
      <View style={styles.contents}>
        <Accordion
          sections={this.props.allSearches}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
          />
      </View>
      <View style={templates.footer}>
        <Text style={{color: templates.darkGray}}>Gruppe 16 NTNU</Text>
      </View>
    </View>
  },

  buttonPress(section){
    this.props.setCurrentRoadSearch(section);
    Actions.CurrentSearchView();
  },

  _renderHeader(section) {
    return (
      <View style={styles.accordionHeader}>
        <PropertyValue property={"Fylke"} value={section.searchParameters[0].navn} />
      </View>
    );
  },

  //must do padding better than empty textcomponents
  _renderContent(section) {
    return (
      <View style={styles.accordionFrame}>
        <View style={styles.accordionContents}>

          <PropertyValue property={"Antall vegobjekter"} value={section.roadObjects.length} />
          <PropertyValue property={"Beskrivelse"} value={section.description} />
          <PropertyValue property={"Dato"} value={section.date} />

          <Button
            style={"small"}
            onPress={this.buttonPress.bind(this, section)}
            text={"Åpne"}
          />
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
    backgroundColor: templates.colors.white
  },
  contents: {
    flex: 14,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: templates.colors.white
  },
  accordionHeader: {
    //flex:1,
    borderColor: "white",
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.orange,
    padding: 10

  },
  accordionFrame: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.white,
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
    backgroundColor: templates.colors.middleGray,

  },
  accordionContentsPadding: {
    flex: 0.1,
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
    setCurrentRoadSearch: bindActionCreators(dataActions.setCurrentRoadSearch, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (StoredDataView);
