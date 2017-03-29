import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ListView,
  ScrollView,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Button from '../misc/Button'

import {searchForFylke, fetchVegerFromAPI} from '../../utilities/utils';
import {fetchTotalNumberOfObjects} from '../../utilities/wrapper'
import {vegobjekttyper} from '../../data/vegobjekttyper';
import * as templates from '../../utilities/templates'
import * as dataActions from '../../actions/dataActions'
import * as searchActions from '../../actions/searchActions'

var preFetchURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/96/statistikk';
var baseURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/';

var valid = true;
const vegobjekttyperMedPunkt = [];

/*
View used when user specifies what data to be fetched from NVDB
*/
var SearchView = React.createClass({
  componentDidMount() {
  },

  render() {
    return <View style = {templates.container}>
      <View style={templates.top}/>
      <View style={styles.navigatorSpace}/>
      <View style={styles.header}>
        <Text style={{color: templates.colors.white}}>NVDB-app</Text>
        <Text/>
      </View>
      <View style={styles.contentsFrame}>
        <View style={styles.contentsArea}>
          <ScrollView style={styles.scrollContainer}>
            <View style={styles.contents}>
              <View style={styles.searchTypeHeading}><Text style={styles.text}>Hvor?</Text></View>
              <View style={styles.searchParameterContainer}>
                <View style={styles.searchLabel}><Text style={styles.text}>Fylke</Text></View>
                {this.createInputField(
                  'fylke',
                  this.props.fylke_input,
                  this.props.fylke_text,
                  this.props.fylke_chosen,
                  true,
                  this.props.inputFylke,
                  this.chooseFylke
                )}
                <View style={styles.parameterRightPadding}><Text></Text></View>
              </View>
              <View style={styles.parameterBottomPadding}><Text></Text></View>

              <View style={styles.searchParameterContainer}>
                <View style={styles.searchLabel}><Text style={styles.text}>Veg</Text></View>
                {this.createVegInput()}
                <View style={styles.parameterRightPadding}><Text></Text></View>
              </View>
              <View style={styles.parameterBottomPadding}><Text></Text></View>

              <View style={styles.searchParameterContainer}>
                <View style={styles.searchLabel}><Text style={styles.text}>Kommune</Text></View>
              </View>
              <View style={styles.parameterPadding}><Text></Text></View>
            </View>


            <View style={styles.hvaContents}>
              <View style={styles.searchTypeHeading}><Text style={styles.text}>Hva?</Text></View>
              <View style={styles.searchParameterContainer}>
                <View style={styles.searchLabel}><Text style={styles.text}>Type</Text></View>
                {this.createInputField(
                  'vegobjekttype',
                  this.props.vegobjekttyper_input,
                  this.props.vegobjekttyper_text,
                  this.props.vegobjekttyper_chosen,
                  true,
                  this.props.inputVegobjekttyper,
                  this.chooseVegobjekttyper
                )}
                <View style={styles.parameterRightPadding}><Text></Text></View>
              </View>
              <View style={styles.parameterBottomPadding}><Text></Text></View>
            </View>
          </ScrollView>
        </View>
      </View>
      <View style={styles.parameterBottomPadding}><Text></Text></View>

      {this.createNumerOfObjectsToBeFetcher()}

      <View style={styles.buttonArea}>
        <Button text="Søk" onPress={this.search} style={"small"} />
      </View>
      <View style={templates.footer}>
        <Text style={{color: templates.colors.darkGray}}>Gruppe 16 NTNU</Text>
      </View>
    </View>
  },

  chooseFylke(input) {
    var chosenFylke = [];
    chosenFylke.push(this.props.fylke_input.find((fylke) => {
      if(fylke.navn == input){
        return fylke;
      }
    }))
    this.props.chooseFylke(chosenFylke);
  },

  chooseVegobjekttyper(input) {
    console.log("choose" + input)
    var chosenVegobjekttyper = [];
    chosenVegobjekttyper.push(this.props.vegobjekttyper_input.find((vegobjekttype) => {
      if(vegobjekttype.navn == input){
        return vegobjekttype;
      }
    }))
    this.props.chooseVegobjekttyper(chosenVegobjekttyper);
  },

  //Slå sammen med den generelle etter at den er ferdig
  createInputField(type, list, textType, choosenBool ,editable, inputFunction, chooserFunction, multiInputEnabled){
    var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(list);

    return <View style={styles.inputContainer}>
      <TextInput
        autocorrect={false}
        autofocus={editable}
        editable={editable}
        style={styles.textInput}
        placeholder={'Skriv inn '+type}
        onChangeText={(text) => inputFunction({text})}
        keyboardType="default"
        returnKeyType='done'
        value={textType}
        />
      <ListView
        dataSource={dataSource}
        enableEmptySections= {true}
        renderRow={(rowData) => {
          if(!choosenBool){
            return <Button
              style={"list"}
              onPress={chooserFunction.bind(this, rowData.navn)}
              text={rowData.navn}
            />
          }
          else {
            return <View></View>
          }
          }}/>
    </View>
  },

  createVegInput() {
    return <View style={styles.inputContainer}>
      <TextInput
        autocorrect= {false}
        style={styles.textInput}
        placeholder={'Skriv inn veg. Type+nummer(R136)'}
        onChangeText={(text) => this.props.newInputVeg({text})}
        keyboardType = "default"
        returnKeyType = 'done'
        />
    </View>
  },

  search() {
      if(this.props.fylke_chosen&&this.props.vegobjekttyper_chosen) {
        const objektID = this.props.vegobjekttyper_input[0].id;
        const fylkeID = this.props.fylke_input[0].nummer;
        const veg = this.props.new_veg_input.text;
        var preurl = baseURL+objektID+'/statistikk?fylke='+fylkeID+'&vegreferanse='+veg;
        var url = baseURL+objektID+'?fylke='+fylkeID+'&vegreferanse='+veg+'&inkluder=alle&srid=4326&antall=8000';

        fetchTotalNumberOfObjects(preurl).then(function(response) {
          if(response.antall == undefined) {
            Alert.alert("Ugyldig veg", "Sjekk at vegen du har skrevet inn eksisterer og at format er vegkategori+vegnummer (E6 f.eks)");
          }
          else {
            this.props.setURL(url);
            this.props.combineSearchParameters(this.props.fylke_input[0], this.props.new_veg_input, this.props.vegobjekttyper_input[0]);

            Actions.LoadingView();
          }
        }.bind(this));

      }
      else {
        Alert.alert("Ugyldig data", "Sjekk felter for korrekt input");
      }
    },

  //TODO
  //fungerer nå, men bør gjøre håndtering av manglende input bedre
  createNumerOfObjectsToBeFetcher(){
    if(this.props.fylke_chosen&&this.props.vegobjekttyper_chosen){
      const objektID = this.props.vegobjekttyper_input[0].id;
      const fylkeID = this.props.fylke_input[0].nummer;
      const veg = this.props.new_veg_input.text;
      var preurl = baseURL+objektID+'/statistikk?fylke='+fylkeID+'&vegreferanse='+veg;
      var numberOfObjectsToBeFetched = 0;
      fetchTotalNumberOfObjects(preurl).then(function(response){
        numberOfObjectsToBeFetched = response.antall;
        this.props.setNumberOfObjectsToBeFetched(numberOfObjectsToBeFetched);
      }.bind(this));
      return <View style={styles.numberOfObjectsToBeFetched}>
        <Text style={styles.text}>Antall objekter som blir hentet: {this.props.numberOfObjectsToBeFetched}</Text>
      </View>
    }
    else{
      return <View style={styles.numberOfObjectsToBeFetched}>
        <Text style={styles.text}>Antall objekter som blir hentet: ?</Text>
      </View>
    }
  }
});

