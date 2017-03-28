import React, { Component } from 'react';
import { Text } from 'react-native';

var PropertyValue = React.createClass({
  render() {
    return <Text>
      <Text style={{fontWeight: 'bold'}}>{this.props.property}: </Text>
      <Text>{this.props.value}</Text>
    </Text>
  }
})

export default PropertyValue;
