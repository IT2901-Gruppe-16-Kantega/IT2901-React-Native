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
import InputField from '../misc/InputField'

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

          <ScrollView
            style={styles.scrollContainer}
            scrollEnabled={false}
            keyboardShouldPersistTaps='always'
            >
            <View style={styles.contents}>
              <View style={styles.searchTypeHeading}><Text style={styles.text}>Hvor?</Text></View>

              <View style={styles.searchParameterContainer}>
                <View style={styles.searchLabel}><Text style={styles.text}>Fylke</Text></View>
                <InputField type='fylke'
                  list={this.props.fylke_input}
                  textType={this.props.fylke_text}
                  choosenBool={this.props.fylke_chosen}
                  editable={true}
                  inputFunction={this.props.inputFylke}
                  chooserFunction={this.props.chooseFylke}
                  />
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
                <InputField type='kommune'
                  list={this.props.kommune_input}
                  textType={this.props.kommune_text}
                  choosenBool={this.props.kommune_chosen}
                  editable={this.props.kommune_enabled}
                  inputFunction={this.props.inputKommune}
                  chooserFunction={this.props.chooseKommune}
                  extData={this.props.fylke_input}
                  />
                <View style={styles.parameterRightPadding}><Text></Text></View>
              </View>
              <View style={styles.parameterBottomPadding}><Text></Text></View>
              </View>


              <View style={styles.hvaContents}>
                <View style={styles.hvaHeading}><Text style={styles.text}>Hva?</Text></View>
                <View style={styles.vegobjekttypeArea}>
                  <View style={styles.searchLabel}><Text style={styles.text}>Type</Text></View>
                  <InputField type='vegobjekttype'
                    list={this.props.vegobjekttyper_input}
                    textType={this.props.vegobjekttyper_text}
                    choosenBool={this.props.vegobjekttyper_chosen}
                    editable={true}
                    inputFunction={this.props.inputVegobjekttyper}
                    chooserFunction={this.props.chooseVegobjekttyper}
                    />
                  <View style={styles.parameterRightPadding}><Text></Text></View>
                </View>
                <View style={styles.parameterBottomPadding}><Text></Text></View>
              </View>

            </ScrollView>

          </View>
        </View>
        <View style={styles.parameterBottomPadding}><Text></Text></View>

        <View style={styles.buttonArea}>
          <Button text="Søk" onPress={this.search} style={"small"} />
        </View>
        <View style={templates.footer}>
          <Text style={{color: templates.colors.darkGray}}>Gruppe 16 NTNU</Text>
        </View>
      </View>
    },


    createVegInput() {
      return <View style={styles.inputContainer}>
        <TextInput
          autocorrect= {false}
          style={styles.textInput}
          placeholder={'Skriv inn veg. Type+nummer(R136)'}
          onChangeText={(text) => this.props.inputVeg({text})}
          keyboardType = "default"
          returnKeyType = 'done'
          />
      </View>
    },

    /*
    Need to handle case where vegtype er kommune, and vegobjekter er null
    */
    search() {
      if(this.props.fylke_chosen&&this.props.vegobjekttyper_chosen) {
        const objektID = this.props.vegobjekttyper_input[0].id;
        const fylkeID = this.props.fylke_input[0].nummer;
        const veg = this.props.veg_input.text;
        var preurl = baseURL+objektID+'/statistikk?fylke='+fylkeID+'&vegreferanse='+veg;
        var url = baseURL+objektID+'?fylke='+fylkeID+'&vegreferanse='+veg+'&inkluder=alle&srid=4326&antall=8000';

        fetchTotalNumberOfObjects(preurl).then(function(response) {
          if(response.antall == undefined) {
            Alert.alert("Ugyldig veg", "Sjekk at vegen du har skrevet inn eksisterer og at format er vegkategori+vegnummer (E6 f.eks)");
          }
          else {
            this.props.setURL(url);
            this.props.combineSearchParameters(this.props.fylke_input[0], this.props.veg_input, this.props.kommune_input[0], this.props.vegobjekttyper_input[0]);
            Actions.LoadingView();
          }
        }.bind(this));

      }
      else {
        Alert.alert("Ugyldig data", "Sjekk felter for korrekt input");
      }
    },

    //TODO

    //    !!!!!!!!!!!
    //reomved from render(){this.createNumerOfObjectsToBeFetcher()}
    //må også endres for å ta hensyn til vegtype
    //fungerer nå, men bør gjøre håndtering av manglende input bedre
    createNumerOfObjectsToBeFetcher(){
      if(this.props.fylke_chosen&&this.props.vegobjekttyper_chosen){
        const objektID = this.props.vegobjekttyper_input[0].id;
        const fylkeID = this.props.fylke_input[0].nummer;
        const veg = this.props.veg_input.text;
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
    searchTypeHeading: {
      flex: 2,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: templates.colors.white
    },
    hvaContents: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: templates.colors.white,
      minHeight:220,
      maxHeight:250,
    },
    hvaHeading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: templates.colors.white
    },
    vegobjekttypeArea: {
      flex: 4,
      flexDirection: 'row',
      backgroundColor: templates.colors.white
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
      padding: 11,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: templates.colors.white,
    },
    inputContainer: {
      flex: 4,
      backgroundColor: templates.colors.white

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
      borderColor: templates.colors.darkGray,
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
      fylke_navn: state.searchReducer.fylke_navn,
      fylke_text: state.searchReducer.fylke_text,
      fylke_chosen: state.searchReducer.fylke_chosen,

      //veg fields
      veg_input: state.searchReducer.veg_input,

      //kommune
      kommune_input: state.searchReducer.kommune_input,
      kommune_navn: state.searchReducer.kommune_navn,
      kommune_text: state.searchReducer.kommune_text,
      kommune_chosen: state.searchReducer.kommune_chosen,
      kommune_enabled: state.searchReducer.kommune_enabled,

      //vegobjekttyper fields
      vegobjekttyper_input: state.searchReducer.vegobjekttyper_input,
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

        inputVeg: bindActionCreators(searchActions.inputVeg, dispatch),

        inputKommune: bindActionCreators(searchActions.inputKommune, dispatch),
        chooseKommune: bindActionCreators(searchActions.chooseKommune, dispatch),

        inputVegobjekttyper: bindActionCreators(searchActions.inputVegobjekttyper, dispatch),
        chooseVegobjekttyper: bindActionCreators(searchActions.chooseVegobjekttyper, dispatch),

        setURL: bindActionCreators(searchActions.setURL, dispatch),
        combineSearchParameters: bindActionCreators(searchActions.combineSearchParameters, dispatch),
        setNumberOfObjectsToBeFetched: bindActionCreators(dataActions.setNumberOfObjectsToBeFetched, dispatch),

      }
    }

    export default connect(mapStateToProps, mapDispatchToProps) (SearchView);
