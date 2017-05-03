import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ListView,
  TouchableHighlight,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
var Color = require('color');

import Button from '../misc/Button';
import Container from '../misc/Container';
import PropertyValue from '../misc/PropertyValue';
import SettingSwitch from '../misc/SettingSwitch';

import * as templates from '../../utilities/templates';
import {datatype} from '../../utilities/values';

import * as dataActions from '../../actions/dataActions';
import * as reportActions from '../../actions/reportActions';
import * as uiActions from '../../actions/uiActions';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

/*
Shows information about a selected object
*/

const reportType = {
  NEW: 'EGENSKAP_NY',
  CHANGED: 'EGENSKAP_ENDRET',
  WRONG: 'EGENSKAP_FEIL',
}

class ObjectInfoView extends React.Component {
  componentWillMount() {
  	if(Platform.OS === "android") {
  		UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  	}
  }

  render() {
    const {selectedObject, objekttypeInfo} = this.props;
    const {metadata} = selectedObject;

    return <Container>
        <View style={this.mainBoxStyle()}>
          <Text style={this.props.theme.title}>{objekttypeInfo.navn}</Text>
          <PropertyValue property={"ID"} value={selectedObject.id} />
          <PropertyValue property={"Beskrivelse"} value={objekttypeInfo.beskrivelse} />
          <PropertyValue property={"Stedfesting"} value={objekttypeInfo.stedfesting} />
          <PropertyValue property={"Startdato"} value={metadata.startdato} />
          <PropertyValue property={"Sist modifisert"} value={metadata.sist_modifisert} />
        </View>
        <ListView
          keyboardShouldPersistTaps='always'
          style={{marginBottom: this.props.keyboardPadding}}
          dataSource={ds.cloneWithRows(selectedObject.egenskaper)}
          renderHeader={this.renderHeader.bind(this)}
          renderRow={this.renderRow.bind(this)}
          enableEmptySections={true}
        />
    </Container>
  }

  renderHeader() {
    const {isEditingRoadObject, theme} = this.props;
    return (
      <View>
        <View style={{ justifyContent: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: theme.primaryTextColor, paddingTop: 10, paddingBottom: 10 }}>
          <Button type={"small"} text={isEditingRoadObject ? "Avbryt" : "Legg til egenskap"} onPress={() => this.props.setIsEditingRoadObject(!isEditingRoadObject)} />
          <Button type={"small"} text={this.props.showReport ? "Skjul rapport" : "Vis rapport"} onPress={() => this.props.setShowReport(!this.props.showReport)} />
        </View>
        <View style={{ }}>
          {this.props.newProperty && this.renderRow(this.props.newProperty)}
          {this.renderReport()}
          {isEditingRoadObject && this.renderNotExistingProperties()}
          <View style={{height: 1, backgroundColor: theme.secondaryTextColor, marginTop: 10 }}/>
          <Text style={[this.props.theme.title, { marginTop: 10 }]}>Objektegenskaper</Text>
        </View>
      </View>
    );
  }

  renderReport() {
    const report = this.getReport();
    const {theme} = this.props;

    if(!((report && report.endringer.length > 0) && this.props.showReport)) { return <View /> }
    return (
      <View style={{ paddingTop: 10 }}>
        <Text style={theme.title}>Rapport</Text>
        <ListView
          dataSource={ds.cloneWithRows(report.endringer)}
          renderRow={this.renderReportChange.bind(this)}
          enableEmptySections={true}
        />
      </View>
    );
  }

