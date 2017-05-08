import React from 'react';
import { View } from 'react-native';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import InputField from './InputField';

import * as searchActions from '../../actions/searchActions'

class LocationInputComponent extends React.Component {
  static propTypes = {
    validate: PropTypes.func.isRequired,
    withVeg: PropTypes.bool,
  }

  render() {
    return (
      <View>
        {this.createFylkeInput()}
        {this.createKommuneInput()}
        {this.props.withVeg && this.createVegInput()}
      </View>
    );
  }

  createFylkeInput() {
    return (
      <View>
        <InputField type={"fylke"}
          list={this.props.fylkeInput}
          textType={this.props.fylkeText}
          chosen={this.props.fylkeChosen}
          inputFunction={this.props.inputFylke}
          chooserFunction={this.props.chooseFylke}
          colorController={this.props.fylkeColor}
          updateFunction={this.props.validate}
          />
      </View>
    );
  }

  createKommuneInput() {
    return (
      <View>
        <InputField type={"kommune"}
          list={this.props.kommuneInput}
          textType={this.props.kommuneText}
          chosen={this.props.kommuneChosen}
          inputFunction={this.props.inputKommune}
          chooserFunction={this.props.chooseKommune}
          colorController={this.props.kommuneColor}
          updateFunction={this.props.validate}
          extData={this.props.fylkeInput}
          />
      </View>
    );
  }

  createVegInput() {
    return (
      <InputField type={"veg"}
        list={[]}
        chosen={true}
        inputFunction={this.props.inputVeg}
        chooserFunction={null}
        colorController={this.props.vegColor}
        textType={this.props.vegInput.toUpperCase()}
        updateFunction={this.props.validate}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    fylkeInput: state.searchReducer.fylkeInput,
    fylkeText: state.searchReducer.fylkeText,
    fylkeChosen: state.searchReducer.fylkeChosen,
    fylkeColor: state.searchReducer.fylkeColor,

    kommuneInput: state.searchReducer.kommuneInput,
    kommuneText: state.searchReducer.kommuneText,
    kommuneChosen: state.searchReducer.kommuneChosen,
    kommuneColor: state.searchReducer.kommuneColor,

    vegInput: state.searchReducer.vegInput,
    vegColor: state.searchReducer.vegColor,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    inputFylke: bindActionCreators(searchActions.inputFylke, dispatch),
    chooseFylke: bindActionCreators(searchActions.chooseFylke, dispatch),

    inputKommune: bindActionCreators(searchActions.inputKommune, dispatch),
    chooseKommune: bindActionCreators(searchActions.chooseKommune, dispatch),

    inputVeg: bindActionCreators(searchActions.inputVeg, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (LocationInputComponent);
