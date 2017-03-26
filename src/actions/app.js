import DbService from '../services/db-service'

import * as CharacterActions from './character'
import * as SkillActions from './skill'
import * as TitleActions from './title'

export const SHOW_INITIALIZATION_FAILURE = 'SHOW_INITIALIZATION_FAILURE'
export const SET_DB = 'SET_DB'
export const COMPLETE_INITIALIZATION = 'COMPLETE_INITIALIZATION'

export function initializeApp() {
  return (dispatch) => {
    new Promise((resolve, reject) => {
      resolve(DbService)
    }).then((service) => {
      dispatch({
        type: SET_DB,
        dbService: service
      })
    }).then(() => {
      return Promise.all([
        dispatch(CharacterActions.loadCharacters()),
        dispatch(SkillActions.loadSkills()),
        dispatch(TitleActions.loadTitles()),
      ])
    }).then(() => {
      dispatch({
        type: COMPLETE_INITIALIZATION
      })
    }).catch((error) => {
      dispatch({
        type: SHOW_INITIALIZATION_FAILURE,
        error
      })
    })
  }
}