  renderReportChange(change, sectionID, rowID) {
    const {theme} = this.props;

    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
          <Button type={"small"} text={"X"} onPress={this.removeFromReport.bind(this, change)} />
        </View>
        <View style={{ flex: 1, padding: 5, borderBottomWidth: 1, borderBottomColor: theme.placeholderTextColor }} key={rowID + 'change'}>
          <Text style={theme.subtitle} >
            <Text>{change.egenskap.navn + " (" + change.type + ")"}</Text>
          </Text>
          <PropertyValue property={"Verdi"} value={change.egenskap.verdi} />
          {change.egenskap.beskrivelse && <PropertyValue property={"Kommentar"} value={change.egenskap.beskrivelse} />}
          <PropertyValue property={"Tidspunkt"} value={change.dato} />
        </View>
      </View>
    );
  }

  removeFromReport(change) {
    this.props.reportChange(this.props.currentRoadSearch, this.props.selectedObject, change, true);
    this.forceUpdate();
  }

  renderRow(property, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight style={this.propertyContainerStyle(property)}
        underlayColor={"lightgray"}
        onPress={this.selectProperty.bind(this, property)}>
        <View>
          <Text style={this.props.theme.subtitle}>{property.navn}</Text>
          <Text style={this.props.theme.text}>{property.verdi || "<Ingen verdi>"}</Text>
          {this.renderIfPropertyEditing(property)}
        </View>
      </TouchableHighlight>
    );
  }

  renderNotExistingProperties() {
    const {selectedObject, objekttypeInfo} = this.props;
    const report = this.getReport();

    var notExistingProperties = objekttypeInfo.egenskapstyper.filter(typeEgenskap => {
      const findFunction = function(objektEgenskap) { return objektEgenskap.id === typeEgenskap.id }
      var existsInReport = false;
      return !(selectedObject.egenskaper.find(findFunction) || existsInReport)
    });

    return (
      <ListView
        dataSource={ds.cloneWithRows(notExistingProperties)}
        renderRow={property => <TouchableHighlight style={{ padding: 5, borderBottomWidth: 1, borderBottomColor: Color(templates.colors.white).alpha(0.5) }} onPress={() => this.addOrChangeProperty(property)}><Text style={[styles.text, styles.subtitle]}>{property.navn}</Text></TouchableHighlight>}
        enableEmptySections={true}
      />
    );
  }

  addOrChangeProperty(property, propertyValue) {
    var verdi = null;
    if(propertyValue) {
      verdi = propertyValue.navn || propertyValue;
    }

    if(property.verdi === verdi) { alert("samme verdi!"); return }

    const propertySkeleton = {
      id: property.id,
      navn: property.navn,
      datatype: property.datatype,
      datatype_tekst: property.datatype_tekst,
      verdi: verdi,
    };
    if(this.isEnumType(property)) {
      propertySkeleton.enum_id = propertyValue && propertyValue.id || null;
    }

    if(propertyValue) {
      var type = property === this.props.newProperty ? reportType.NEW : reportType.CHANGED;
      this.addChangeToReport(propertySkeleton, type)
      this.props.setNewProperty(null);
      this.selectProperty(null);
    } else {
      this.props.setNewProperty(propertySkeleton);
      this.selectProperty(propertySkeleton);
    }
    this.props.inputNewPropertyValue(null);
    this.props.setIsEditingRoadObject(false);
  }

  addErrorToReport(property) {
    this.addChangeToReport(property, reportType.WRONG);
    this.selectProperty(null);
  }

  selectProperty(property) {
    if(this.isEditing(property)) {
      this.props.selectPropertyCurrentlyEditing(null);
    } else {
      this.props.selectPropertyCurrentlyEditing(property);
      this.props.inputNewPropertyValue(null);
    }
  }

  renderIfPropertyEditing(property) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const egenskapstype = this.getEgenskapstype(property.id);
    if(this.isEditing(property)) {
      return (
        <View>
          <Text style={this.props.theme.text}>{"Type: " + property.datatype_tekst}</Text>
          {property.verdi && <SettingSwitch title="Marker feil" value={false} onValueChange={this.addErrorToReport.bind(this, property)} />}
          <TextInput value={this.props.newPropertyValue} onChangeText={text => this.props.inputNewPropertyValue(text)} placeholder={"Skriv inn verdi..."} height={40} style={{ backgroundColor: 'lightgray', padding: 5 }} />
          {!this.isEnumType(property) && <Button text="Lagre" type="list" onPress={() => this.addOrChangeProperty(this.props.propertyCurrentlyEditing, this.props.newPropertyValue)} />}
          {this.renderEnumListView(egenskapstype)}
        </View>
      );
    }
  }

  renderEnumListView(egenskapstype) {
    if(this.isEnumType(egenskapstype)) {
      const verdier = egenskapstype.tillatte_verdier.sort((a, b) => a.id - b.id);
      if(this.props.newPropertyValue) {
        verdier = verdier.filter(v => v.navn.toString().toLowerCase().indexOf(this.props.newPropertyValue.toLowerCase()) > -1);
      }
      if(verdier.length > 10) { verdier = verdier.slice(0, 10) }

      return (
        <ListView
          dataSource={ds.cloneWithRows(verdier)}
          renderRow={this.renderPropertyValueRow.bind(this)}
          enableEmptySections={true}
        />
      );
    }
  }

  renderPropertyValueRow(propertyValue) {
    return (
      <TouchableHighlight onPress={() => this.addOrChangeProperty(this.props.propertyCurrentlyEditing, propertyValue)} style={{ padding: 20, backgroundColor: 'orange', marginTop: 5 }}>
        <Text>{propertyValue.navn}</Text>
      </TouchableHighlight>
    );
  }

  addChangeToReport(property, reportType) {
    const existingReport = this.getReport();
    const change = {
      egenskap: property,
      dato: moment().format('YYYY-MM-DD HH:mm:ss'),
      type: reportType,
      beskrivelse: "",
    }
    this.props.reportChange(this.props.currentRoadSearch, this.props.selectedObject, change);
  }

  // HELPERS
  isEditing(property) {
    return this.props.propertyCurrentlyEditing === property;
  }
  getEgenskapstype(id) {
    return this.props.objekttypeInfo.egenskapstyper.find(e => e.id == id);
  }
  isEnumType(property) {
    return ((property.datatype === datatype.flerverdiattributtTall) || (property.datatype === datatype.flerverdiAttributtTekst))
  }
  getReport() {
    return this.props.report.find(report => report.vegobjekt === this.props.selectedObject.id);
  }

  // STYLES
  propertyContainerStyle(property) {
    return {
      borderBottomColor: templates.colors.middleGray,
      borderBottomWidth: 1,
      padding: 10,
    }
  }

  mainBoxStyle() {
    return {
      backgroundColor: this.props.theme.color,
      zIndex: 2,
      borderBottomColor: templates.colors.darkGray,
      borderBottomWidth: 3,
      padding: 10,
    }
  }
}

