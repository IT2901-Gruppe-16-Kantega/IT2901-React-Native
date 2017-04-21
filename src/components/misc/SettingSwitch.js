import React from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet
} from 'react-native';

import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import * as templates from '../../utilities/templates';

class SettingSwitch extends React.Component {
  propTypes: {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired,
  }

  render() {
    return <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Switch {...this.props} />
      </View>
      <View style={styles.textContainer}>
        <Text style={this.props.theme.subtitle}>{this.props.title}</Text>
        <Text style={this.props.theme.text}>{this.props.description}</Text>
      </View>
    </View>
  }
}

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
})

function mapStateToProps(state) {
  return { theme: state.settingsReducer.themeStyle };
}

export default connect(mapStateToProps, null) (SettingSwitch);
