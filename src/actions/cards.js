import CardService from '../services/card-service'

export const UPDATE_CARDS = 'UPDATE_CARDS'
export function search(query = new CardService.Query()) {
  return (dispatch) => {
    
    return CardService.search(query).then((rows) => {
      return dispatch({
        type: UPDATE_CARDS,
        cards: rows
      })
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
