import React, { Component } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet
} from 'react-native';

import { connect } from 'react-redux'

import * as templates from '../../utilities/templates';

var SettingSwitch = React.createClass({
  render() {
    return <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Switch
          disabled={this.props.disabled}
          onValueChange={this.props.onChange}
          value={this.props.value} />
      </View>
      <View style={styles.textContainer}>
        <Text style={{color: this.props.style.primaryTextColor}}>{this.props.title}</Text>
        <Text style={styles.description}>{this.props.description}</Text>
      </View>
    </View>
  },
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  switchContainer: {
    flex: 0.2,
  },
  textContainer: {
    flex: 0.8,
  },
  title: {
    fontSize: 20,
  },
  description: {
    color: templates.colors.darkGray,
    fontSize: 12,
    marginTop: 0,
  }
});

function mapStateToProps(state) {
  return { style: state.settingsReducer.themeStyle };
}

export default connect(mapStateToProps, null) (SettingSwitch);
