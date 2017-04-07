import * as light from './light.js'
import * as dark from './dark.js';

export function getTheme(name) {
  const colors = name === 'light' ? light : dark;
  return {
    title: {
      fontWeight: 'bold',
      color: colors.primaryTextColor,
      fontSize: 20,
    },
    subtitle: {
      color: colors.primaryTextColor,
      fontSize: 17,
    },
    text: {
      color: colors.secondaryTextColor,
      fontSize: 15,
    },
    property: {
      fontSize: 15,
      fontWeight: 'bold',
      color: colors.primaryTextColor,
    },
    value: {
      fontSize: 15,
      color: colors.secondaryTextColor,
    },
    mainContainer: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      alignItems: 'stretch',
    },
    container: {
      backgroundColor: colors.containerColor,
    },
    navigationBarStyle: {
      backgroundColor: colors.navigationBackground,
      borderBottomWidth: 0,
    }
  }
}
