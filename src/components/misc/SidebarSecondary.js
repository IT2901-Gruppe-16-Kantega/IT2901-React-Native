import React, { Component } from 'react';
import {
  View,
  ListView,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  TouchableHighlight,
  TextInput,
  Text,
  Platform,
  UIManager,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import moment from 'moment';

import ComparatorComponent from './ComparatorComponent';

import {comparators, datatype} from '../../utilities/values';
import * as templates from '../../utilities/templates';
import * as filterActions from '../../actions/filterActions';
import * as mapActions from '../../actions/mapActions';

let ScreenWidth = Dimensions.get("window").width;
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

/*
This component is for selecting advanced filtering.
*/
var SidebarSecondary = React.createClass({
	componentWillMount() {
		if(Platform.OS === "android") {
			UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	},
  	render() {
    var listView;
    if(this.props.selectedFilter.tillatte_verdier && this.props.selectedFunction) {
      if(this.props.selectedFunction !== comparators.HAS_VALUE && this.props.selectedFunction !== comparators.HAS_NOT_VALUE) {
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
          style={this.addFilterButtonStyle()} >
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>{this.status().message}</Text>
        </TouchableHighlight>
      </View>

      {this.createComparators()}
      {this.createSearchBox()}

      {listView}
    </View>
  },

  addFilterButtonStyle() {
    return {
      backgroundColor: this.status().canAdd ? templates.colors.green : templates.colors.red,
      padding: 10,
      margin: 2,
      borderRadius: 3,
      alignItems: 'center',
    };
  },

  hideSidebar() {
    this.props.deselectFilterValue();
    this.props.deselectFunction();
    this.props.clearFilterValueText();
    this.props.toggleSecondSidebar(false)
  },

  status() {
    // Failure if not selected a filter function (NOT_EQUAL, EQUAL, >= etc)
    if(!this.props.selectedFunction) {
      return {
        message: "Velg funksjon",
        longMessage: "Velg en sammenlikningsfunksjon, for eksempel 'Har verdi'.",
        canAdd: false
      }
    }

    // Need to write a value or select one if the filter function is not HAS_VALUE or HAS_NOT_VALUE
    if(this.props.selectedFunction !== comparators.HAS_VALUE && this.props.selectedFunction !== comparators.HAS_NOT_VALUE) {

      // Need to select a value from list if the selected filter is an enum
      if(this.props.selectedFilter.tillatte_verdier) {
        if(!this.props.selectedFilterValue.id) {
          return {
            message: "Velg verdi",
            longMessage: "Den valgte sammenlikningsfunksjonen trenger en tilhørende verdi.",
            canAdd: false
          }
        }
      }
      // Need to write a value if the selected filter has number, text or date type
      else {
        if(!this.props.filterValueText) {
          return {
            message: "Skriv inn verdi",
            longMessage: "Skriv inn en verdi i tekstfeltet.",
            canAdd: false
          }
        }
        else if(this.props.selectedFilter.datatype == datatype.tall && isNaN(parseFloat(this.props.filterValueText))) {
          return {
            message: "Skriv inn tallverdi",
            longMessage: "Verdien i tekstfeltet må være et tall.",
            canAdd: false
          }
        }
        else if(this.props.selectedFilter.datatype == datatype.dato && !moment(this.props.filterValueText, "YYYY-MM-DD").isValid()) {
          return {
            message: "Ugyldig dato",
            longMessage: "Skriv inn dato i formatet 'ÅÅÅÅ-MM-DD'",
            canAdd: false,
          }
        }
      }
    }

    // Failure if conflicts with already selected filter (eg: HAS_VALUE and HAS_NOT_VALUE)
    const verdi = this.props.selectedFilter.tillatte_verdier ? this.props.selectedFilterValue.id : this.props.filterValueText;
    const selFunc = this.props.selectedFunction;

    const filteredFilters = this.props.allSelectedFilters.filter(f => {
      const fVerdi = f.egenskap.tillatte_verdier ? f.verdi.id : f.verdi;

      // Different filters
      if(!(f.egenskap === this.props.selectedFilter)) {
        return false;
      }

      const fComparatorFunction = (f.funksjon === comparators.NOT_EQUAL ||
         f.funksjon === comparators.EQUAL ||
         f.funksjon === comparators.LARGER_OR_EQUAL ||
         f.funksjon === comparators.SMALLER_OR_EQUAL);

      const selComparatorFunction = (selFunc === comparators.NOT_EQUAL ||
         selFunc === comparators.EQUAL ||
         selFunc === comparators.LARGER_OR_EQUAL ||
         selFunc === comparators.SMALLER_OR_EQUAL);

      // HAS_NOT_VALUE and any comparison conflicts
      if(fComparatorFunction && selFunc === comparators.HAS_NOT_VALUE || selComparatorFunction && f.funksjon === comparators.HAS_NOT_VALUE) {
        return true;
      }

      // HAS_NOT_VALUE and HAS_VALUE conflicts
      if((f.funksjon === comparators.HAS_VALUE && selFunc === comparators.HAS_NOT_VALUE) ||
         (f.funksjon === comparators.HAS_NOT_VALUE && selFunc === comparators.HAS_VALUE)) {
        return true;
      }

      if(fVerdi == verdi) {
        // Filters has the same value, but comparators conflicts
        if(fComparatorFunction && selComparatorFunction) {
          return true;
        }
      }

      if((fVerdi > verdi && f.funksjon === comparators.LARGER_OR_EQUAL && selFunc === comparators.SMALLER_OR_EQUAL) ||
         (fVerdi < verdi && f.funksjon === comparators.SMALLER_OR_EQUAL && selFunc === comparators.LARGER_OR_EQUAL)) {
        return true;
      }
    });

    if(filteredFilters.length > 0) {
      return {
        message: "Umulig kombinasjon",
        longMessage: "Denne kombinasjonen kan ikke velges sammen med filtrene du allerede har valgt.",
        canAdd: false
      }
    }

    // Failure if the exact same filter already exists
    const filteredFilters2 = this.props.allSelectedFilters.filter(f => {
      const fVerdi = f.egenskap.tillatte_verdier ? f.verdi.id : f.verdi;
      return (f.egenskap === this.props.selectedFilter &&
                f.funksjon === this.props.selectedFunction &&
                fVerdi === verdi);
    });

    if(filteredFilters2.length > 0) {
      return {
        message: "Eksisterer allerede",
        longMessage: "Dette filteret har du allerede lagt til.",
        canAdd: false,
      }
    }

    return { message: "Legg til filter", longMessage: "", canAdd: true }
  },

  addFilter() {
    if(!this.status().canAdd) {
      alert(this.status().longMessage)
      return;
    }

    var verdi;
    if(this.props.selectedFilter.tillatte_verdier) { verdi = this.props.selectedFilterValue }
    else if(this.props.selectedFilter.datatype === datatype.tall) { verdi = parseFloat(this.props.filterValueText) }
    else if(this.props.selectedFilter.datatype === datatype.dato) { verdi = this.props.filterValueText.substring(0, 10) }
    else { verdi = this.props.filterValueText }

    var filter = {
      egenskap: this.props.selectedFilter,
      funksjon: this.props.selectedFunction,
      verdi: verdi,
    }

    this.props.addFilter(filter)

    this.props.toggleSecondSidebar(false);
    this.props.deselectFilterValue();
    this.props.deselectFunction();
    this.props.clearFilterValueText();
  },

  createTextInput(placeholder, type) {
    return <TextInput
      key={placeholder}
      style={styles.textInputStyle}
      placeholder={placeholder}
      onChangeText={(text) => this.props.inputFilterValueText(text)}
      keyboardType={type}
      value={this.props.filterValueText}
      returnKeyType='done'
    />
  },

  createSearchBox() {
    if(!this.props.selectedFunction || this.props.selectedFunction === comparators.HAS_VALUE || this.props.selectedFunction === comparators.HAS_NOT_VALUE) {
      return;
    }

    const dt = this.props.selectedFilter.datatype;
    if(dt === datatype.geomPunkt) {
      return;
    }

    if(dt === datatype.dato) {
      return this.createTextInput("ÅÅÅÅ-MM-DD", "numbers-and-punctuation");
    }
    else if(dt === datatype.flerverdiAttributtTekst || dt === datatype.flerverdiattributtTall) {
      return this.createTextInput("Start søk...", "default");
    }
    else if(dt === datatype.tall) {
      return this.createTextInput("<Tallverdi>", "numbers-and-punctuation");
    }
    else {
      return this.createTextInput("<Tekstverdi>", "default");
    }
  },

  createComparators() {
    var comparatorComponents = [
      <View key="VALUE" style={styles.buttonContainer}>
        <ComparatorComponent type={comparators.HAS_VALUE} />
        <ComparatorComponent type={comparators.HAS_NOT_VALUE} />
      </View>
    ];

    const dt = this.props.selectedFilter.datatype;
    if(dt == datatype.tall || dt == datatype.dato) { //dt == datatype.flerverdiattributtTall
      comparatorComponents.push(
        <View key="LARGERSMALLER" style={styles.buttonContainer}>
          <ComparatorComponent type={comparators.LARGER_OR_EQUAL} />
          <ComparatorComponent type={comparators.SMALLER_OR_EQUAL} />
        </View>
      );
    }
    if(dt != datatype.geomPunkt) {
      comparatorComponents.push(
        <View key="EQUALITY" style={styles.buttonContainer}>
          <ComparatorComponent type={comparators.EQUAL} />
          <ComparatorComponent type={comparators.NOT_EQUAL} />
        </View>
      );
    }

    return <View>{comparatorComponents}</View>
  },

  getDataSource() {
    var source = this.props.selectedFilter.tillatte_verdier.sort(function(a, b) {
      if(a.navn < b.navn) { return -1; }
      return 1;
    });

    if(this.props.filterValueText) {
      var searchString = this.props.filterValueText;

      source = source.filter(function(value) {
        return value.navn.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
      }); // bind(this)
    }

    return ds.cloneWithRows(source);
  },

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight
        key={rowID}
        underlayColor={templates.colors.blue}
        onPress={this.props.selectFilterValue.bind(this, rowData)}>
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
      style.left = ScreenWidth - style.width + 3;
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
    backgroundColor: templates.colors.lightGray,
    borderRadius: 3,
    margin: 2,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    height: 35,
  }
})

function mapStateToProps(state) {
  return {
    allObjects: state.dataReducer.currentRoadSearch.roadObjects,
    sidebarFrame: state.mapReducer.sidebarFrame,
    showSecondSidebar: state.mapReducer.showSecondSidebar,

    selectedFilter: state.filterReducer.selectedFilter,
    selectedFilterValue: state.filterReducer.selectedFilterValue,

    filterValueText: state.filterReducer.filterValueText,
    selectedFunction: state.filterReducer.selectedFunction,

    allSelectedFilters: state.filterReducer.allSelectedFilters,

    selectedMarker: state.mapReducer.selectedMarker,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deselectFunction: bindActionCreators(filterActions.deselectFunction, dispatch),
    selectFilterValue: bindActionCreators(filterActions.selectFilterValue, dispatch),
    deselectFilterValue: bindActionCreators(filterActions.deselectFilterValue, dispatch),
    toggleSecondSidebar: bindActionCreators(mapActions.toggleSecondSidebar, dispatch),
    inputFilterValueText: bindActionCreators(filterActions.inputFilterValueText, dispatch),
    clearFilterValueText: bindActionCreators(filterActions.clearFilterValueText, dispatch),
    addFilter: bindActionCreators(filterActions.addFilter, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (SidebarSecondary);
