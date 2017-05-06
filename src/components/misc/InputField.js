import React from 'react';
import {
  View,
  Text,
  TextInput,
  ListView,
  Keyboard,
} from 'react-native';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as templates from '../../utilities/templates';
import Button from './Button';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// Used to run updateFunction only when value updated
var changed = false;

class InputField extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    textType: PropTypes.string.isRequired, // The typed text
    chosen: PropTypes.bool.isRequired,
    inputFunction: PropTypes.func.isRequired, // When user types something
    chooserFunction: PropTypes.func, // When user selects something from list
    colorController: PropTypes.oneOf(['red', templates.colors.orange, templates.colors.green]).isRequired,
    updateFunction: PropTypes.func.isRequired,
    extData: PropTypes.array, // Extra data to filter list
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2})
    var list = this.props.list || [];

    return (
      <View style={{ padding: 10 }}>
        {this.renderHeader()}
        <View style={this.styleTextInputContainer()}>
          <TextInput
            underlineColorAndroid={'rgba(0,0,0,0)'}
            autocorrect={false}
            autofocus={this.props.editable}
            editable={this.props.editable}
            style={this.styleTextInput()}
            placeholderTextColor={this.props.theme.placeholderTextColor}
            placeholder={'Skriv inn ' + this.props.type}
            onChangeText={this.textInputTextChanged.bind(this)}
            value={this.props.textType}
            onFocus={() => changed = false}
            onBlur={this.update.bind(this)}
            returnKeyType={'done'}
            clearButtonMode={'while-editing'}
            />
        </View>
        <ListView
          style={this.styleListView()}
          // For user to not have to tap twice (once to defocus text field,
          //once to actually select item)
          keyboardShouldPersistTaps={'always'}
          dataSource={ds.cloneWithRows(list)}
          enableEmptySections={true}
          renderRow={this.renderListRow.bind(this)} />
      </View>
    );
  }

  // Render help text over TextInput
  renderHeader() {
    // Render only if user has typed something
    if(this.props.textType) {
      return <Text style={[this.props.theme.text, {marginLeft: 5}]}>{this.props.type.capitalize()}</Text>
    }
  }

  // Render each of the selectable items from the list as buttons under TextInput
  renderListRow(row) {
    if(this.props.chosen) return <View />
    return (
      <Button
        type={"list"}
        text={row.navn}
        onPress={() => {
          Keyboard.dismiss();
          this.props.chooserFunction([row]);
          this.props.updateFunction();
        }} />
    );
  }

  // Called when user inputs text to TextInput
  textInputTextChanged(text) {
    changed = true; // Set flag to true, calls update on blur

    // If any extra data, input function filters on it
    if(this.props.extData) {
      this.props.inputFunction(text, this.props.extData);
    } else {
      this.props.inputFunction(text);
    }
    // Calls update function on every key stroke if input has no
    // list to select from. This means free text field. Also calls
    // update function when user clears TextInput.
    if(!this.props.chooserFunction || text === '') {
      this.props.updateFunction();
    }
  }

  // Call update function if the value has been changed
  update() {
    if(changed) this.props.updateFunction();
  }

  // Create style for text input container
  styleTextInputContainer() {
    return {
      borderBottomWidth: 2,
      borderBottomColor: this.props.colorController
    }
  }

  // Creates style for text input field
  styleTextInput() {
    return {
      padding: 5,
      height: 40,
      color: this.props.theme.primaryTextColor,
    }
  }

  // Create style for list view under InputField
  styleListView() {
    var height;
    // If value chosen, or the input has no list, set height to 0
    if(this.props.chosen || !(this.props.list)) { height = 0 }
    // Set the height to maximum 150 if there are more list items
    else { height = Math.min(this.props.list.length * 40, 150) }
    return { height: height }
  }
}

function mapStateToProps(state) {
  return { theme: state.settingsReducer.themeStyle };
}

export default connect(mapStateToProps, null) (InputField);
