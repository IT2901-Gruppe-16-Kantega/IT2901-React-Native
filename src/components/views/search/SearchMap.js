import React from 'react';
import {
  View,
} from 'react-native';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MapView from 'react-native-maps';

import MarkerCallout from '../../misc/MarkerCallout'

import {fetchCloseby} from '../../../utilities/wrapper'
import * as searchActions from '../../../actions/searchActions'

class SearchMap extends React.Component {
  static propTypes = {
    validate: PropTypes.func.isRequired,
  }

  render() {
    return <MapView
      showsMyLocationButton={true}
      initialRegion={this.props.searchCoordinate}
      style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}
      showsUserLocation={true}
      onPress={this.mapPressed.bind(this)}>
      {this.renderMarker()}
    </MapView>
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    inputVeg: bindActionCreators(searchActions.inputVeg, dispatch),
    chooseKommune: bindActionCreators(searchActions.chooseKommune, dispatch),
    chooseFylke: bindActionCreators(searchActions.chooseFylke, dispatch),
    selectSearchCoordinate: bindActionCreators(searchActions.selectSearchCoordinate, dispatch),
    resetPositionSearchParameters: bindActionCreators(searchActions.resetPositionSearchParameters, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SearchMap);
