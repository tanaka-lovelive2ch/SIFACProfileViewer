import CardService from '../services/card-service'

export const START_REFRESHING = 'START_REFRESHING'
export const FINISH_REFRESHING = 'FINISH_REFRESHING'
export function startRefreshing() {
  return {
    type: START_REFRESHING
  }
}

export function finishRefreshing() {
  return {
    type: FINISH_REFRESHING
  }
}

export const UPDATE_CARDS = 'UPDATE_CARDS'
export function search(query = new CardService.Query()) {
  return (dispatch) => {
    dispatch(startRefreshing())
    
    return CardService.search(query).then((rows) => {
      const result = dispatch({
        type: UPDATE_CARDS,
        cards: rows
      })

      dispatch(finishRefreshing())
      return result
    })
  }
}

export const SELECT_CARD = 'SELECT_CARD'
export function selectCard(index) {
  return {
    type: SELECT_CARD,
    index
  }
}

export const CREATE_CARD = 'CREATE_CARD'
export function createCard(params) {
  return (dispatch) => {
    return CardService.create(params).then((insertId) => {
      return dispatch({
        type: CREATE_CARD,
        insertId
      })
    })
  }
}
