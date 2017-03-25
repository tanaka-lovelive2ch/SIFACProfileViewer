const db = require('sqlite')
const Data = require('../../resources/arcades')
const arcades = Data.DATA

Promise.resolve()
  .then(() => db.open('./resources/sifac-profile-viewer.db'))
  .then(() => db.run('drop table if exists arcades'))
  .then(() => db.run(
    'create table arcades ('
      + 'id text primary key,'
      + 'name text,'
      + 'area text,'
      + 'pref text,'
      + 'addr text,'
      + 'cnt text,'
      + 'zip text,'
      + 'event text,'
      + 'lng numeric,'
      + 'lat numeric'
      +')'))
  .then(() => {
    arcades.forEach((a) => {
      db.run(
        'insert into arcades '
          + '(id, name, area, pref, addr, cnt, zip, event, lng, lat)'
          + ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        , [
          a.ID, a.TNAME, a.AREA, a.PREF,
          a.ADDR, a.CNT, a.ZIP, a.EVENT,
          a.LNG, a.LAT
        ])
    })
  })
