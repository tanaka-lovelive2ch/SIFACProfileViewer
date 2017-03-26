import { StackNavigator } from 'react-navigation'
import HomeScreen from './home-screen'
import AuthScreen from './auth-screen'
import CreateCardScreen from './create-card-screen'

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
    screen: AuthScreen
  },
  CreateCard: { screen: CreateCardScreen }
}, {
  initialRouteName: 'Auth'
})

export default RootNavigator
