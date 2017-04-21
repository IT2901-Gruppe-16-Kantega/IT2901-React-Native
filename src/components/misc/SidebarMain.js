import React from 'react';
import {
  View,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Text
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from '../misc/Button'

import * as templates from '../../utilities/templates';
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
        <View key={key} style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: templates.colors.black, alignItems: 'center'}}>
          <TouchableHighlight
            onPress={this.props.removeFilter.bind(this, filter)}
            >
            <Text style={{color: templates.colors.red, fontSize: 15, fontWeight: 'bold', paddingLeft: 10}}>❌</Text>
          </TouchableHighlight>
          <Text style={style}>
            <Text style={{fontWeight: 'bold'}}>{filter.egenskap.navn}</Text>
            <Text>{linebreak}{filter.funksjon.toLowerCase()}{linebreak2}</Text>
            <Text>{verdi}</Text>
          </Text>
        </View>
      );
    }

    var chosenFiltersText;
    if(views.length > 0) {
      chosenFiltersText = <Text style={[style, {fontSize: 18, fontWeight: 'bold'}]}>Valgte filtre:</Text>;
    }
    return <View style={{backgroundColor: templates.colors.blue}}>{chosenFiltersText}{views}</View>;
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
