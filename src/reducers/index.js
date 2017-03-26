import RootNavigator from '../components/root-navigator'
import AuthReducer from './auth'
import CardsReducer from './cards'
import CharacterReducer from './character'
import SkillReducer from './skill'
import TitleReducer from './title'

export const Reducers = {
  nav: (state, action) => {
    return RootNavigator.router.getStateForAction(action, state)
  },
  auth: AuthReducer,
  card: CardsReducer,
  character: CharacterReducer,
  skill: SkillReducer,
  title: TitleReducer
}
