import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MapView from 'react-native-maps';

import Button from '../../misc/Button';
import MarkerCallout from '../../misc/MarkerCallout';

import {getCurrentPosition} from '../../../utilities/utils';
import {fetchCloseby} from '../../../utilities/wrapper';

import * as mapActions from '../../../actions/mapActions';
import * as searchActions from '../../../actions/searchActions';

var map = null;

class SearchMap extends React.Component {
  static propTypes = {
    validate: PropTypes.func.isRequired,
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={ref => {map = ref}}
          showsMyLocationButton={false}
          followsUserLocation={this.props.followsUser}
          initialRegion={this.props.searchCoordinate}
          style={StyleSheet.absoluteFill}
          showsUserLocation={true}
          onPress={this.mapPressed.bind(this)}>
          {this.renderMarker()}
        </MapView>
        <View style={{ position: 'absolute', right: 10, top: 10, width: 50 }}>
          <Button type={"small"} text={this.props.followsUser ? "📍" : "🚗"} onPress={this.toggleMapCenter.bind(this)} />
        </View>
      </View>
    );
  }

  toggleMapCenter() {
    if(map) {
      if(this.props.followsUser) {
        if(this.props.searchCoordinate) {
          map.animateToRegion(this.props.searchCoordinate)
        }
      } else {
        getCurrentPosition(pos => {
          const {coords} = pos;
          const region = {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          };
          map.animateToRegion(region);
          this.props.setCurrentUserPosition(pos);
        })
      }

      this.props.toggleFollowUser();
    }
  }

  renderMarker() {
    if(this.props.searchCoordinate) {
      return <MapView.Marker
        coordinate={this.props.searchCoordinate}
        title={this.props.vegInput}
        >
      </MapView.Marker>
    }
  }

  mapPressed(info) {
    this.props.resetPositionSearchParameters();

    const {coordinate} = info.nativeEvent;

    fetchCloseby(1, coordinate, function(closest) {
      if(closest.code) {
        alert("Det er ingen veier i nærheten av dette punktet.")
      } else {
        const veg = closest.vegreferanse.kategori + closest.vegreferanse.status + closest.vegreferanse.nummer;

        this.props.inputVeg(veg);
        this.props.chooseFylke([closest.fylke]);
        if(closest.vegreferanse.kategori == "K") { this.props.chooseKommune([closest.kommune]) }
        this.props.selectSearchCoordinate(coordinate);

        setTimeout(() => {
          this.props.validate();
        }, 10)
      }
    }.bind(this));
  }
}

function mapStateToProps(state) {
  return {
    vegInput: state.searchReducer.vegInput,
    searchCoordinate: state.searchReducer.searchCoordinate,
    followsUser: state.mapReducer.followsUser,
    currentUserPosition: state.mapReducer.currentUserPosition,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    inputVeg: bindActionCreators(searchActions.inputVeg, dispatch),
    chooseKommune: bindActionCreators(searchActions.chooseKommune, dispatch),
    chooseFylke: bindActionCreators(searchActions.chooseFylke, dispatch),
    selectSearchCoordinate: bindActionCreators(searchActions.selectSearchCoordinate, dispatch),
    resetPositionSearchParameters: bindActionCreators(searchActions.resetPositionSearchParameters, dispatch),

    toggleFollowUser: bindActionCreators(mapActions.toggleFollowUser, dispatch),
    setCurrentUserPosition: bindActionCreators(mapActions.setCurrentUserPosition, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SearchMap);
