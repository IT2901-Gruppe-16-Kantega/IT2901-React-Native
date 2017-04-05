import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ListView,
  ScrollView,
 } from 'react-native';

 import * as templates from '../../utilities/templates'
 import Button from './Button'

/* props:
type,
list,
textType,
choosenBool ,
editable,
inputFunction,
chooserFunction,
colorController,
updateFunction,
extData
*/


var InputField = React.createClass({
  componentWillMount(){

  },
  render() {
    var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2})
    var dataSource = ds.cloneWithRows(this.props.list)
    var colorBackground =''
    var placeholderColorVar =''
    if(this.props.editable){
      colorBackground = templates.colors.lightGray
      placeholderColorVar=templates.colors.placeholderColor
    }
    else{
      colorBackground = templates.colors.middleGray
      placeholderColorVar = templates.colors.middleGray
    }
    return <View style={styles.inputContainer}>
      <View style={{borderBottomWidth: 2, borderBottomColor: this.props.colorController}}>
        <TextInput
          underlineColorAndroid={templates.colors.lightGray}
          autocorrect={false}
          autofocus={this.props.editable}
          editable={this.props.editable}
          style={{
            padding: 5,
            height: 40,
            color: templates.colors.darkGray,
            backgroundColor: colorBackground
          }}
          placeholderTextColor={placeholderColorVar}
          placeholder={'Skriv inn '+this.props.type}
          onChangeText={(text) => {
            if(this.props.type=='kommune'){
              this.props.inputFunction(text, this.props.extData)
            }else{
              this.props.inputFunction(text)
            }
          }}
          onBlur={this.props.updateFunction}
          keyboardType="default"
          returnKeyType='done'
          value={this.props.textType}
          />
      </View>
      <ListView
        keyboardShouldPersistTaps='always'
        dataSource={dataSource}
        enableEmptySections= {true}
        renderRow={(rowData) => {
          if(!this.props.choosenBool){
            return <Button
              style={"list"}
              onPress={()=>{
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
  }
})

var styles = StyleSheet.create({
  inputContainer: {
    flex: 4,
    backgroundColor: templates.colors.white,

  },
  textInput: {
    padding: 5,
    height: 40,
    color: templates.colors.darkGray,
    backgroundColor: templates.colors.lightGray,
    borderTopWidth: 3,
    borderTopColor: 'red',

  },
})

export default InputField;
