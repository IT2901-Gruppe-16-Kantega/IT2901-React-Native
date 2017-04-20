import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Share,
  } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Container from '../misc/Container'

import * as templates from '../../utilities/templates'
import * as dataActions from '../../actions/dataActions'

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

/*
View that shows information about reports
*/
var ReportView = React.createClass({
  render() {
    return <Container>
        {this.renderReportObjects()}
    </Container>
  },

  renderReportObjects() {
    const {report} = this.props.currentRoadSearch;
    if(report.length > 0) {
      return <ListView
        dataSource={ds.cloneWithRows(report)}
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
        enableEmptySections={true}
      />
    } else {
      return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text>Ingen rapporter registrert...</Text>
      </View>
    }
  },

  renderRow(reportItem) {
    return (
      <TouchableHighlight onPress={() => this.goToObjectInfoView(reportItem.vegobjekt)}>
        <Text>{reportItem.vegobjekt}</Text>
      </TouchableHighlight>
    );
  },

  renderFooter() {
    const message = JSON.stringify(this.props.currentRoadSearch.report);
    return (
      <View>
        <TouchableHighlight onPress={() => Share.share({ message: message })}>
          <Text>Del</Text>
        </TouchableHighlight>
      </View>
    );
  },

  goToObjectInfoView(objectID) {
    const object = this.props.currentRoadSearch.roadObjects.find(o => o.id === objectID);
    this.props.selectObject(object);
    Actions.ObjectInfoView();
  }
});

var styles = StyleSheet.create({
})

function mapStateToProps(state) {
  return {
    theme: state.settingsReducer.themeStyle,
    currentRoadSearch: state.dataReducer.currentRoadSearch,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectObject: bindActionCreators(dataActions.selectObject, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (ReportView);
