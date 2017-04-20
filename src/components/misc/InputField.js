import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ListView,
  ScrollView,
  Keyboard,
} from 'react-native';

import { connect } from 'react-redux'

import * as templates from '../../utilities/templates'
import Button from './Button'

/* props:
type,
list,
textType,
choosenBool ,
inputFunction,
chooserFunction,
colorController,
updateFunction,
extData
*/

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var InputField = React.createClass({
  componentWillMount(){

  },
  render() {
    var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2})
    var dataSource = ds.cloneWithRows(this.props.list)

    return <View>
      {this.renderHeader()}
      <View style={{borderBottomWidth: 2, borderBottomColor: this.props.colorController}}>
        <TextInput
          underlineColorAndroid={templates.colors.lightGray}
          autocorrect={false}
          autofocus={this.props.editable}
          editable={this.props.editable}
          style={{
            padding: 5,
            height: 40,
            color: this.props.theme.primaryTextColor,
          }}
          placeholderTextColor={this.props.theme.placeholderTextColor}
          placeholder={'Skriv inn ' + this.props.type}
          onChangeText={(text) => {
            this.props.updateFunction()
            if(this.props.type === 'kommune'){
              this.props.inputFunction(text, this.props.extData)
            }else{
              this.props.inputFunction(text)
            }
          }}
          value={this.props.textType}
          onBlur={this.props.updateFunction}
          keyboardType="default"
          returnKeyType='done'
          />
      </View>
      <ListView
        style={this.getListViewStyle()}
        keyboardShouldPersistTaps='always'
        dataSource={dataSource}
        enableEmptySections= {true}
        renderRow={(rowData) => {
          if(!this.props.choosenBool) {
            return <Button
              type={"list"}
              onPress={()=>{
                Keyboard.dismiss();

                var chosenData = [];
                chosenData.push(this.props.list.find((data) => {
                  if(data.navn == rowData.navn){
                    return data;
                  }
                }))
                this.props.chooserFunction(chosenData)
                this.props.updateFunction()
              }}
              text={rowData.navn}
            />
          }
          else {
            return <View></View>
          }
          }}/>
    </View>
  },

  renderHeader() {
    if(this.props.textType) {
      return <Text style={[this.props.theme.text, {marginLeft: 5}]}>{this.props.type.capitalize()}</Text>
    }
  },

  getListViewStyle() {
    var height;
    if(this.props.choosenBool) { height = 0 }
    else { height = Math.min(this.props.list.length * 40, 150) }
    return {
      height: height,
    }
  }
})

function mapStateToProps(state) {
  return { theme: state.settingsReducer.themeStyle };
}

export default connect(mapStateToProps, null) (InputField);
