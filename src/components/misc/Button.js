import React from 'react'
import {
  Text,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import PropTypes from 'prop-types';

import * as templates from '../../utilities/templates'

// The different button types that can be sent in as a prop, changes style
const types = {
  TITLE: "title",
  SEARCH: "search",
  LIST: "list",
  LIST_SELECTED: "listSelected",
  SMALL: "small",
  HALF: "half",
}

let ScreenWidth = Dimensions.get("window").width;

/*
Orange button component, available in different styles
*/
export default class Button extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    type: PropTypes.oneOf(Object.values(types)).isRequired,
  }

  render() {
    return <TouchableHighlight
      style={this.styleButton()}
      onPress={this.props.onPress}
      underlayColor={templates.colors.green}>
      <Text style={this.styleText()}>{this.props.text}</Text>
    </TouchableHighlight>
  }

  // Creates style of button based on type
  styleButton() {
    const {type} = this.props;
    var style = {
      backgroundColor: templates.colors.orange,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
      padding: 5,
    }

    switch(type) {
      case types.SMALL:
        style.margin = 2;
        break;

      case types.TITLE:
        style.width = 200;
        style.height = 75;
        style.margin = 5;
        break;

      case types.SEARCH:
        style.shadowColor = templates.colors.darkGray;
        style.shadowOpacity = 1;
        style.shadowOffset = { width: 3, height: 3 };
        style.shadowRadius = 2;
        style.width = ScreenWidth - 30;
        style.height = 50;
        break;

      case types.LIST_SELECTED:
        style.backgroundColor = templates.colors.green;
        style.padding = 10;

      case types.LIST:
        style.marginBottom = 2;
        break;

      case types.HALF:
        style.width = ScreenWidth / 2 - 40;
        style.height = ScreenWidth / 6;
        style.margin = 5;
        break;
    }

    return style;
  }

  // Creates style of button text based on type
  styleText() {
    const {type} = this.props;
    var style = { color: templates.colors.white, fontSize: 18 }

    switch(type) {
      case types.TITLE:
        style.fontWeight = 'bold';
        style.fontSize = 20;

      case types.HALF:
        style.fontWeight = 'bold';
        break;

      case types.SEARCH:
        style.fontWeight = 'bold';
        style.fontSize = 18;
        break;

      case types.LIST_SELECTED:
        style.fontWeight = 'bold';
        break;
    }

    return style;
  }
}
