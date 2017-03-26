import { AppRegistry } from 'react-native'
import App from './src/components/app'

import DbService from './src/services/db-service'
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

openDB().then(() => {
  AppRegistry.registerComponent('SIFACProfileViewer', () => App)
})

