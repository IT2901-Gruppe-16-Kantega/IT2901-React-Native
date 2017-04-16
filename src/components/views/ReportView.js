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
      <View style={styles.frame}>
        <View style={{flex: 1}}><Text/></View>
        {this.renderReportObjects()}
        <View style={{flex: 1}}><Text/></View>

      </View>

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
        <Button text={"Gjør et søk"} onPress={Actions.SearchView} />
      </View>
    }
  },

  // Render each saved road search row
  renderRow(reportObject, sectionID, rowID, highlightRow) {


    return <TouchableHighlight
      onPress={()=>console.log('asd')}
      key={rowID}
      style={[styles.row, this.props.theme.container]}>
      <View>
        <Text style={this.props.theme.text}>1</Text>
        <Text style={this.props.theme.title}>2</Text>
        <Text style={this.props.theme.text}>2</Text>
        <View style={{alignItems: 'flex-end'}}>
        <Text style={[this.props.theme.subtitle, {color: templates.colors.orange, fontWeight: 'bold'}]}>3</Text>
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
