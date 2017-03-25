import RootNavigator from '../components/root-navigator'

export const Reducers = {
  nav: (state, action) => {
    return RootNavigator.router.getStateForAction(action, state)
  }
}
