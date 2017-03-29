import React, { Component } from 'react';
import {
  View,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../misc/Button'

import * as templates from '../../utilities/templates';
import * as dataActions from '../../actions/dataActions';
import * as mapActions from '../../actions/mapActions';

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
        underlayColor={templates.colors.blue}
        onPress={() => this.props.selectFilter(rowData)}
        >
        <View style={styles.sidebarItem}>
          <Text style={styles.sidebarItemTitle}>{rowData.navn}</Text>
          <Text style={styles.sidebarItemDescription}>{rowData.beskrivelse}</Text>
        </View>
      </TouchableHighlight>
    )
  }
})

var styles = StyleSheet.create({
  sidebarItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: templates.colors.middleGray,
  },
  sidebarItemTitle: {
    fontWeight: 'bold',
    color: templates.colors.darkGray,
  },
  sidebarItemDescription: {
    color: templates.colors.darkGray,
    fontSize: 11,
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
