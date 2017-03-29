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

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ComparatorComponent from './ComparatorComponent';

import * as templates from '../../utilities/templates';
import * as mapActions from '../../actions/mapActions';

let ScreenWidth = Dimensions.get("window").width;

const HAS_VALUE = "Har verdi";
const HAS_NOT_VALUE = "Har ikke verdi";
const LARGER_OR_EQUAL = ">=";
const SMALLER_OR_EQUAL = "<=";
const NOT_EQUAL = "!=";
const EQUAL = "=";
var selectedFunction;

const datatype = {
  flerverdiAttributtTekst: 30,
  tekst: 1,
  tall: 2,
  flerverdiattributtTall: 31,
  dato: 8,
  binaerObjekt: 27,
  geomPunkt: 17,
}

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
        underlayColor={templates.colors.blue}
        onPress={this.props.toggleSecondSidebar.bind(this, false)}>
        <View><Text style={styles.sidebarTitle}>{"<"} {this.props.selectedFilter.navn}</Text></View>
      </TouchableHighlight>

      {this.createComparators()}
      {this.createSearchBox()}

      {listView}
    </View>
  },

  createTextInputs(placeholders, type) {
    var inputs = [];
    for(var i = 0; i < placeholders.length; i++) {
      inputs.push(<TextInput
        key={placeholders[i]}
        style={styles.textInputStyle}
        placeholder={placeholders[i]}
        onChangeText={(text) => this.props.inputFilterValueText(text)}
        keyboardType={type}
        returnKeyType='done'
      />)
    }
    return <View style={{margin: 5, flexDirection: 'row'}}>{inputs}</View>
  },

  createSearchBox() {
    if(this.props.selectedFunction === HAS_VALUE || this.props.selectedFunction === HAS_NOT_VALUE) {
      return;
    }

    const dt = this.props.selectedFilter.datatype;
    if(dt === datatype.dato) {
      return this.createTextInputs(["DD", "MM", "YYYY"], "numbers-and-punctuation");
    }
    else if(dt === datatype.flerverdiAttributtTekst || dt === datatype.flerverdiattributtTall) {
      return this.createTextInputs(["Start søk..."], "default");
    }
    else if(dt === datatype.binaerObjekt) {
      return this.createTextInputs(["Skriv inn noe..."], "ascii-capable");
    }
    else if(dt === datatype.geomPunkt) {
      return this.createTextInputs(["Lat", "Long", "Alt"], "numbers-and-punctuation");
    }
    else if(dt === datatype.tall) {
      return this.createTextInputs(["<Tallverdi>"], "numbers-and-punctuation");
    }
    else {
      return this.createTextInputs(["<Tekstverdi>"], "default");
    }
  },

  createComparators() {
    var comparators = [
      <View key="VALUE" style={styles.buttonContainer}>
        <ComparatorComponent type={HAS_VALUE} />
        <ComparatorComponent type={HAS_NOT_VALUE} />
      </View>,
      <View key="EQUALITY" style={styles.buttonContainer}>
        <ComparatorComponent type={NOT_EQUAL} />
        <ComparatorComponent type={EQUAL} />
      </View>
    ];

    const dt = this.props.selectedFilter.datatype;
    if(dt == datatype.tall || dt == datatype.flerverdiattributtTall || dt == datatype.dato) {
      comparators.push(
        <View key="LARGERSMALLER" style={styles.buttonContainer}>
          <ComparatorComponent key={LARGER_OR_EQUAL} type={LARGER_OR_EQUAL} />
          <ComparatorComponent key={SMALLER_OR_EQUAL} type={SMALLER_OR_EQUAL} />
        </View>
      );
    }

    return <View>{comparators}</View>
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

      if(objekt.egenskaper) {
        for(var j = 0; j < objekt.egenskaper.length; j++) {
          const egenskap = objekt.egenskaper[j];

          if(egenskap.enum_id == value.id) {
            filtered.push(objekt);
          }
        }
      }
    }
    console.log("AllLength: " + this.props.allObjects.length)
    console.log("FilteredLength: " + filtered.length);
    this.props.selectFilterValue(value);
    this.props.setFilteredObjects(filtered);
  },

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight
        key={rowID}
        underlayColor={templates.colors.blue}
        onPress={() => this.selectValue(rowData)}>
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
  buttonContainer: {
    flexDirection: 'row',
  },
  sidebarTitle: {
    color: templates.colors.darkGray,
    padding: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  sidebarItemTitle: {
    color: templates.colors.darkGray,
  },
  sidebarItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: templates.colors.middleGray,
  },
  textInputStyle: {
    flex: 1,
    height: 50,
    backgroundColor: templates.colors.lightGray,
    borderRadius: 3,
    margin: 2,
    padding: 10,
  }
})

function mapStateToProps(state) {
  return {
    allObjects: state.dataReducer.currentRoadSearch.roadObjects,
    sidebarFrame: state.mapReducer.sidebarFrame,
    showSecondSidebar: state.mapReducer.showSecondSidebar,
    selectedFilter: state.mapReducer.selectedFilter,
    filterValueSearch: state.mapReducer.filterValueSearch,
    selectedFunction: state.filterReducer.selectedFunction,
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
