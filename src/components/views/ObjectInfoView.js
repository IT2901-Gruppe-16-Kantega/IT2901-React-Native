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

import * as templates from '../../utilities/templates';
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

    console.log(this.props.keyboardPadding)

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

  inputFocused (refName) {
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

    return (

      <TouchableHighlight
        onPress={this.doSomething(rowData.id)}
        key={rowData.id}
        >
        <View style={styles.item}>
          <Text style={styles.itemTitle}>{rowData.navn} ({rowData.id})</Text>
          <TextInput
            ref={h}
            style={styles.value}
            value={rowData.verdi}
            onFocus={this.inputFocused.bind(this, h)}
          />
          <Text>Datatype: {rowData.datatype_tekst} ({rowData.datatype})</Text>
          <Text>Viktighet: {egenskapstype.viktighet_tekst}</Text>
        </View>
      </TouchableHighlight>
    )
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
  }
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
  }
};

function mapStateToProps(state) {
  return {
    keyboardPadding: state.uiReducer.keyboardPadding,
    objekttypeInfo: state.dataReducer.objekttypeInfo,
    selectedObject: state.mapReducer.selectedObject,
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (ObjectInfoView);
