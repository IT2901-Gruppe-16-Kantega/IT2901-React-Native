import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './src/index';
import {store} from './src/store';

class VegAR extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
};

AppRegistry.registerComponent('VegAR', () => VegAR);
