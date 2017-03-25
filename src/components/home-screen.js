import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, Text, AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text>hoge</Text>
      </View>
    )
  }
}

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

HomeScreen.navigationOptions = {
  title: 'Home'
}

export default connect()(HomeScreen)
