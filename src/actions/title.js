import TitleService from '../services/title-service'

export const LOAD_TITLES = 'LOAD_TITLES'
export function loadTitles() {
  return (dispatch) => {
    return TitleService.get().then((rows) => {
      return dispatch({
        type: LOAD_TITLES,
        titles: rows
      })
    })
  }
}
