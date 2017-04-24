import React from 'react';
import { Text, View, TouchableHighlight, Navigator, LayoutAnimation } from 'react-native';

import * as templates from '../../utilities/templates'

export default class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hide: false }

    this.dismissModal = this.dismissModal.bind(this);
  }

  dismissModal() {
    this.setState({hide: true})
  }

  componentWillReceiveProps() {
    console.log("hei")
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.dismissModal} style={this.style()}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>{this.props.message}</Text>
      </TouchableHighlight>
    );
  }

  style() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    return {
      backgroundColor: templates.colors.blue,
      position: 'absolute',
      right: 0,
      left: 0,
      top: this.state.hide ? -10 : 20,
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 10,
      shadowColor: 'black',
      shadowOpacity: 1,
      padding: 20,
    }
  }
}
