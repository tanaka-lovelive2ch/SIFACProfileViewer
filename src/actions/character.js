import CharacterService from '../services/character-service'

export const LOAD_CHARACTERS = 'LOAD_CHARACTERS'
export function loadCharacters() {
  return (dispatch) => {
    return CharacterService.get().then((rows) => {
      return dispatch({
        type: LOAD_CHARACTERS,
        characters: rows
      })
    })
  }
}
