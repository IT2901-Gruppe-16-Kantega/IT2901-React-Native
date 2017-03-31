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
*/
var ds;
var dataSource;

var InputField = React.createClass({
  componentWillMount(){

  },
  render() {
    ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2})
    dataSource = ds.cloneWithRows(this.props.list)
    return <View style={styles.inputContainer}>
      <TextInput
        autocorrect={false}
        autofocus={this.props.editable}
        editable={this.props.editable}
        style={styles.textInput}
        placeholder={'Skriv inn '+this.props.type}
        onChangeText={(text) => this.props.inputFunction({text})}
        keyboardType="default"
        returnKeyType='done'
        value={this.props.textType}
        />
      <ListView
        keyboardShouldPersistTaps='always'
        dataSource={dataSource}
        enableEmptySections= {true}
        renderRow={(rowData) => {
          if(!this.props.choosenBool){
            return <Button
              style={"list"}
              onPress={()=>{
                var chosenFylke = [];
                chosenFylke.push(this.props.list.find((fylke) => {
                  if(fylke.navn == rowData.navn){
                    return fylke;
                  }
                }))
                this.props.chooserFunction(chosenFylke)}}
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
    backgroundColor: templates.colors.white

  },
  textInput: {
    padding: 5,
    height: 40,
    color: templates.colors.darkGray,
    borderWidth: 2,
    borderColor: templates.colors.darkGray,
  },
})

export default InputField;
