import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, View, Text, AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'


class HomeScreen extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    
    
    return (
      <View style={{flex: 1, flexDirection: 'row'}}>

      </View>
    )
  }

  takePicture() {

  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

HomeScreen.navigationOptions = {
  title: 'Home'
}

export default connect()(HomeScreen)
