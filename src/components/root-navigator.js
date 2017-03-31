import { StackNavigator } from 'react-navigation'
import HomeScreen from './home-screen'
import AuthScreen from './auth-screen'
import CreateCardScreen from './create-card-screen'
import ShowCardsScreen from './show-cards-screen'
import ChangeQueryScreen from './change-query-screen'

import Theme from '../theme'
import { enhance } from 'react-navigation-addons'


const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: {
        visible: false
      }
    }
  },
  Auth: {
    screen: AuthScreen,
    navigationOptions: {
      header: { ...Theme.header }
    }
  },
  CreateCard: {
    screen: CreateCardScreen,
  },
  ShowCards: {
    screen: ShowCardsScreen
  },
  ChangeQuery: {
    screen: ChangeQueryScreen
  }
}, {
  initialRouteName: 'Auth'
})

export default RootNavigator
