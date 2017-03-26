import { Record, List } from 'immutable'
import * as CardsActions from '../actions/cards'

const CardsStateBase = Record({
  list: List(),
  index: null
})

class CardsState extends CardsStateBase {
  set list(array) {
    if (Array.isArray(array)) {
      return this.set('list', List(array))
        .set('index', array.length > 0 ? 0 : null)
    } else {
      return this.set('list', List())
        .set('index', null)
    }
  }

  get list() {
    return this.get('list')
  }

  set index(idx) {
    const currentSize = this.get('list').size
    if (Number.isInteger(idx) && idx >= 0 && idx < currentSize) {
      return this.set('index', idx)
    }

    return this
  }

  get index() {
    return this.get('index')
  }
}

const initialState = new CardsState()

export default function(state = initialState, action) {
  switch(action.type) {
  case CardsActions.UPDATE_CARDS:
    return state.list = action.cards
  case CardsActions.SELECT_CARD:
    return state.index = action.index
  }

  return state
}
