import {getTheme} from '../utilities/theme/theme';
import { Actions } from 'react-native-router-flux';

/*
Reducer for different app settings
*/

export default function reducer(state={
  clusteringOn: false,
  darkModeOn: false,
  themeStyle: getTheme('light'),

}, action) {
  switch (action.type) {
    case "SET_CLUSTERING": {
      return {...state, clusteringOn: action.payload}
    }
    case "SET_DARK_MODE": {
      var style;
      if(action.payload) { style = 'dark'; }
      else { style = 'light'; }

      return {...state, darkModeOn: action.payload, themeStyle: getTheme(style)}
    }
  }
  return state
}
