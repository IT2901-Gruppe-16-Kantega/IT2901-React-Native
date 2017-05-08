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

/*
view shown when fetching/loading data
*/
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
          <Progress.Circle
            size={ScreenWidth / 1.5}
            progress={this.props.progress}
            borderWidth={3}
            thickness={10}
            showsText={true}
            color={templates.colors.green} />
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={this.props.theme.title}>Informasjon om søket</Text>
            <PropertyValue property={"Info hentet"} value={this.props.objekttypeInfo ? "JA" : "NEI"} />
            <PropertyValue property={"Veger hentet"} value={this.props.roads.length + "/" + this.props.numberOfRoadsToBeFetched} />
            <PropertyValue property={"Objekter hentet"} value={this.props.objects.length + Math.round(this.props.fakeProgress) + "/" + this.props.numberOfObjectsToBeFetched} />
          </View>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    theme: state.settingsReducer.themeStyle,

    url: state.searchReducer.url,
    statisticsURL: state.searchReducer.statisticsURL,

    //Needed when creating roadSearch object
    objects: state.dataReducer.objects,
    roads: state.dataReducer.roads,

    combinedSearchParameters: state.searchReducer.combinedSearchParameters,

    //Status information about search
    numberOfObjectsToBeFetched: state.dataReducer.numberOfObjectsToBeFetched,

    numberOfRoadsToBeFetched: state.dataReducer.numberOfRoadsToBeFetched,

    objekttypeInfo: state.searchReducer.objekttypeInfo,

    fakeProgress: state.searchReducer.fakeProgress,
    progress: state.searchReducer.progress,
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
