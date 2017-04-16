import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Container from '../misc/Container'

import * as templates from '../../utilities/templates'
import * as reportActions from '../../actions/reportActions'
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

/*
View that shows information about a single report
*/
var ReportView = React.createClass({
  componentDidMount() {
    console.log(this.props.currentRoadSearch)
  },

  render() {
    return <Container>
        {this.renderReportObjects()}


    </Container>
  },

  renderReportObjects() {
    if(this.props.currentRoadSearch.report) {
      return <ListView
        // Create the data source. Sort by date created (descending, newest first)
        dataSource={ds.cloneWithRows(this.props.currentRoadSearch.report)}
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

  // Render each saved road search row
  renderRow(reportObject, sectionID, rowID, highlightRow) {

    //TODO should open more info about roadObject when pressed

    //TODO Feiltype, valgt på kart ikke tekst slik det er nå

    return <TouchableHighlight
      key={rowID}
      style={[styles.row, this.props.theme.container]}>
      <View>
        <Text style={this.props.theme.text}>{reportObject.date}</Text>
        <Text style={this.props.theme.title}>VegobjektID: {reportObject.roadObject.id}</Text>
        <Text style={this.props.theme.text}>Objekttype: {}
          {reportObject.roadObject.metadata.type.navn}
          ({reportObject.roadObject.metadata.type.id})
        </Text>
        <Text/>
        <View style={{flexDirection: "row", alignItems: 'center'}}>
        <Text style={[this.props.theme.subtitle, {color: templates.colors.orange, fontWeight: 'bold'}]}>
          Feil: </Text>
        <Text style={[this.props.theme.text, {color: templates.colors.orange}]}>
          Mangler egengeometri</Text>
      </View>
      </View>
    </TouchableHighlight>
  },

  renderFooter() {
    return <View style={styles.footerStyle}>
    </View>
  },
});

var styles = StyleSheet.create({
  row: {
    padding: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  footerStyle: {
    padding: 10,
    alignItems: 'center',
  }

})

function mapStateToProps(state) {
  return {
    theme: state.settingsReducer.themeStyle,
    currentRoadSearch: state.dataReducer.currentRoadSearch,
  };}

  function mapDispatchToProps(dispatch) {
    return {
      //dataActions
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps) (ReportView);
