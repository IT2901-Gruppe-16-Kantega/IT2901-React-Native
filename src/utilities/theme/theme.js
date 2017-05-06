import * as light from './light.js'
import * as dark from './dark.js';
import * as fun from './fun.js';
import * as templates from '../templates';

export function getTheme(name) {
  const themeColors = name === 'light' ? light : dark;
  return {
    color: themeColors.color,
    primaryTextColor: themeColors.primaryTextColor,
    secondaryTextColor: themeColors.secondaryTextColor,
    placeholderTextColor: themeColors.placeholderTextColor,
    title: {
      fontWeight: 'bold',
      color: themeColors.primaryTextColor,
      fontSize: 20,
    },
    subtitle: {
      color: themeColors.primaryTextColor,
      fontSize: 17,
    },
    text: {
      color: themeColors.secondaryTextColor,
      fontSize: 15,
    },
    property: {
      fontSize: 15,
      fontWeight: 'bold',
      color: themeColors.primaryTextColor,
    },
    value: {
      fontSize: 15,
      color: themeColors.secondaryTextColor,
    },
    mainContainer: {
      flex: 1,
      backgroundColor: themeColors.backgroundColor,
      //alignItems: 'stretch',
    },
    container: {
      backgroundColor: themeColors.containerColor,
    },
    navigationBarStyle: {
      backgroundColor: themeColors.navigationBackground,
      borderBottomWidth: 0,
    },
    tabChosen: {
      backgroundColor: 'rgba(255,255,255,0)',
      fontWeight: 'bold',
      textColor: themeColors.tabChosen.textColor,
      borderTopWidth: 0,
    },
    tabNotChosen: {
      backgroundColor: templates.colors.orange,
      fontWeight: 'normal',
      textColor: templates.colors.white,
      borderTopWidth: 1,
    },
  }
}
