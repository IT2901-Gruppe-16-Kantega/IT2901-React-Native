import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  NativeEventEmitter
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as Progress from 'react-native-progress';

import Button from '../misc/Button'
import Container from '../misc/Container'

import * as templates from '../../utilities/templates'

/*
starting page of application
*/
class StartingView extends React.Component {
  render() {
    return <Container>
      {this.renderLoadingView()}
      <View style={styles.contents}>
        <Button type={"title"} text={"Nytt søk"} onPress={Actions.SearchView} />
        <Button type={"title"} text={"Lagrede søk"} onPress={Actions.StoredDataView} />
        <Button type={"title"} text={"Innstillinger"} onPress={Actions.SettingsView} />
      </View>
    </Container>
  }

  renderLoadingView() {
    const {loadingProgress, deeplink} = this.props;

    if(loadingProgress < 1) {
      return <View style={styles.loadingProgress}>
        <View style={styles.part}>
          <Progress.Circle
            progress={loadingProgress}
            color={templates.colors.orange}
            showsText={true}
            thickness={10}
            size={200} />
        </View>
        <View style={[styles.part, styles.bottomPart]}>
          <Text style={this.props.theme.subtitle}>Laster inn lagrede søk. Vennligst vent...</Text>
          {deeplink.length > 0 && <Text>Går deretter til {deeplink}</Text>}
        </View>
      </View>
    }
    else return <View/>
  }
}

var styles = StyleSheet.create({
  loadingProgress: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.85)',
    zIndex: 10,
  },
  part: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomPart: {
    justifyContent: 'flex-start',
  },
  contents: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

/* REDUX STUFF
The return of mapStateToProps is what this comoponent may see from the store
these are set as props and automatically updated when store is changed
The return of mapDispatchToProps is which actions this component has access to
*/
function mapStateToProps(state) {
  return {
    loadingProgress: state.dataReducer.loadingProgress,
    fetching: state.dataReducer.fetching,
    theme: state.settingsReducer.themeStyle,
    deeplink: state.uiReducer.deeplink,
  }
}

export default connect(mapStateToProps, null) (StartingView);
