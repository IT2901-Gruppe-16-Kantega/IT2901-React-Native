import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Button from '../misc/Button';
import Container from '../misc/Container';

import * as templates from '../../utilities/templates';

export default class WelcomeView extends React.Component {
  render() {
    return (
      <Container>
        <View style={{ marginTop: -70, backgroundColor: templates.colors.blue, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.title}>Velkommen</Text>
          <Text style={styles.text}>VegAR er en fantastisk kul app som lar deg gjøre vedlikehold langs de norske vegene. Hurray!</Text>
          <Button text="Start" onPress={Actions.StartingView} type="title" />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    color: templates.colors.white,
    fontWeight: 'bold',
    fontSize: 40,
  },
  text: {
    color: templates.colors.white,
    fontSize: 20,
    fontWeight: '100',
    textAlign: 'center',
  }
})
