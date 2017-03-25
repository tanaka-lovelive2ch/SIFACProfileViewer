import { StackNavigator } from 'react-navigation'
import HomeScreen from './home-screen'

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen
  }
})

export default RootNavigator
