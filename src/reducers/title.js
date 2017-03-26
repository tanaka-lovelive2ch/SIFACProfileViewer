import { Record, List } from 'immutable'
import * as TitleActions from '../actions/title'

const TitleStateBase = Record({
  list: List()
})

class TitleState extends TitleStateBase {
  get list() {
    return this.get('list')
  }

  setList(array) {
    return this.set('list', List(array))
  }
  
  set list(array) {
    return this.set('list', List(array))
  }
}

const initialState = new TitleState()

export default function(state = initialState, action) {
  switch(action.type) {
  case TitleActions.LOAD_TITLES:
    return state.setList(action.titles)
  }

  return state
}
