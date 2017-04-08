import React from 'react'
import {
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

import * as templates from '../../utilities/templates'

let ScreenWidth = Dimensions.get("window").width;

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
    borderRadius: 2,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
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
  search: {
    width: ScreenWidth * 0.95,
    height: 50,
    backgroundColor: templates.colors.orange,
    shadowColor: 'black',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 20,
  },
  searchText: {
    fontSize: 20,
  },
  list: {
    backgroundColor: templates.colors.orange,
    marginBottom: 2,
    height: 40,
  },
  listSelected: {
    backgroundColor: templates.colors.blue,
    marginBottom: 2,
    height: 50,
  },
  listText: {
    color: templates.colors.white,
  },
  listSelectedText: {
    color: templates.colors.white,
    fontSize: 22,
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
