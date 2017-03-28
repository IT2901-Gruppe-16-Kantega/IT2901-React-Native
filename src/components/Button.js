import React from 'react'
import {
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import * as templates from '../utilities/templates'

var Button = React.createClass({
  render() {
    return <TouchableHighlight
      style={styles.button}
      onPress={this.props.onPress}
      underlayColor={templates.colors.orange}
      >
      <Text style={styles.buttonText}>{this.props.text}</Text>
    </TouchableHighlight>
  }
})

var styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    height: 50,
    width: 150,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: templates.colors.orange,
  },
  buttonText: {

  }
})

export default Button;
