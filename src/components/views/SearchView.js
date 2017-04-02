import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ListView,
  ScrollView,
  TouchableWithoutFeedback,
  Animated,
  Modal,
  ActivityIndicator,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Button from '../misc/Button'
import InputField from '../misc/InputField'

import {searchForFylke, fetchVegerFromAPI} from '../../utilities/utils';
import {fetchTotalNumberOfObjects, fetchVeg, fetchCloseby} from '../../utilities/wrapper'
import {vegobjekttyper} from '../../data/vegobjekttyper';
import * as templates from '../../utilities/templates'
import * as dataActions from '../../actions/dataActions'
import * as searchActions from '../../actions/searchActions'

const minBaseURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/';
const preFetchURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/96/statistikk';
const baseURL = 'https://www.vegvesen.no/nvdb/api/v2/vegobjekter/';


var valid = true;
const vegobjekttyperMedPunkt = [];

/*
View used when user specifies what data to be fetched from NVDB
*/
var SearchView = React.createClass({
  render() {
    return <View style = {templates.container}>
      <View style={templates.top}/>
      <View style={styles.navigatorSpace}/>
      <View style={styles.header}>
        <Text style={{color: templates.colors.orange, padding: 10}}>NVDB-app</Text>
      </View>
      <View style={styles.inputArea}>
        <ScrollView
          style={{backgroundColor: templates.colors.white}}
          scrollEnabled={false}
          keyboardShouldPersistTaps='always'
          >
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 12}}>
            <Button text={"🗺 Kart"} style={"small"} onPress={Actions.RoadSelectView} />
            <Button text={"📍 Nærmeste"} style={"small"} onPress={this.getUserPosition} />
          </View>
          {this.createTypeInput()}
          {this.createFylkeInput()}
          {this.createKommuneInput()}
          {this.createVegInput()}
        </ScrollView>
      </View>
      {this.createStatistics()}
      {this.createButton()}
      <View style={styles.parameterBottomPadding}><Text></Text></View>
    </View>
  },

  getUserPosition() {
    navigator.geolocation.getCurrentPosition((initialPosition) => {
      fetchCloseby(initialPosition.coords, function(closest) {
        if(closest.code) {
          alert(closest.message);
        } else {
          const veg = closest.vegreferanse.kategori + closest.vegreferanse.nummer;

          this.props.inputVeg(veg);
          this.props.chooseFylke([closest.fylke]);
        }

      }.bind(this));
      }, (error) => alert(error.message), {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  },

  createFylkeInput(){
    return <View>
      <View style={styles.fylkeArea}>
        <View style={styles.searchLabel}><Text style={styles.text}>Fylke</Text></View>
        <InputField type='fylke'
          list={this.props.fylke_input}
          textType={this.props.fylke_text}
          choosenBool={this.props.fylke_chosen}
          editable={true}
          inputFunction={this.props.inputFylke}
          chooserFunction={this.props.chooseFylke}
          colorController={this.props.fylke_color}
          updateFunction={this.createDynamicData}
          />
        <View style={styles.parameterRightPadding}><Text></Text></View>
      </View>
      <View style={styles.parameterBottomPadding}><Text></Text></View>
    </View>
  },

  createKommuneInput(){
    if(this.props.kommune_enabled){
      return <View>
        <View style={styles.kommuneArea}>
          <View style={styles.searchLabel}><Text style={styles.text}>Kommune</Text></View>
          <InputField type='kommune'
            list={this.props.kommune_input}
            textType={this.props.kommune_text}
            choosenBool={this.props.kommune_chosen}
            editable={this.props.kommune_enabled}
            inputFunction={this.props.inputKommune}
            chooserFunction={this.props.chooseKommune}
            colorController={this.props.kommune_color}
            updateFunction={this.createDynamicData}
            extData={this.props.fylke_input}
            />
          <View style={styles.parameterRightPadding}><Text></Text></View>
        </View>
        <View style={styles.parameterBottomPadding}><Text></Text></View>
      </View>
    }
  },

  createTypeInput(){
    return <View>
      <View style={styles.typeArea}>
        <View style={styles.searchLabel}><Text style={styles.text}>Type</Text></View>
        <InputField type='vegobjekttype'
          list={this.props.vegobjekttyper_input}
          textType={this.props.vegobjekttyper_text}
          choosenBool={this.props.vegobjekttyper_chosen}
          editable={true}
          inputFunction={this.props.inputVegobjekttyper}
          chooserFunction={this.props.chooseVegobjekttyper}
          colorController={this.props.vegobjekttyper_color}
          updateFunction={this.createDynamicData}
          />
        <View style={styles.parameterRightPadding}><Text></Text></View>
      </View>
      <View style={styles.parameterBottomPadding}><Text></Text></View>
    </View>
  },

  createVegInput() {
    return  <View>
      <View style={styles.vegArea}>
          <View style={styles.searchLabel}><Text style={styles.text}>Veg</Text></View>
            <View style={{
              flex: 4,
              backgroundColor: templates.colors.white,
              borderBottomWidth: 2,
              borderBottomColor: this.props.veg_color,
              }}>
              <TextInput
                autocorrect= {false}
                style={{
                  padding: 5,
                  height: 40,
                  color: templates.colors.darkGray,
                  backgroundColor:templates.colors.lightGray
                }}
                placeholderColor={templates.colors.placeholderColor}
                placeholder={'Skriv inn veg'}
                onChangeText={(text) => {
                  this.props.inputVeg(text);
                }}
                onBlur={this.createDynamicData}
                keyboardType = "default"
                returnKeyType = 'done'
                value={this.props.veg_input}
                />
            </View>
          <View style={styles.parameterRightPadding}><Text></Text></View>
        </View>
        <View style={styles.parameterBottomPadding}><Text></Text></View>
    </View>
  },

  createStatistics(){
    return <View style={styles.statisticsArea}>
      <Text style={styles.text}>Antall objekter som blir hentet: {this.props.numberOfObjectsToBeFetched}</Text>
    </View>
  },

  createButton(){
    return <View style={styles.buttonArea}>
      <Button text="Søk" onPress={this.searchOld} style={"small"} />
    </View>
  },

  //createDynamic fields and validity info
  createDynamicData() {
    if(this.props.fylke_chosen&&this.props.vegobjekttyper_chosen){
      const objektID = this.props.vegobjekttyper_input[0].id;
      const fylkeID = this.props.fylke_input[0].nummer;
      const veg = this.props.veg_input;
      var vegURL= ''
      var numberURL=''
      if(this.props.kommune_chosen){
        const kommuneID = this.props.kommune_input[0].nummer;
        var vegURL = minBaseURL+'532/statistikk?fylke='+fylkeID+'&kommune='+kommuneID+'&vegreferanse='+veg
        var numberURL = baseURL+objektID+'/statistikk?fylke='+fylkeID+'&kommune='+kommuneID+'&vegreferanse='+veg;
      }
      else {
        var vegURL = minBaseURL+'532/statistikk?fylke='+fylkeID+'&vegreferanse='+veg
        var numberURL = baseURL+objektID+'/statistikk?fylke='+fylkeID+'&vegreferanse='+veg;
      }
      fetchVeg(vegURL).then((response)=>{
        console.log(response);
        if(response.antall == 0){
          this.props.setValidityOfVeg(false)
        }
        else if(response.antall>0){
          this.props.setValidityOfVeg(true)
        }
        else{
          this.props.setValidityOfVeg(false)
        }
      })
      fetchTotalNumberOfObjects(numberURL).then((response)=>{
        this.props.setNumberOfObjectsToBeFetched(response.antall);
      });
    }
    else if (this.props.vegobjekttyper_chosen&&!this.props.fylke_chosen){
      const objektID = this.props.vegobjekttyper_input[0].id;
      var numberURL = baseURL+objektID+'/statistikk';
      fetchTotalNumberOfObjects(numberURL).then((response)=>{

        this.props.setNumberOfObjectsToBeFetched(response.antall);
      });
    }
  },
  //this function need to be optimized
  //can now handle validity of search much better:
  //search yes if all is valid

  //TODO sjekk TODO i metode

    //fiks en bedre metode slik at ting blir oppdatert i veg obj
    //evt legg til en loading overlay, checking...
  search(){
    setTimeout(()=>{
      if(this.props.numberOfObjectsToBeFetched==0){
        Alert.alert("Feil", "Dette søket generer ingen objekter");
      }
      else if (!this.props.vegobjekttyper_chosen){
        Alert.alert("Feil", "Ingen vegobjekttyper spesifisert")
      }
      else if (!this.props.fylke_chosen){
        Alert.alert("Feil", "Fylke ikke spesifisert");
        //TODO kan gi bruker en mulighet til å hente data, men med advarsel om at det tar lang tid!
      }
      else if(!this.props.veg_valid){
        Alert.alert("Feil", "Ingen veg spesifisert")
        //TODO gi bruker mulighet til å gå videre allikevel
      }
      else{
        var vegType = this.props.veg_input.substring(0,1).toLowerCase();
        if(vegType=='k'){
          if(this.kommune_chosen){
            this.props.combineSearchParameters(this.props.fylke_input[0], this.props.veg_input, this.props.kommune_input[0], this.props.vegobjekttyper_input[0]);
            Actions.LoadingView();
          }
          else{
            Alert.alert("Feil", "Kommune må spesifiseres når vegtype er kommunalveg")
          }
        }
        else{
          this.props.combineSearchParameters(this.props.fylke_input[0], this.props.veg_input, this.props.kommune_input[0], this.props.vegobjekttyper_input[0]);
          Actions.LoadingView();
        }
      }
    }, 1000)
  },

  searchOld() {
    if(this.props.fylke_chosen&&this.props.vegobjekttyper_chosen) {
      const objektID = this.props.vegobjekttyper_input[0].id;
      const fylkeID = this.props.fylke_input[0].nummer;
      const veg = this.props.veg_input;
      var vegType = veg.substring(0,1).toLowerCase();
      if(vegType=='k'){
        console.log('kommune mandatory')
        if(this.props.kommune_chosen){
          const kommuneID = this.props.kommune_input[0].nummer;
          var preurl = baseURL+objektID+'/statistikk?fylke='+fylkeID+'&kommune='+kommuneID+'&vegreferanse='+veg;
          var url = baseURL+objektID+'?fylke='+fylkeID+'&kommune='+kommuneID+'&vegreferanse='+veg+'&inkluder=alle&srid=4326&antall=8000';

          fetchTotalNumberOfObjects(preurl).then(function(response) {
            if(response.antall == undefined) {
              Alert.alert("Ugyldig veg", "Sjekk at vegen du har skrevet inn eksisterer og at format er vegkategori+vegnummer (E6 f.eks)");
            }
            else {
              this.props.setURL(url);
              if(this.props.kommune_chosen==true){
                this.props.combineSearchParameters(this.props.fylke_input[0], this.props.veg_input, this.props.kommune_input[0], this.props.vegobjekttyper_input[0]);
              }
              else{
                this.props.combineSearchParameters(this.props.fylke_input[0], this.props.veg_input,'Kommune ikke valgt', this.props.vegobjekttyper_input[0]);
              }
              Actions.LoadingView();
            }
          }.bind(this));
        }
        else{
          Alert.alert("Mangler kommune", "Kommune må fylles ut når veg er av type k");
        }
      }

      else{
        console.log('komune not mandatory')
        if(this.props.kommune_chosen){
          const kommuneID = this.props.kommune_input[0].nummer;
          var preurl = baseURL+objektID+'/statistikk?fylke='+fylkeID+'&kommune='+kommuneID+'&vegreferanse='+veg;
          var url = baseURL+objektID+'?fylke='+fylkeID+'&kommune='+kommuneID+'&vegreferanse='+veg+'&inkluder=alle&srid=4326&antall=8000';
        }
        else{
          var preurl = baseURL+objektID+'/statistikk?fylke='+fylkeID+'&vegreferanse='+veg;
          var url = baseURL+objektID+'?fylke='+fylkeID+'&vegreferanse='+veg+'&inkluder=alle&srid=4326&antall=8000';
        }

        fetchTotalNumberOfObjects(preurl).then(function(response) {
          if(response.antall == undefined) {
            Alert.alert("Ugyldig veg", "Sjekk at vegen du har skrevet inn eksisterer og at format er vegkategori+vegnummer (E6 f.eks)");
          }
          else {
            this.props.setURL(url);
            if(this.props.kommune_chosen==true){
              this.props.combineSearchParameters(this.props.fylke_input[0], this.props.veg_input, this.props.kommune_input[0], this.props.vegobjekttyper_input[0]);
            }
            else{
              this.props.combineSearchParameters(this.props.fylke_input[0], this.props.veg_input,'Kommune ikke valgt', this.props.vegobjekttyper_input[0]);
            }
            Actions.LoadingView();
          }
        }.bind(this));
      }
    }
    else {
      Alert.alert("Ikke nok informasjon", "Fyll inn obligatoriske felter");
    }
  },
});

