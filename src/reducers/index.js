import RootNavigator from '../components/root-navigator'
import AuthReducer from './auth'

export const Reducers = {
  nav: (state, action) => {
    return RootNavigator.router.getStateForAction(action, state)
  },
  auth: AuthReducer
}
