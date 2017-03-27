import React, { Component } from 'react';
import {
  View,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as templates from '../utilities/templates';
import * as dataActions from '../actions/dataActions';
import * as mapActions from '../actions/mapActions';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var SidebarMain = React.createClass({
  render() {
    return <View style={StyleSheet.flatten([templates.sidebar, this.props.sidebarFrame])}>
      <ListView
        dataSource={ds.cloneWithRows(this.props.objekttypeInfo.egenskapstyper)}
        renderRow={this.renderRow}
        enableEmptySections={true}
      />
    </View>
  },

  componentDidUpdate() {
    console.log(this.props.sidebarFrame);
  },

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight
        key={rowID}
        onPress={() => this.props.selectFilter(rowData)}
        style={styles.sidebarItemContainer}>
        <View style={styles.sidebarItem}>
          <Text style={styles.sidebarItemTitle}>{rowData.navn}</Text>
          <Text style={styles.sidebarItemDescription}>{rowData.beskrivelse}</Text>
        </View>
      </TouchableHighlight>
    )
  }
})

var styles = StyleSheet.create({
  sidebarItemContainer: {
    borderRadius: 10,
  },
  sidebarItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  sidebarItemTitle: {
    color: templates.colors.white,
  },
  sidebarItemDescription: {
    color: 'lightgrey',
    fontSize: 10,
  },
})

function mapStateToProps(state) {
  return {
    sidebarFrame: state.mapReducer.sidebarFrame,
    objekttypeInfo: state.dataReducer.objekttypeInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectFilter: bindActionCreators(mapActions.selectFilter, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (SidebarMain);