var styles = StyleSheet.create({

  //Top-leve containers

  navigatorSpace: {
    flex:1.3,
    backgroundColor: templates.colors.white,
  },
  header: {
    flex: 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.white
  },
  inputArea: {
    flex: 13.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },


  //Big components
  kommuneArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.white,
    minHeight:0,
    maxHeight:130,
  },
  fylkeArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  typeArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: templates.colors.white,
    minHeight:0,
    maxHeight:162,
  },
  vegobjekttypeArea2: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: templates.colors.white
  },
  vegArea: {
    flex: 1,
    flexDirection: 'row',
  },
  statisticsArea: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: templates.colors.white,
  },
  buttonArea: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: templates.colors.white
  },
  //small components
  searchLabel: {
    flex: 1,
    padding: 11,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: templates.colors.white,
  },
  parameterBottomPadding: {
    flex: 0.5,
    backgroundColor: templates.colors.white,
  },
  parameterRightPadding: {
    flex: 0.25
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
    fylke_color: state.searchReducer.fylke_color,

    //veg fields
    veg_input: state.searchReducer.veg_input,
    veg_color: state.searchReducer.veg_color,
    veg_valid: state.searchReducer.veg_valid,

    //kommune
    kommune_input: state.searchReducer.kommune_input,
    kommune_navn: state.searchReducer.kommune_navn,
    kommune_text: state.searchReducer.kommune_text,
    kommune_chosen: state.searchReducer.kommune_chosen,
    kommune_enabled: state.searchReducer.kommune_enabled,
    kommune_color: state.searchReducer.kommune_color,

    //vegobjekttyper fields
    vegobjekttyper_input: state.searchReducer.vegobjekttyper_input,
    vegobjekttyper_navn: state.searchReducer.vegobjekttyper_navn,
    vegobjekttyper_text: state.searchReducer.vegobjekttyper_text,
    vegobjekttyper_chosen: state.searchReducer.vegobjekttyper_chosen,
    vegobjekttyper_color: state.searchReducer.vegobjekttyper_color,

    combinedSearchParameters: state.searchReducer.combinedSearchParameters,
    numberOfObjectsToBeFetched: state.dataReducer.numberOfObjectsToBeFetched,
  };}

  function mapDispatchToProps(dispatch) {
    return {
      //input search variables, uses searchActions to set variables before creatingURL
      inputFylke: bindActionCreators(searchActions.inputFylke, dispatch),
      chooseFylke: bindActionCreators(searchActions.chooseFylke, dispatch),

      inputVeg: bindActionCreators(searchActions.inputVeg, dispatch),
      setValidityOfVeg: bindActionCreators(searchActions.setValidityOfVeg, dispatch),

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
