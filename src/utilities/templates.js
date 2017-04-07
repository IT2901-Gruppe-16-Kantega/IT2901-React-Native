// file with template colors etc to be used across entire application
export var colors = {
  black: 'black',
  blue: '#008ec2',
  blueTransparent: 'rgba(0, 142, 194, 0.5)',
  orange: '#ed9300',
  green: '#58b02c',
  white: 'white',
  lightGray: '#ececec',
  middleGray: '#dadada',
  darkGray: '#444f55',
  red: 'red',
  orangeTransparent: 'rgba(237, 147, 0, 0.1)',
  placeholderColor: '#c4c4c4',
}

export var top = {
  flex: 0.7,
}

export var footer = {
  flex:0.7,
  justifyContent: 'center',
  alignItems: 'center',
}

export var sidebar = {
  position: 'absolute',
  top: 70,
  bottom: 0,

  borderTopWidth: 3,
  borderTopColor: colors.blue,
  borderLeftWidth: 3,
  borderLeftColor: colors.blue,
  borderTopLeftRadius: 10,

  backgroundColor: colors.white,
}
