import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, ScrollView, TouchableOpacity, View, Text, AsyncStorage } from 'react-native'
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation'
import MyDrawer from './my-drawer'
import Theme from '../theme'
import ActionButton from 'react-native-action-button'

class CardsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cards: []
    }
  }

  render() {
    
    return (
      <View style={{flex: 1}}>
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={this.openCreateCard.bind(this)}/>
      </View>
    )
  }

  openCreateCard() {
    this.props.navigation.navigate('CreateCard')
  }
}

CardsScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

CardsScreen.navigationOptions = {
  title: 'Home'
}

const ConnectedCardsScreen = connect()(CardsScreen)

const HomeStack = StackNavigator({
  Cards: {
    screen: ConnectedCardsScreen,
    navigationOptions: {
      header: { ...Theme.header }
    }
  }
}, {
  initialRouteName: 'Cards'
})

const HomeScreen = DrawerNavigator({
  Home: { screen: HomeStack },
}, {
  initialRouteName: 'Home',
  contentComponent: MyDrawer
})

export default HomeScreen
