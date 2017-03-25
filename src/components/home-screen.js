import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

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
