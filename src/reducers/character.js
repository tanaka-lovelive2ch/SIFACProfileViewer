import * as AppActions from '../actions/app'
import { Record, List } from 'immutable'
import * as CharacterActions from '../actions/character'

const CharacterStateBase = Record({
  list: List()
})

class CharacterState extends CharacterStateBase {
  set list(array) {
    return this.set('list', List(array))
  }

  setList(array) {
    return this.set('list', List(array))
  }
  
  get list() {
    return this.get('list')
  }
}


const initialState = new CharacterState()
export default function(state = initialState, action) {
  switch(action.type) {
  case CharacterActions.LOAD_CHARACTERS:
    const newstate = state.setList(action.characters)
    console.log(newstate)
    return newstate
  }

  return state
}

