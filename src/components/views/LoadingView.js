/**
* Main view component showing information about the progress of the current fetch for NVDB
* Componentet is also responsible for calling the functions that package and store the received data
*/

import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Progress from 'react-native-progress';

import Button from '../misc/Button'
import Container from '../misc/Container'
import PropertyValue from '../misc/PropertyValue'

import {fetchFromAPI, fetchObjekttypeInfo, startSearch} from '../../utilities/wrapper'
import * as templates from '../../utilities/templates'

import * as dataActions from '../../actions/dataActions'
import * as mapActions from '../../actions/mapActions'
import * as searchActions from '../../actions/searchActions'

const ScreenWidth = Dimensions.get("window").width;

class LoadingView extends React.Component {
  componentWillMount() {
    this.props.fetchDataStart();
    const id = this.props.combinedSearchParameters.vegobjekttype.id;
    startSearch(id, this.props.url, this.props.statisticsURL, callback => {
      if(callback.number) this.props.setNumberOfObjectsToBeFetched(callback.number);
      if(callback.info) this.props.setObjekttypeInfo(callback.info);
      if(callback.roads) this.props.roadsReturned(callback.roads);
      if(callback.objects) this.props.objectsReturned(callback.objects);
      if(callback.roadNumber) this.props.setNumberOfRoadsToBeFetched(callback.roadNumber);
    })
  }
  render() {
    return (
      <Container>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {this.renderProgress()}
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={this.props.theme.title}>Informasjon om søket</Text>
            <PropertyValue property={"Info hentet"} value={this.props.objekttypeInfo ? "JA" : "NEI"} />
            <PropertyValue property={"Veger hentet"} value={this.props.roads.length + "/" + this.props.numberOfRoadsToBeFetched} />
            <PropertyValue property={"Objekter hentet"} value={Math.min(this.props.numberOfObjectsToBeFetched, (this.props.objects.length + Math.round(this.props.fakeProgress))) + "/" + this.props.numberOfObjectsToBeFetched} />
          </View>
        </View>
      </Container>
    );
  }
  renderProgress() {
    if(this.props.progress >= 1) {
      return (
        <Progress.CircleSnail
          size={ScreenWidth / 1.5}
          thickness={10}
          color={[templates.colors.orange, templates.colors.blue, templates.colors.green]} />
      );
    }
    else {
      return (
        <Progress.Circle
          size={ScreenWidth / 1.5}
          progress={this.props.progress}
          borderWidth={3}
          thickness={10}
          showsText={true}
          color={templates.colors.green} />
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    numberOfObjectsToBeFetched: state.dataReducer.numberOfObjectsToBeFetched,
    numberOfRoadsToBeFetched: state.dataReducer.numberOfRoadsToBeFetched,
    objects: state.dataReducer.objects,
    roads: state.dataReducer.roads,

    combinedSearchParameters: state.searchReducer.combinedSearchParameters,
    fakeProgress: state.searchReducer.fakeProgress,
    objekttypeInfo: state.searchReducer.objekttypeInfo,
    progress: state.searchReducer.progress,
    statisticsURL: state.searchReducer.statisticsURL,
    url: state.searchReducer.url,

    theme: state.settingsReducer.themeStyle,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDataStart: bindActionCreators(dataActions.fetchDataStart, dispatch),
    setNumberOfObjectsToBeFetched: bindActionCreators(dataActions.setNumberOfObjectsToBeFetched, dispatch),
    setNumberOfRoadsToBeFetched: bindActionCreators(dataActions.setNumberOfRoadsToBeFetched, dispatch),

    setObjekttypeInfo: bindActionCreators(searchActions.setObjekttypeInfo, dispatch),

    objectsReturned: bindActionCreators(dataActions.objectsReturned, dispatch),
    roadsReturned: bindActionCreators(dataActions.roadsReturned, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (LoadingView);
