import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

import { connect } from 'react-redux';

import MapView from 'react-native-maps';

import MarkerCallout from '../misc/MarkerCallout'

import * as templates from '../../utilities/templates';

var MapMarker = React.createClass({
  render() {
    const {marker} = this.props;
    var isCluster = marker.properties.cluster !== undefined;

    if(isCluster) {
      return <View style={{backgroundColor: templates.colors.blue, padding: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 100}}>
        <Text style={{color: templates.colors.white, fontWeight: 'bold'}}>{marker.properties.point_count_abbreviated}</Text>
      </View>
    } else {
      const {roadObject} = marker.properties;
      const coords = { latitude: 0, longitude: 0 };

      return <MapView.Marker
        key={roadObject.id}
        pinColor={templates.colors.blue}
        >
        <MapView.Callout style={{flex: 1, position: 'relative'}}>
          <MarkerCallout
            roadObject={roadObject}
          />
        </MapView.Callout>
      </MapView.Marker>
    }
  }
});

export default connect(null, null) (MapMarker);
