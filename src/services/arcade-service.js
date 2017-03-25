import DbService from './db-service'

function escape(str) {
  return str.replace(/%/g, '\\%').replace(/_/g, '\\_')
}

class ArcadeSerivce {
  isInitialized() {
    return DbService.isInitialized()
  }
  
  findByName(name = '') {
    if (!name) {
      name = ''
    }
    
    return DbService.execute(
      'select * from arcades where name like ? '
      + 'escape \'\\\'',
      ['%' + escape(name) + '%']
    ).then(([result]) => {
      const rows = result.rows.raw()
      return rows
    })
  }

  findByPref(prefName) {
    
  }

  findByGeolocation(location) {
    
  }
}

export default new ArcadeSerivce
