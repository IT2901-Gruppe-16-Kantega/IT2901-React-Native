import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ListView,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import moment from 'moment';

import Button from '../misc/Button'
import PropertyValue from '../misc/PropertyValue'

import * as templates from '../../utilities/templates'
import * as dataActions from '../../actions/dataActions'

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

/*
View that shows all stored data
*/

/*
var roadSearch = {
  key: Date.now(),
  date: moment().format('MMMM Do YYYY, h:mm:ss a'),
  description: description,
  roadObjects: objects,
  report: report,
  searchParameters: combParams,
  objekttypeInfo: objekttypeInfo,
}
*/
var StoredDataView = React.createClass({
  render() {
    return <View style={templates.container}>
      <ListView
        dataSource={ds.cloneWithRows(this.props.allSearches.sort((a, b) => b.key - a.key))}
        renderRow={this.renderRow}
        enableEmptySections={true}
      />
    </View>
  },

  renderRow(roadSearch, sectionID, rowID, highlightRow) {
    const fylkeNavn = roadSearch.searchParameters[0];
    const kommuneNavn = roadSearch.searchParameters[1];
    const vegobjekttype = roadSearch.objekttypeInfo;

    return <View
      key={rowID}
      style={styles.row}>
      <Text>{moment(roadSearch.key).format("DD. MMM YYYY (HH:mm)")}</Text>
      <Text>{roadSearch.roadObjects.length}</Text>
      <Button style={"small"} onPress={this.openSearch.bind(this, roadSearch)} text={"Åpne"} />
    </View>
  },

  openSearch(section) {
    this.props.setCurrentRoadSearch(section);
    Actions.CurrentSearchView();
  },
});

var styles = StyleSheet.create({
  row: {
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: templates.colors.middleGray,
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
