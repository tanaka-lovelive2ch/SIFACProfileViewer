import { StackNavigator } from 'react-navigation'
import HomeScreen from './home-screen'
import AuthScreen from './auth-screen'

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  Auth: {
    screen: AuthScreen
  }
}, {
  initialRouteName: 'Auth'
})

export default RootNavigator
