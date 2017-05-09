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

import {fetchFromAPI, fetchObjekttypeInfo} from '../../utilities/wrapper'
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
    fetchObjekttypeInfo(this.props.combinedSearchParameters.vegobjekttype.id, function(data) {
      this.props.setObjekttypeInfo(data);

      fetchFromAPI(this.props.fetchDataReturned, this.props.url);
    }.bind(this));

    this.props.fetchDataStart(this.props.url);
  }

  componentDidMount() {
    this.interval = setInterval(this.increment.bind(this), 1000);
  }

  increment() {
    console.log(this.props.fakeProgress)
    this.props.incrementFakeProgress();
  }

  //this may be really bad as componentDidUpdate may be called a lot of times
  componentDidUpdate() {
    if(this.props.fetched) {
      this.props.createSearchObject(
        '', // description
        this.props.objects,
        [], // roads
        [], // report
        this.props.combinedSearchParameters,
        this.props.objekttypeInfo
      );

      this.props.resetSearchParameters();
      this.props.resetFakeProgress();
      Actions.CurrentSearchView({type: 'reset'});
    }
  }

  render() {
    const {numberOfObjectsToBeFetched, numberOfObjectsFetchedSoFar} = this.props;
    const progress = numberOfObjectsFetchedSoFar / numberOfObjectsToBeFetched;

    return (
      <Container>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Progress.Circle
            size={ScreenWidth / 1.5}
            progress={progress}
            borderWidth={3}
            thickness={10}
            showsText={true}
            color={templates.colors.green} />
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={this.props.theme.title}>Informasjon om søket</Text>
            <PropertyValue property={"Antall objekter hentet"} value={this.props.numberOfObjectsFetchedSoFar + this.props.fakeProgress} />
            <PropertyValue property={"Antall objekter totalt"} value={this.props.numberOfObjectsToBeFetched} />
            <Button type="title" text="Avbryt" onPress={Actions.SearchView} />
          </View>
        </View>
      </Container>
    );
  }

  randomColor() {
    const colors = [templates.colors.orange, templates.colors.blue, templates.colors.green];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

function mapStateToProps(state) {
  return {
    theme: state.settingsReducer.themeStyle,

    url: state.searchReducer.url,

    //Fields used when creating URL
    kommune: state.searchReducer.kommuneInput,

    //Needed when creating roadSearch object
    objects: state.dataReducer.objects,
    combinedSearchParameters: state.searchReducer.combinedSearchParameters,

    //Status information about search
    fetching: state.dataReducer.fetching,
    fetched: state.dataReducer.fetched,
    numberOfObjectsToBeFetched: state.dataReducer.numberOfObjectsToBeFetched,
    numberOfObjectsFetchedSoFar: state.dataReducer.numberOfObjectsFetchedSoFar,

    objekttypeInfo: state.dataReducer.objekttypeInfo,
    allSearches: state.dataReducer.allSearches,
    selectedFilter: state.filterReducer.selectedFilter,

    fakeProgress: state.searchReducer.fakeProgress,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDataStart: bindActionCreators(dataActions.fetchDataStart, dispatch),
    fetchDataReturned: bindActionCreators(dataActions.fetchDataReturned, dispatch),
    createSearchObject: bindActionCreators(dataActions.createSearchObject, dispatch),
    setNumberOfObjectsToBeFetched: bindActionCreators(dataActions.setNumberOfObjectsToBeFetched, dispatch),
    resetSearchParameters: bindActionCreators(searchActions.resetSearchParameters, dispatch),
    setObjekttypeInfo: bindActionCreators(dataActions.setObjekttypeInfo, dispatch),
    resetFetching: bindActionCreators(dataActions.resetFetching, dispatch),

    resetFakeProgress: bindActionCreators(searchActions.resetFakeProgress, dispatch),
    incrementFakeProgress: bindActionCreators(searchActions.incrementFakeProgress, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (LoadingView);
