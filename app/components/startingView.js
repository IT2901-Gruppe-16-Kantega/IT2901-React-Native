/*
    starting page of application
*/
//import react and react native shit
import React from 'react'

//importing to make redux work
import {connect} from 'react-redux'

//importing all actions
import * as simpleActions from '../actions/someSimpleActions'
simpleActions.doSomething()

//importing just one action
import {doSomethingWithInput} from '../actions/someSimpleActions'
doSomethingWithInput(input)

//only import actions that this component needs
import {fetchUser} from '../actions.userActions'

//this is used to injects props into startingView and renders, without needing to mess with the component
@connect((store) => {
  //whatever is returnes is set as props in startingView
  //these are the only parts of store that this component cares about
  //must call user two times because userReducer is called user when combined to one reducer in reducers/index.js
  //these props are automatically updated when the store is updated
  return {
    user: store.user.user,
    userFetched: store.user.fetched,
    tweets: store.tweets.tweets
  };
})
export default class startingView extends React.Component {
  componentWillMount() {
    //just dispactches an action no idea what happens
    this.props.dispatch(fetchUser())
  }
  render() {
    const {user, tweets} = this.props;
    //can now do something with user and tweets
    return <View>
      <Text>YOLO</Text>
    </View>
  }
}
