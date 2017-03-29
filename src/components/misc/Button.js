import React from 'react'
import {
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import * as templates from '../../utilities/templates'

var Button = React.createClass({
  render() {
    return <TouchableHighlight
      style={this.buttonStyle()}
      onPress={this.props.onPress}
      underlayColor={templates.colors.orange}
      >
      <Text style={this.textStyle()}>{this.props.text}</Text>
    </TouchableHighlight>
  },

  buttonStyle() {
    if(!this.props.style) {
      return [styles.button, styles.large]
    }
    return [styles.button, styles[this.props.style]]
  },

  textStyle() {
    if(!this.props.style) {
      return styles.text;
    }
  }
})

var styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: templates.colors.orange,
  },
  small: {
    height: 30,
    width: 100,
  },
  large: {
    height: 50,
    width: 150
  },
  list: {
    borderWidth: 0.5,
    backgroundColor: templates.colors.orange,
    borderColor: templates.colors.white,
    height: 30,
  },
  text: {
    fontWeight: 'bold',
  }
})

export default Button;
