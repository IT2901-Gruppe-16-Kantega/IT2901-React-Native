import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ListView,
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

/*
View that shows all stored data
*/
var StoredDataView = React.createClass({
  render() {
    return <Container>
      {this.renderSearches()}
    </Container>
  },

  renderSearches() {
    if(this.props.allSearches) {
      return <ListView
        // Create the data source. Sort by date created (descending, newest first)
        dataSource={ds.cloneWithRows(this.props.allSearches.sort((a, b) => b.key - a.key))}
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
        enableEmptySections={true}
      />
    } else {
      return <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text>Ingen søk...</Text>
        <Button text={"Gjør et søk"} onPress={Actions.SearchView} />
      </View>
    }
  },

  // Render each saved road search row
  renderRow(roadSearch, sectionID, rowID, highlightRow) {
    // If the search parameters exists, set the names
    const fylkeNavn = roadSearch.searchParameters[0] == null ? null : roadSearch.searchParameters[0].navn;
    const kommuneNavn = roadSearch.searchParameters[2] == null ? null : roadSearch.searchParameters[2].navn;

    const vegobjekttype = roadSearch.objekttypeInfo;

    // Create the title of the row
    var title = vegobjekttype.navn;
    if(kommuneNavn && fylkeNavn) { title += ", " + fylkeNavn + " (" + kommuneNavn + ")"; }
    else if(fylkeNavn) { title += ", " + fylkeNavn; }

    return <TouchableHighlight
      onPress={this.openSearch.bind(this, roadSearch)}
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
  },

  renderFooter() {
    return <View style={styles.footerStyle}>
      <Button text={"Slett alt"} onPress={storage.clear} style={"small"} />
    </View>
  },

  // Open the selected roadSearch item
  openSearch(search) {
    this.props.setCurrentRoadSearch(search);
    Actions.CurrentSearchView();
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
    allSearches: state.dataReducer.allSearches,
    theme: state.settingsReducer.themeStyle,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentRoadSearch: bindActionCreators(dataActions.setCurrentRoadSearch, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (StoredDataView);
