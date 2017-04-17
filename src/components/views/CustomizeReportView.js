import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Picker,
  } from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import moment from 'moment';

import Container from '../misc/Container'

import PropertyValue from '../misc/PropertyValue';

import * as templates from '../../utilities/templates'
import * as reportActions from '../../actions/reportActions'
import * as dataActions from '../../actions/dataActions'
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

/*
View that shows information about a single report
*/
var CustomizeReportView = React.createClass({
  componentDidMount() {
    if(this.chosenErrorType==="NEW"){
      this.reportObject();
    }


  },

  render() {
    return <Container>
      <Text>asd</Text>

    </Container>
  },
  reportObject() {
    const description = 'Ikke beskrevet'
    const date = moment().format('MMMM Do YYYY, h:mm:ss a')
    const reportObject = {
      roadObject: this.props.roadObject,
      description: description,
      date: date,
    }
    this.props.reportRoadObject(reportObject, this.props.currentRoadSearch)
    this.props.setReportObject(reportObject)
  },

  asd() {
    return <View style={{flex:0.5}}>
      <Picker
      selectedValue={this.props.chosenErrorType}
      onValueChange={(value) => {
        this.props.setErrorType(value)}}>
      <Picker.Item label="Ikke definert" value="Ikke definert" />
      <Picker.Item label="Mangler egengeometri" value="Mangler egengeometri" />
      </Picker>
    </View>
  },


});

var styles = StyleSheet.create({


})

function mapStateToProps(state) {
  return {
    theme: state.settingsReducer.themeStyle,
    chosenErrorType: state.reportReducer.chosenErrorType,
    reportViewType: state.reportReducer.reportViewType,
    roadObject: state.reportReducer.roadObject,

  };}

  function mapDispatchToProps(dispatch) {
    return {
      reportRoadObject: bindActionCreators(dataActions.reportRoadObject, dispatch),

      setErrorType: bindActionCreators(reportActions.setErrorType, dispatch),
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps) (CustomizeReportView);
