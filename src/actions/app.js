import DbService from '../services/db-service'
import SQLite from 'react-native-sqlite-storage'
SQLite.DEBUG(true)
SQLite.enablePromise(true)

function openDB() {
  return SQLite.openDatabase({
    name: 'sifac-profile-viewer.db',
    createFromLocation: 1
  }).then((DB) => {
    DbService.initialize(DB)
    return DbService
  })
}


export const SHOW_INITIALIZATION_FAILURE = 'SHOW_INITIALIZATION_FAILURE'
export const SET_DB = 'SET_DB'
export const COMPLETE_INITIALIZATION = 'COMPLETE_INITIALIZATION'

export function initializeApp() {
  return (dispatch) => {
    openDB().then((service) => {
      dispatch({
        type: SET_DB,
        dbService: service
      })
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
