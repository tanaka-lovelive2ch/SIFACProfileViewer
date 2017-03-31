import { Record, List } from 'immutable'
import * as CardsActions from '../actions/cards'
import { NavigationActions } from 'react-navigation'

const CardsStateBase = Record({
  list: List(),
  index: null,
  refreshing: false
})

class CardsState extends CardsStateBase {
  delete(id) {
    const removed = this.set('list', this.get('list').filter((card) => card.id !== id))
    if (this.get('index') >= this.get('list').size) {
      return removed.set('index', this.get('list').size - 1)
    }

    return removed
  }
  
  setList(array) {
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

  setIndex(idx) {
    const currentSize = this.get('list').size
    if (Number.isInteger(idx) && idx >= 0 && idx < currentSize) {
      return this.set('index', idx)
    }

    return this
  }

  get index() {
    return this.get('index')
  }

  setRefreshing(flag) {
    return this.set('refreshing', flag)
  }

  get refreshing() {
    return this.get('refreshing')
  }
}

const initialState = new CardsState()

export default function(state = initialState, action) {
  switch(action.type) {
  case NavigationActions.NAVIGATE:
    if (action.routeName === 'ShowCards' && action.params && action.params.initialCard) {
      const index = state.list.findIndex((c) => c.get('id') === action.params.initialCard.get('id'))
      return state.setIndex(index >= 0 ? index : null)
    }
    break
  case CardsActions.UPDATE_CARDS:
    return state.setList(action.cards)
  case CardsActions.SELECT_CARD:
    return state.setIndex(action.index)
  case CardsActions.START_REFRESHING:
    return state.setRefreshing(true)
  case CardsActions.FINISH_REFRESHING:
    return state.setRefreshing(false)
  case CardsActions.DELETE_CARD:
    return state.delete(action.card.id)
  }

  return state
}
