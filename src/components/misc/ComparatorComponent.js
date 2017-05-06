import React from 'react';
import {
  Text,
  TouchableHighlight,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as filterActions from '../../actions/filterActions';

import * as templates from '../../utilities/templates';
import * as values from '../../utilities/values';

/*
Component used to choose different filters when searching
for road objects.
*/
class ComparatorComponent extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(Object.values(values.comparators)).isRequired,
  }

  render() {
    return (
      <TouchableHighlight
        style={this.styleButton()}
        underlayColor={templates.colors.blue}
        onPress={this.selectFunction.bind(this, this.props.type)}>
        <Text style={this.styleText()}>{this.props.type}</Text>
      </TouchableHighlight>
    );
  }

  // Called when selecting a function.
  selectFunction(type) {
    this.props.selectFunction(this.props.type);

    // Because HAS_VALUE and HAS_NOT_VALUE is not dependent on a filter value,
    // clicking any of these buttons will deselect any selected filter value.
    if(this.props.type === values.comparators.HAS_VALUE || this.props.type === values.comparators.HAS_NOT_VALUE) {
      this.props.deselectFilterValue();
    }
  }

  // Checks if the comparator is the currently selected comparator.
  isSelected() {
    return this.props.selectedFunction === this.props.type;
  }

  // The style of the container
  styleButton() {
    return {
      flex: 1,
      margin: 2,
      padding: 5,
      borderRadius: 3,
      backgroundColor: this.isSelected() ? templates.colors.green : templates.colors.orange,
    }
  }

  // The style of the text
  styleText() {
    return {
      fontSize: 15,
      textAlign: 'center',
      color: 'white',
      fontWeight: this.isSelected() ? 'bold' : '100'
    }
  }
}

function mapStateToProps(state) {
  return {
    selectedFunction: state.filterReducer.selectedFunction,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectFunction: bindActionCreators(filterActions.selectFunction, dispatch),
    deselectFilterValue: bindActionCreators(filterActions.deselectFilterValue, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ComparatorComponent);
