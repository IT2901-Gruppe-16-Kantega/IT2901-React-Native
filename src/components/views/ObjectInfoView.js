import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ListView,
  TouchableHighlight,
  TextInput,
  Keyboard,
  LayoutAnimation
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PropertyValue from '../misc/PropertyValue';
import InputField from '../misc/InputField';

import * as templates from '../../utilities/templates';
import * as dataActions from '../../actions/dataActions';
import * as uiActions from '../../actions/uiActions';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

/*
Shows information about a selected object
*/
var ObjectInfoView = React.createClass({
  componentWillMount() {
    Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  },

  render() {
    const {selectedObject, objekttypeInfo} = this.props;
    const {metadata} = selectedObject;

    return <View style={templates.container}>
        <View style={styles.mainInfo}>
          <Text style={styles.title}>{objekttypeInfo.navn}</Text>
          <PropertyValue property={"ID"} value={selectedObject.id} />
          <PropertyValue property={"Beskrivelse"} value={objekttypeInfo.beskrivelse} />
          <PropertyValue property={"Stedfesting"} value={objekttypeInfo.stedfesting} />
          <PropertyValue property={"Startdato"} value={metadata.startdato} />
          <PropertyValue property={"Sist modifisert"} value={metadata.sist_modifisert} />
        </View>
        <ListView
          style={{marginBottom: this.props.keyboardPadding}}
          dataSource={ds.cloneWithRows(selectedObject.egenskaper)}
          renderRow={this.renderRow}
          enableEmptySections={true}
        />
    </View>
  },

  inputFocused(refName) {
    this.props.resetNewPropertyValue();

    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(this.refs[refName]),
        110, //additionalOffset
        true
      );
    }, 50);
  },

  renderRow(rowData, sectionID, rowID, highlightRow) {
    var enum_id = "";
    if(rowData.enum_id) {
      enum_id = " (" + rowData.enum_id + ")";
    }
    var egenskapstype = this.getEgenskapstype(rowData.id);

    var h = rowData.id + 'input'

    var verdi;
    // This is a new object, where the value is not filled in yet
    if(this.props.selectedObject.ny && !rowData.verdi) {
      verdi = "";
    } else {
      verdi = rowData.verdi.toString();
    }

    var input;
    if(egenskapstype.tillatte_verdier) {
      var enumValues = [];
      var enumValues = egenskapstype.tillatte_verdier.filter(e => {
        if(this.props.editedPropertyValue === "") { return false }
        return e.navn.toLowerCase().indexOf(this.props.editedPropertyValue.toLowerCase()) !== -1;
      }).slice(0, 10);

      input = <InputField
        type={rowData.navn}
        list={enumValues}
        textType={this.props.editedPropertyValue}
        choosenBool={false}
        editable={true}
        inputFunction={(text) => this.props.inputPropertyValue.bind(this, text, egenskapstype.navn)}
        chooserFunction={this.chooseEnumValueForProperty}
        colorController={'red'}
        updateFunction={this.update} />
    } else {
      input = <TextInput
        ref={h}
        style={styles.value}
        placeholder={"Legg inn verdi"}
        value={verdi}
        onFocus={this.inputFocused.bind(this, h)}
      />
    }

    return (
      <TouchableHighlight
        onPress={this.doSomething(rowData.id)}
        key={rowData.id}
        >
        <View style={styles.item}>
          <Text style={styles.itemTitle}>{rowData.navn} ({rowData.id})</Text>
          {input}
          <PropertyValue property={"Datatype"} value={rowData.datatype_tekst + " (" + rowData.datatype + ")"} />
          <PropertyValue property={"Viktighet"} value={egenskapstype.viktighet_tekst} />
        </View>
      </TouchableHighlight>
    )
  },

  update() {
    console.log("update")
  },

  keyboardDidShow(e) {
    //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.props.setKeyboardPadding(e.endCoordinates.height);
  },

  keyboardDidHide(e) {
    //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.props.setKeyboardPadding(0);
  },

  doSomething(id) {
    if(true) { // editing

    }
  },

  getEgenskapstype(id) {
    return this.props.objekttypeInfo.egenskapstyper.find(e => e.id == id);
  },
});

var styles = StyleSheet.create({
  mainInfo: {
    backgroundColor: templates.colors.orange,
    zIndex: 2,
    borderBottomColor: templates.colors.darkGray,
    borderBottomWidth: 3,
    padding: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    borderBottomColor: templates.colors.darkGray,
    borderBottomWidth: 1,
    padding: 10,
  },
  value: {
    fontSize: 16,
    height: 40,
  }
})

function mapDispatchToProps(dispatch) {
  return {
    setKeyboardPadding: bindActionCreators(uiActions.setKeyboardPadding, dispatch),
    inputPropertyValue: bindActionCreators(dataActions.inputPropertyValue, dispatch),
    resetNewPropertyValue: bindActionCreators(dataActions.resetNewPropertyValue, dispatch),
  }
};

function mapStateToProps(state) {
  return {
    keyboardPadding: state.uiReducer.keyboardPadding,
    objekttypeInfo: state.dataReducer.objekttypeInfo,
    selectedObject: state.mapReducer.selectedObject,
    editedPropertyValue: state.dataReducer.editedPropertyValue,
    editedPropertyValueName: state.dataReducer.editedPropertyValueName,
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (ObjectInfoView);
