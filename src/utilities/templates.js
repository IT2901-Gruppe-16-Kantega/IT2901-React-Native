// file with template colors etc to be used across entire application
export var colors = {
  blue: '#008ec2',
  orange: '#ed9300',
  green: '#58b02c',
  white: 'white',
  lightGray: '#ececec',
  middleGray: '#dadada',
  darkGray: '#444f55'
}
export var container = {
  flex: 1,
  alignItems: 'stretch',
}
export var top = {
  flex: 0.7,
}
export var footer = {
  flex:0.7,
  justifyContent: 'center',
  alignItems: 'center',
}

export var button = {
  borderWidth: 2,
  height: 50,
  width: 150,
  padding: 2,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: colors.orange,
}
export var smallButton = {
  borderWidth: 2,
  height: 30,
  width: 100,
  padding: 2,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: 'aliceblue',
}
export var sidebar = {
  position: 'absolute',
  top: 70,
  bottom: 0,

  borderTopWidth: 3,
  borderTopColor: colors.orange,
  borderLeftWidth: 3,
  borderLeftColor: colors.orange,
  borderTopLeftRadius: 10,

  backgroundColor: colors.darkGray,
}
