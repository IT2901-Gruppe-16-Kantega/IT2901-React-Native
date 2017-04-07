import * as light from './light.js'
import * as dark from './dark.js';

export function getTheme(name) {
  const colors = name === 'light' ? light : dark;
  return {
    title: {

    },
    subtitle: {

    },
    container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      alignItems: 'stretch',
    }
  }
}
