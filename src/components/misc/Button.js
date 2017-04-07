import React from 'react'
import {
  Text,
  TouchableHighlight,
  StyleSheet,
  View
} from 'react-native';

import * as templates from '../../utilities/templates'

var Button = React.createClass({
  render() {
    var subText = this.props.subText ? <Text style={this.subTextStyle()}>{this.props.subText}</Text> : null;

    return <TouchableHighlight
      key={this.props.k}
      style={this.buttonStyle()}
      onPress={this.props.onPress}
      underlayColor={templates.colors.orange}
      >
      <View>
        <Text style={this.textStyle()}>{this.props.text}</Text>
        {subText}
      </View>
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
    const style = this.props.style + "Text";
    if(styles[style]) {
      return [styles.text, styles[style]]
    }
  },

  subTextStyle() {

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
    backgroundColor: templates.colors.white,
  },
  title: {
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: templates.colors.orange,
    margin: 5,
    height: 75,
    width: 250,
  },
  large: {
    margin: 5,
    height: 50,
    width: 150,
    backgroundColor: templates.colors.orange,
  },
  list: {
    borderWidth: 0.5,
    backgroundColor: templates.colors.orange,
    borderColor: templates.colors.white,
    height: 30,
  },
  text: {
    color: templates.colors.white,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 22,
  },
  subText: {
    fontSize: 10,
  }
})

export default Button;
