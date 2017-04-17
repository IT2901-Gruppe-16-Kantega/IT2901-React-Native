import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Picker,
  TextInput,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import moment from 'moment';

import Container from '../misc/Container'
import Button from '../misc/Button'

import PropertyValue from '../misc/PropertyValue';

import * as templates from '../../utilities/templates'
import * as reportActions from '../../actions/reportActions'
import * as dataActions from '../../actions/dataActions'
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2})

//flytt til annet sted
const FEILTYPER = ["Ikke definert", "Mangler egengeometri"]

/*
View that shows information about a single report
*/
//TODO maybe the reportobject should be stored when when compentUnmount
var CustomizeReportView = React.createClass({
  componentWillMount() {
    if(this.props.reportViewType==="NEW"){
      this.createReportObject();
    }
    else {
      this.props.setErrorType(this.props.reportObject.description)
    }
  },

  render() {
    if(this.props.reportObject===undefined){
      return <Container></Container>
    }
    else {
      return <Container>
        {this.createRoadObjectInfo()}
        {this.createErrorInfo()}

      </Container>
    }
  },
  createRoadObjectInfo() {
    console.log(this.props.reportObject)
      return <View style={styles.roadObjectInfo}>
        <Text style={this.props.theme.title}>Rapport</Text>
        <Text style={this.props.theme.text}>{this.props.reportObject.date}</Text>
        <PropertyValue property={"VegobjektID"} value={this.props.reportObject.roadObject.id} />
        <PropertyValue property={"Vegobjekttype"} value={this.props.reportObject.roadObject.metadata.type.navn+"("+this.props.reportObject.roadObject.metadata.type.id+")"} />
      </View>
  },
  createObjectEgenskaper() {
    //lag fleksibel liste over alle egenskaper til objektet
    //klikk på en egenskap for markering som feil
  },
  createErrorInfo() {
    return <View style={styles.errorInfo}>
      <View style={{alignItems: 'center'}}>
        <Text style={this.props.theme.title}>Feiltype: {}</Text>
      </View>
      <Picker
        selectedValue={this.props.chosenErrorType}
        onValueChange={(value) => this.props.setErrorType(value)}>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  },



  createReportObject() {
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

  //TODO this should handle saving the reportObject
  componentWillUnmount() {
    console.log('sssss')
  },


});

var styles = StyleSheet.create({
  roadObjectInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  errorInfo: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },


})

function mapStateToProps(state) {
  return {
    theme: state.settingsReducer.themeStyle,
    chosenErrorType: state.reportReducer.chosenErrorType,
    reportObject: state.reportReducer.reportObject,
    reportViewType: state.reportReducer.reportViewType,
    roadObject: state.reportReducer.roadObject,
    reportViewType: state.reportReducer.reportViewType,
    currentRoadSearch: state.dataReducer.currentRoadSearch,

  };}

  function mapDispatchToProps(dispatch) {
    return {
      reportRoadObject: bindActionCreators(dataActions.reportRoadObject, dispatch),
      setReportObject: bindActionCreators(reportActions.setReportObject, dispatch),
      setErrorType: bindActionCreators(reportActions.setErrorType, dispatch),
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps) (CustomizeReportView);