function mapStateToProps(state) {
  return {
    theme: state.settingsReducer.themeStyle,

    currentRoadSearch: state.dataReducer.currentRoadSearch,
    selectedObject: state.dataReducer.selectedObject,
    objekttypeInfo: state.dataReducer.currentRoadSearch.objekttypeInfo,
    report: state.dataReducer.currentRoadSearch.report,

    isEditingRoadObject: state.reportReducer.isEditingRoadObject,
    propertyCurrentlyEditing: state.reportReducer.propertyCurrentlyEditing,
    newPropertyValue: state.reportReducer.newPropertyValue,
    newProperty: state.reportReducer.newProperty,
    showReport: state.reportReducer.showReport,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setIsEditingRoadObject: bindActionCreators(reportActions.setIsEditingRoadObject, dispatch),
    selectPropertyCurrentlyEditing: bindActionCreators(reportActions.selectPropertyCurrentlyEditing, dispatch),
    inputNewPropertyValue: bindActionCreators(reportActions.inputNewPropertyValue, dispatch),
    reportChange: bindActionCreators(dataActions.reportChange, dispatch),
    setNewProperty: bindActionCreators(reportActions.setNewProperty, dispatch),
    setShowReport: bindActionCreators(reportActions.setShowReport, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ObjectInfoView);
