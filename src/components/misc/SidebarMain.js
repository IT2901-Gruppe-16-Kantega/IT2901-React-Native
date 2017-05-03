import React from 'react';
import {
  View,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Text,
  Platform,
  Linking
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../misc/Button'

import * as templates from '../../utilities/templates';
import {AR} from '../../utilities/utils'
import {comparators} from '../../utilities/values';

import * as dataActions from '../../actions/dataActions';
import * as filterActions from '../../actions/filterActions';
import * as mapActions from '../../actions/mapActions';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class SidebarMain extends React.Component {
  render() {
    return <View style={StyleSheet.flatten([templates.sidebar, this.props.sidebarFrame])}>
      <ListView
        dataSource={ds.cloneWithRows(this.props.objekttypeInfo.egenskapstyper.sort((a, b) => {
          if(a.navn < b.navn) { return -1 }
          else { return 1 }
        }))}
        renderRow={this.renderRow.bind(this)}
        enableEmptySections={true}
      />
      {this.allSelectedFiltersList()}
    </View>
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight
        key={rowID}
        underlayColor={templates.colors.blue}
        onPress={this.selectFilter.bind(this, rowData)}
        >
        <View style={styles.sidebarItem}>
          <Text style={styles.sidebarItemTitle}>{rowData.navn}</Text>
          <Text style={styles.sidebarItemDescription}>{rowData.beskrivelse}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  allSelectedFiltersList() {
    var style = {padding: 5, marginRight: 15, color: templates.colors.white}
    var views = [];
    for(var i = 0; i < this.props.allSelectedFilters.length; i++) {
      const filter = this.props.allSelectedFilters[i];
      var verdi;
      /*if(filter.funksjon === comparators.HAS_VALUE || filter.funksjon === comparators.HAS_NOT_VALUE) {
        verdi = null;
      }
      else if(filter.egenskap.tillatte_verdier) { verdi = filter.verdi.navn; }
      else */
      verdi = (filter.egenskap.tillatte_verdier && filter.verdi) ? filter.verdi.navn : (filter.verdi ? filter.verdi.toString() : null);
      const key = filter.egenskap.id + filter.funksjon + verdi;
      const linebreak = verdi ? " " : "\n";
      const linebreak2 = verdi ? "\n" : null;
      views.push(
        <View key={key} style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Button text={"X"} onPress={this.props.removeFilter.bind(this, filter)} type={"small"} />
          <Text style={style}>
            <Text style={{fontWeight: 'bold'}}>{filter.egenskap.navn}</Text>
            <Text>{linebreak}{filter.funksjon.toLowerCase()}{linebreak2}</Text>
            <Text>{verdi}</Text>
          </Text>
        </View>
      );
    }

    return (
      <View style={{backgroundColor: templates.colors.blue}}>
        <Text style={style}>{"Objekter: " + this.props.roadObjects.length}</Text>
        {views.length > 0 && <View>
          <Text style={style}>{"Etter filtrering: " + this.props.filteredRoadObjects.length}</Text>
          <Text style={[style, {fontSize: 18, fontWeight: 'bold'}]}>Valgte filtre:</Text>
        </View>}
        {views}
        <Button type={"small"} onPress={this.openARWithFilters.bind(this)} text={"AR"} />
      </View>
    );
  }

  openARWithFilters() {
    const copy = this.props.currentRoadSearch;
    copy.roadObjects = this.props.filteredRoadObjects;

    AR(Platform.OS, this.props.currentRoadSearch, url => {
      if(url) {
        Linking.canOpenURL(url).then(supported => {
          if(supported) Linking.openURL(url)
          else alert("AR-applikasjon ikke installert.")
        })
      }
    });
  }

  selectFilter(filter) {
    this.props.selectFilter(filter);
    this.props.toggleSecondSidebar(true);
  }
}

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
    objekttypeInfo: state.dataReducer.currentRoadSearch.objekttypeInfo,
    allSelectedFilters: state.filterReducer.allSelectedFilters,

    currentRoadSearch: state.dataReducer.currentRoadSearch,
    roadObjects: state.dataReducer.currentRoadSearch.roadObjects,
    filteredRoadObjects: state.dataReducer.filteredRoadObjects,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeFilter: bindActionCreators(filterActions.removeFilter, dispatch),
    selectFilter: bindActionCreators(filterActions.selectFilter, dispatch),
    toggleSecondSidebar: bindActionCreators(mapActions.toggleSecondSidebar, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SidebarMain);