var styles = StyleSheet.create({
  //Top-leve containers
  navigatorSpace: {
    flex:1.3,
    backgroundColor: templates.colors.white,
  },
  header: {
    flex: 1.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: templates.colors.white
  },
  contentsFrame: {
    flex: 15.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },

  //Containers in contentsFrame
  contentsArea: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  scrollContainer: {
    backgroundColor: templates.colors.white,
  },
  contents: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'darkgray',
    backgroundColor: templates.colors.white,
  },
  hvaContents: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.white,
  },
  searchTypeHeading: {
    flex: 2,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listViewStyle: {
    flex:1,
  },
  searchParameterContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  searchLabel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.white,
  },
  inputContainer: {
    flex: 4,
    backgroundColor: templates.colors.lightGray

  },
  parameterBottomPadding: {
    flex: 0.5,
    backgroundColor: templates.colors.white,
  },
  parameterRightPadding: {
    flex: 0.25
  },

  numberOfObjectsToBeFetched: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: templates.colors.white,
  },

  //components
  textInput: {
    padding: 5,
    height: 40,
    color: templates.colors.darkGray,
    borderWidth: 2,
    borderColor: templates.colors.middleGray,
  },

  buttonArea: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: templates.colors.white
  },

  text: {
    color: templates.colors.darkGray,
  },
})

function mapStateToProps(state) {
  return {
    //fylke fields
    fylke_input: state.searchReducer.fylke_input,
    fylke_valid: state.searchReducer.fylke_valid,
    fylke_navn: state.searchReducer.fylke_navn,
    fylke_text: state.searchReducer.fylke_text,
    fylke_chosen: state.searchReducer.fylke_chosen,

    //veg fields
    new_veg_input: state.searchReducer.new_veg_input,

    //vegobjekttyper fields
    vegobjekttyper_input: state.searchReducer.vegobjekttyper_input,
    vegobjekttyper_valid: state.searchReducer.vegobjekttyper_valid,
    vegobjekttyper_navn: state.searchReducer.vegobjekttyper_navn,
    vegobjekttyper_text: state.searchReducer.vegobjekttyper_text,
    vegobjekttyper_chosen: state.searchReducer.vegobjekttyper_chosen,

    combinedSearchParameters: state.searchReducer.combinedSearchParameters,
    numberOfObjectsToBeFetched: state.dataReducer.numberOfObjectsToBeFetched,
  };}

function mapDispatchToProps(dispatch) {
  return {
    //input search variables, uses searchActions to set variables before creatingURL
    inputFylke: bindActionCreators(searchActions.inputFylke, dispatch),
    chooseFylke: bindActionCreators(searchActions.chooseFylke, dispatch),

    newInputVeg: bindActionCreators(searchActions.newInputVeg, dispatch),

    inputVegobjekttyper: bindActionCreators(searchActions.inputVegobjekttyper, dispatch),
    chooseVegobjekttyper: bindActionCreators(searchActions.chooseVegobjekttyper, dispatch),

    setURL: bindActionCreators(searchActions.setURL, dispatch),
    combineSearchParameters: bindActionCreators(searchActions.combineSearchParameters, dispatch),
    setNumberOfObjectsToBeFetched: bindActionCreators(dataActions.setNumberOfObjectsToBeFetched, dispatch),

    //TO be DEPRECATED
    inputVegkategori: bindActionCreators(searchActions.inputVegkategori, dispatch),
    chooseVegkategori: bindActionCreators(searchActions.chooseVegkategori, dispatch),

    inputVeg: bindActionCreators(searchActions.inputVeg, dispatch),
    chooseVeg: bindActionCreators(searchActions.chooseVeg, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SearchView);
