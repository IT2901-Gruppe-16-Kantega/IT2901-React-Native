import React, { Component } from 'react';
import {
  View,
  ListView,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  TouchableHighlight,
  TextInput,
  Text
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as mapActions from '../actions/mapActions';
import * as templates from '../utilities/templates';

import ComparatorComponent from './ComparatorComponent';

let ScreenWidth = Dimensions.get("window").width;

const HAS_VALUE = "Har verdi";
const HAS_NOT_VALUE = "Har ikke verdi";
const LARGER_OR_EQUAL = ">=";
const SMALLER_OR_EQUAL = "<=";
const NOT_EQUAL = "!=";
const EQUAL = "=";
var selectedFunction;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var SidebarSecondary = React.createClass({
  render() {
    var listView;
    if(this.props.selectedFilter && this.props.selectedFilter.tillatte_verdier) {
      listView = <ListView
        dataSource={this.getDataSource()}
        renderRow={this.renderRow}
        enableEmptySections={true}
      />
    }

    return <View style={StyleSheet.flatten([templates.sidebar, this.secondSidebarFrame()])}>
      <TouchableHighlight
        onPress={() => this.props.toggleSecondSidebar(false)}>
        <View><Text style={styles.sidebarTitle}>{"<"} {this.props.selectedFilter.navn}</Text></View>
      </TouchableHighlight>

      {this.createComparators()}

      <View style={{margin: 20}}>
        <TextInput
          style={{height: 20, color: 'white'}}
          placeholder="Start søk..."
          onChangeText={(text) => this.props.inputFilterValueText(text)}
          keyboardType = "default"
          returnKeyType = 'done'
          />
      </View>

      {listView}
    </View>
  },

  // datatyper
  /*FlerverdiAttributt, Tekst = 30
  Tekst = 1
  Tall = 2
  Flerverdiattributt, Tall = 31
  Dato = 8
  BinærObjekt = 27
  GeomPunkt = 17
  */

  createComparators() {
    var comparators = [
      <ComparatorComponent key={HAS_VALUE} type={HAS_VALUE} />,
      <ComparatorComponent key={HAS_NOT_VALUE} type={HAS_NOT_VALUE} />,
      <ComparatorComponent key={NOT_EQUAL} type={NOT_EQUAL} />,
      <ComparatorComponent key={EQUAL} type={EQUAL} />
    ];

    const dt = this.props.selectedFilter.datatype;
    if(dt == 2 || dt == 31 || dt == 8) {
      comparators.push(<ComparatorComponent key={LARGER_OR_EQUAL} type={LARGER_OR_EQUAL} />);
      comparators.push(<ComparatorComponent key={SMALLER_OR_EQUAL} type={SMALLER_OR_EQUAL} />);
    }

    return <View>
      {comparators}
    </View>
  },

  getDataSource() {
    var source = this.props.selectedFilter.tillatte_verdier.sort(function(a, b) {
      if(a.navn < b.navn) { return -1; }
      return 1;
    });

    if(this.props.filterValueSearch) {
      var searchString = this.props.filterValueSearch;

      source = source.filter(function(value) {
        return value.navn.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
      }); // bind(this)
    }
    return ds.cloneWithRows(source);
  },

  selectValue(value) {
    var {selectedFilter} = this.props;

    var filtered = [];
    for(var i = 0; i < this.props.allObjects.length; i++) {
      const objekt = this.props.allObjects[i];

      for(var j = 0; j < objekt.egenskaper.length; j++) {
        const egenskap = objekt.egenskaper[j];

        if(egenskap.enum_id == value.id) {
          filtered.push(objekt);
        }
      }
    }
    console.log("AllLength: " + this.props.allObjects.length)
    console.log("FilteredLength: " + filtered.length);
    this.props.selectFilterValue(value);
    this.props.setFilteredObjects(filtered);

    this.props.update();
  },

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight
        key={rowID}
        onPress={() => this.selectValue(rowData)}
        style={styles.sidebarItemContainer}>
        <View style={styles.sidebarItem}>
          <Text style={styles.sidebarItemTitle}>{rowData.navn}</Text>
        </View>
      </TouchableHighlight>
    )
  },

  secondSidebarFrame() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    var style = {width: this.props.sidebarFrame.width};

    if(this.props.showSecondSidebar) {
      style.left = ScreenWidth - style.width;
    } else {
      style.left = ScreenWidth;
    }
    return style;
  }
})

styles = StyleSheet.create({
  sidebarTitle: {
    color: templates.colors.white,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  sidebarItemContainer: {
    borderRadius: 10,
  },
  sidebarItemTitle: {
    color: templates.colors.white,
  },
  sidebarItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
})

function mapStateToProps(state) {
  return {
    allObjects: state.dataReducer.currentRoadSearch.roadObjects,
    sidebarFrame: state.mapReducer.sidebarFrame,
    showSecondSidebar: state.mapReducer.showSecondSidebar,
    selectedFilter: state.mapReducer.selectedFilter,
    filterValueSearch: state.mapReducer.filterValueSearch,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectFilterValue: bindActionCreators(mapActions.selectFilterValue, dispatch),
    toggleSecondSidebar: bindActionCreators(mapActions.toggleSecondSidebar, dispatch),
    inputFilterValueText: bindActionCreators(mapActions.inputFilterValueText, dispatch),
    setFilteredObjects: bindActionCreators(mapActions.setFilteredObjects, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (SidebarSecondary);
