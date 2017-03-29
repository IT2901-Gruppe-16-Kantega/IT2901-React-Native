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

import * as values from '../../utilities/values';
import * as templates from '../../utilities/templates';
import * as filterActions from '../../actions/filterActions';
import * as mapActions from '../../actions/mapActions';

let ScreenWidth = Dimensions.get("window").width;

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
    if(this.props.selectedFilter && this.props.selectedFilter.tillatte_verdier && this.props.selectedFunction) {
      if(this.props.selectedFunction !== values.comparators.HAS_VALUE && this.props.selectedFunction !== values.comparators.HAS_NOT_VALUE) {
        listView = <ListView
          dataSource={this.getDataSource()}
          renderRow={this.renderRow}
          enableEmptySections={true}
        />
      }
    }

    return <View style={StyleSheet.flatten([templates.sidebar, this.secondSidebarFrame()])}>
      <TouchableHighlight
        underlayColor={templates.colors.blue}
        onPress={this.hideSidebar}>
        <View><Text style={styles.sidebarTitle}>{"<"} {this.props.selectedFilter.navn}</Text></View>
      </TouchableHighlight>

      <View>
        <TouchableHighlight
          onPress={this.addFilter}
          underlayColor={templates.colors.blue}
          style={styles.addFilterButton} >
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Legg til filter</Text>
        </TouchableHighlight>
      </View>

      {this.createComparators()}
      {this.createSearchBox()}

      {listView}
    </View>
  },

  hideSidebar() {
    this.props.deselectFilterValue();
    this.props.deselectFunction();
    this.props.toggleSecondSidebar(false)
  },

  addFilter() {
    if(!this.props.selectedFilter) {
      console.log("Velg et filter")
      return;
    }

    if(!this.props.selectedFunction) {
      console.log("Velg en sammenlikningsfunksjon")
      return;
    }

    const {comparators} = values;
    if(!this.props.selectedFilterValue.id) {
      if(this.props.selectedFunction !== comparators.HAS_VALUE && this.props.selectedFunction !== comparators.HAS_NOT_VALUE) {
        console.log("Velg verdi")
        return;
      }
    }

    var filter = {
      id: this.props.selectedFilter.id,
      func: this.props.selectedFunction,
      value: this.props.selectedFilterValue.id,
    }

    this.props.addFilter(filter)

    this.props.toggleSecondSidebar(false);
    this.props.deselectFilterValue();
    this.props.deselectFunction();

    console.log(this.props.allSelectedFilters);
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
    const {comparators} = values;
    if(!this.props.selectedFunction || this.props.selectedFunction === comparators.HAS_VALUE || this.props.selectedFunction === comparators.HAS_NOT_VALUE) {
      return;
    }

    const dt = this.props.selectedFilter.datatype;
    if(dt === datatype.geomPunkt) {
      return;
    }

    if(dt === datatype.dato) {
      return this.createTextInputs(["DD", "MM", "YYYY"], "numbers-and-punctuation");
    }
    else if(dt === datatype.flerverdiAttributtTekst || dt === datatype.flerverdiattributtTall) {
      return this.createTextInputs(["Start søk..."], "default");
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
        <ComparatorComponent type={values.comparators.HAS_VALUE} />
        <ComparatorComponent type={values.comparators.HAS_NOT_VALUE} />
      </View>
    ];

    const dt = this.props.selectedFilter.datatype;
    if(dt == datatype.tall || dt == datatype.flerverdiattributtTall || dt == datatype.dato) {
      comparators.push(
        <View key="LARGERSMALLER" style={styles.buttonContainer}>
          <ComparatorComponent type={values.comparators.LARGER_OR_EQUAL} />
          <ComparatorComponent type={values.comparators.SMALLER_OR_EQUAL} />
        </View>
      );
    }
    if(dt != datatype.geomPunkt) {
      comparators.push(
        <View key="EQUALITY" style={styles.buttonContainer}>
          <ComparatorComponent type={values.comparators.NOT_EQUAL} />
          <ComparatorComponent type={values.comparators.EQUAL} />
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

    this.props.selectFilterValue(value);
  },

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight
        key={rowID}
        underlayColor={templates.colors.blue}
        onPress={() => this.selectValue(rowData)}>
        <View style={this.getRowStyle(rowData.id)}>
          <Text style={styles.sidebarItemTitle}>{rowData.navn}</Text>
        </View>
      </TouchableHighlight>
    )
  },

  getRowStyle(id) {
    if(id === this.props.selectedFilterValue.id) {
      return [styles.sidebarItem, {backgroundColor: templates.colors.blue}]
    }
    return styles.sidebarItem;
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
  addFilterButton: {
    backgroundColor: templates.colors.green,
    padding: 10,
    margin: 2,
    borderRadius: 3,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  sidebarTitle: {
    color: templates.colors.black,
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

    selectedFilter: state.filterReducer.selectedFilter,
    selectedFilterValue: state.filterReducer.selectedFilterValue,

    filterValueSearch: state.filterReducer.filterValueSearch,
    selectedFunction: state.filterReducer.selectedFunction,

    allSelectedFilters: state.filterReducer.allSelectedFilters,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deselectFunction: bindActionCreators(filterActions.deselectFunction, dispatch),
    selectFilterValue: bindActionCreators(filterActions.selectFilterValue, dispatch),
    deselectFilterValue: bindActionCreators(filterActions.deselectFilterValue, dispatch),
    toggleSecondSidebar: bindActionCreators(mapActions.toggleSecondSidebar, dispatch),
    inputFilterValueText: bindActionCreators(filterActions.inputFilterValueText, dispatch),
    addFilter: bindActionCreators(filterActions.addFilter, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (SidebarSecondary);
