import React, { Component } from 'react';
import {
  View,
  Text,
  Switch,
} from 'react-native';

import { connect } from 'react-redux'

import * as templates from '../../utilities/templates';

var SettingSwitch = React.createClass({
  render() {
    return <View style={{ flexDirection: 'row', padding: 10 }}>
      <View style={{ flex: 0.2 }}>
        <Switch
          disabled={this.props.disabled}
          onValueChange={this.props.onChange}
          value={this.props.value} />
        <View />
      </View>
      <View style={{ flex: 0.8 }}>
        <View style={{ height: 35, justifyContent: 'flex-start' }}>
          <Text style={{ fontSize: 20 }}>{this.props.text}</Text>
        </View>
        <Text style={{ color: templates.colors.darkGray, fontSize: 12 }}>{this.props.description}</Text>
      </View>
    </View>
  }
});

export default connect(null, null) (SettingSwitch);
