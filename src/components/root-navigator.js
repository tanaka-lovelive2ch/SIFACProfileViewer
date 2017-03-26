import { StackNavigator } from 'react-navigation'
import HomeScreen from './home-screen'
import AuthScreen from './auth-screen'
import CreateCardScreen from './create-card-screen'
import Theme from '../theme'

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
  }
}, {
  initialRouteName: 'Auth'
})

export default RootNavigator
