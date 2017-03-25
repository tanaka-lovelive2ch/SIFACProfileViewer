
const parse = require('csv-parse')
const fs = require('fs')
const db = require('sqlite')

fs.readFile('./resources/profile-titles.csv', 'utf-8', (err, data) => {
  if (err) throw err

  parse(data, (err, output) => {
    const titles = createTitles(err, output)
    updateDatabase(titles)
  })

})

function validTitle(title) {
  return title !== null && typeof(title) !== 'undefined' && title.match(/^[^　 ]+/)
}

function createTitles(err, output) {
  if (err) throw err

  let titles = []
  let nextId = 1
  output.forEach((row) => {
    if (row.length < 1 || !Number.isInteger(Number.parseInt(row[0]))) {
      return
    }

    if (row.length < 3) {
      return
    }
    
    const title = row[2]

    if (validTitle(title)) {
      let charName = null
      const dupTitles = [
        'お化粧好き', 'メイクアップアーティスト',
        'スタイリスト', 'コーディネーター',
        'パタンナー', 'ファッションデザイナー'
      ]
      if (dupTitles.findIndex((t) => t === title) >= 0) {
        const matchData = row[3].match(/^『(.+)』/)
        if (matchData) {
          charName = matchData[0]
        }
      }

      const finalTitle = charName ? title + '(' + charName + ')' : title
      console.log(finalTitle)
      titles.push({
        id: nextId,
        name: finalTitle
      })
    }
    nextId += 1
  })
  
  return titles
}

function updateDatabase(titles) {
  return Promise.resolve()
    .then(() => db.open('./resources/sifac-profile-viewer.db'))
    .then(() => {
      try {
        titles.forEach((t) => {
          db.run(
            'insert into profile_titles '
              + '(id, name) values (?,?)',
            [t.id, t.name]
          )
        })
      } catch (err) {
        console.log('err: ' + t.name)
      }
    })
}
