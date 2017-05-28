/**
* Main view component showing the list of stored searches to the user.
* The user may chose a stored search, or delete single or all stored searches
*/

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ListView,
  Alert,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moment from 'moment';

import Button from '../misc/Button';
import Container from '../misc/Container'
import PropertyValue from '../misc/PropertyValue';

import storageEngine from '../../utilities/storageEngine';
import * as templates from '../../utilities/templates';
import * as dataActions from '../../actions/dataActions';

const storage = storageEngine('NVDB-storage');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class StoredDataView extends React.Component {
  render() {
    return <Container>
      {this.renderSearches()}
    </Container>
  }
  renderSearches() {
    if(this.props.allSearches.length != 0) {
      return <ListView
        // Create the data source. Sort by date created (descending, newest first)
        dataSource={ds.cloneWithRows(this.props.allSearches.sort((a, b) => b.key - a.key))}
        renderRow={this.renderRow.bind(this)}
        renderFooter={this.renderFooter.bind(this)}
        enableEmptySections={true}
      />
    } else {
      return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text style={this.props.theme.text}>Ingen søk...</Text>
          <Button type={"small"} text={"Gjør et søk"} onPress={Actions.SearchView} />
        </View>
      );
    }
  }
  renderRow(roadSearch, sectionID, rowID, highlightRow) {
    const {fylke, kommune} = roadSearch.searchParameters;
    const fylkeNavn = fylke ? fylke.navn : "";
    const kommuneNavn = kommune ? kommune.navn : "";
    const vegobjekttype = roadSearch.objekttypeInfo;
    var title = vegobjekttype.navn;
    if(kommuneNavn && fylkeNavn) { title += ", " + fylkeNavn + " (" + kommuneNavn + ")"; }
    else if(fylkeNavn) { title += ", " + fylkeNavn; }
    return <TouchableHighlight
      onPress={this.openSearch.bind(this, roadSearch)}
      onLongPress={this.issueDeleteSearch.bind(this, roadSearch)}
      key={rowID}
      style={[styles.row, this.props.theme.container]}>
      <View>
        <Text style={this.props.theme.text}>{moment(roadSearch.key).format("DD. MMM YYYY (HH:mm)")}</Text>
        <Text style={this.props.theme.title}>{title}</Text>
        <Text style={this.props.theme.text}>{roadSearch.roadObjects.length} objekter</Text>
        <View style={{alignItems: 'flex-end'}}>
        <Text style={[this.props.theme.subtitle, {color: templates.colors.orange, fontWeight: 'bold'}]}>Åpne</Text>
        </View>
      </View>
    </TouchableHighlight>
  }
  renderFooter() {
    return <Button type={"small"} text={"Slett alt"} onPress={this.issueDeleteAllSearches.bind(this)} style={"small"} />
  }
  issueDeleteSearch(search) {
    Alert.alert('Slette søk',
      'Klikk bekreft for å slette søk utført: ' + search.date,
      [
        { text: 'Bekreft',
          onPress: () => {
            storage.deleteFile(search);
            this.props.deleteSearch(this.props.allSearches, search);
            this.forceUpdate(); }},
        { text: 'Avbryt' }
      ]
    );
  }
  issueDeleteAllSearches() {
    Alert.alert('Slette alle søk',
      'Klikk bekreft for å slette ALLE søk. Dette vil også slette alle ' +
      'rapporter, og kan ikke angres!',
      [
        { text: 'Bekreft',
          onPress: () => {
            storage.clear();
            this.props.clearAllSearches(); }},
        { text: 'Avbryt' }
      ]
    );
  }
  openSearch(search) {
    this.props.setCurrentRoadSearch(search);
    Actions.CurrentSearchView();
  }
}

var styles = StyleSheet.create({
  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: templates.colors.middleGray,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
})

function mapStateToProps(state) {
  return {
    allSearches: state.dataReducer.allSearches,
    theme: state.settingsReducer.themeStyle,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentRoadSearch: bindActionCreators(dataActions.setCurrentRoadSearch, dispatch),
    clearAllSearches: bindActionCreators(dataActions.clearAllSearches, dispatch),
    deleteSearch: bindActionCreators(dataActions.deleteSearch, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (StoredDataView);
