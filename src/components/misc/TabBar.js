import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import * as templates from '../../utilities/templates'

/*props
  elements: [{title: "", onPress: {}, image: {}}]

*/
var TabBar = React.createClass({
  propTypes: {
    elements: PropTypes.string.isRequired,
  },

  render() {
    return <View style={{ position: 'absolute', right: 0, left: 0, bottom: 0, height: 50, flexDirection: 'row' }}>
      {this.createTabs()}
    </View>
  },

  createTabs() {
    var tabs = [];
    for(var i = 0; i < this.props.elements.length; i++) {
      const tab = this.createTab(this.props.elements[i]);
      tabs.push(tab);
    }
    return tabs;
  },

  createTab(element) {
    var style;
    if (element.chosen == element.title) { style = this.props.theme.tabChosen; }
    else { style = this.props.theme.tabNotChosen; }

    return <TouchableHighlight
      key={element.title}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: style.backgroundColor,
        borderWidth: 0.5,
        borderTopWidth: style.borderTopWidth,
        borderColor: this.props.theme.mainContainer.backgroundColor,
      }}
      onPress={element.onPress}
      underlayColor={templates.colors.middleGray}
      >
        <Text style={{
            color: style.textColor,
            fontWeight: style.fontWeight,
            fontSize: this.props.theme.subtitle.fontSize,
          }}>{element.title}</Text>
    </TouchableHighlight>
  }
})

function mapStateToProps(state) {
  return { theme: state.settingsReducer.themeStyle };
}

export default connect(mapStateToProps, null) (TabBar);
