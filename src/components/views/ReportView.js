/**
* Main view component showing information about the report associated with the currently chosen search
*/

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ListView,
  TouchableHighlight,
  Share,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../misc/Button';
import Container from '../misc/Container';

import * as templates from '../../utilities/templates';
import * as dataActions from '../../actions/dataActions';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class ReportView extends React.Component {
  render() {
    if(!this.props.currentRoadSearch) {
      return (
        <Container>
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={this.props.theme.title}>Ingen/feil søk spesifisert.</Text>
          </View>
        </Container>
      );
    }
    return (
      <Container>
        {this.renderReportObjects()}
      </Container>
    );
  }
  renderReportObjects() {
    const {report} = this.props.currentRoadSearch;
    if(report.length > 0) {
      return <ListView
        dataSource={ds.cloneWithRows(report)}
        renderRow={this.renderRow.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        enableEmptySections={true}
        />
    } else {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text>Ingen rapporter registrert...</Text>
        </View>
      );
    }
  }
  renderRow(reportItem) {
    const {theme} = this.props;
    return (
      <TouchableHighlight
        key={reportItem.vegobjekt}
        onPress={() => this.goToObjectInfoView(reportItem.vegobjekt)}
        >
        <View style={{ padding: 10, backgroundColor: theme.container.backgroundColor, borderBottomWidth: 1, borderBottomColor: theme.backgroundColor }}>
          <Text style={theme.title}>{reportItem.vegobjekt}</Text>
          <Text style={theme.subtitle}>{this.createSubtitle(reportItem)}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  createSubtitle(reportItem) {
    const num = reportItem.endringer.length;
    return num + " endring" + (num === 1 ? "" : "er");
  }
  renderFooter() {
    const message = JSON.stringify(this.props.currentRoadSearch.report);
    return <Button type="small" text="Del rapport" onPress={() => Share.share({ message: message })} />
    return (
      <View>
        <TouchableHighlight onPress={() => Share.share({ message: message })}>
          <Text>Del</Text>
        </TouchableHighlight>
      </View>
    );
  }
  goToObjectInfoView(objectID) {
    const object = this.props.currentRoadSearch.roadObjects.find(o => o.id === objectID);
    this.props.selectObject(object);
    Actions.ObjectInfoView();
  }
}

function mapStateToProps(state) {
  return {
    theme: state.settingsReducer.themeStyle,
    currentRoadSearch: state.dataReducer.currentRoadSearch,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectObject: bindActionCreators(dataActions.selectObject, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ReportView);
