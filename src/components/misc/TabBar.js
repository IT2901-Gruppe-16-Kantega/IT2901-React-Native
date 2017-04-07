import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
 } from 'react-native';

 import * as templates from '../../utilities/templates'

/*props
  elements: [{title: "", onPress: {}, image: {}}]

*/
var TabBar = React.createClass({

  render() {
    return <View style={{
        flexDirection: 'row',
        flex:0,
        height: 50
      }}>
      {this.createTabs()}
    </View>
  },

  createTabs() {
    var tabs = [];
    for(var i = 0; i < this.props.elements.length; i++) {
      tabs.push(this.createTab(this.props.elements[i]));
    }
    return tabs;
  },
  createTab(element) {
    var chosenElement = false
    if (element.chosen == element.title){
      chosenElement = true
    }
    var color = ''
    var textColor = ''
    var fontWeight = 'bold'
    if(chosenElement) {
      color = templates.colors.white
      textColor = templates.colors.darkGray
      weight = 'bold'
    }
    else {
      color = templates.colors.orange
      textColor = templates.colors.white
      weight = 'normal'
    }
    return <TouchableHighlight
      key={element.title}
      style={{
        flex: 1,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color,
        borderColor: templates.colors.white,
      }}
      onPress={element.onPress}
      underlayColor={templates.colors.middleGray}
      >
        <Text style={{
            color: textColor,
            fontWeight: weight
          }}>{element.title}</Text>
    </TouchableHighlight>
  }
})

var styles = StyleSheet.create({
  button: {

  },
  text: {
    color: templates.colors.white,
  },
})

export default TabBar;
