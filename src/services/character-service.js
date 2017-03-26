import DbService from '../services/db-service'

class CharacterService {
  isInitialized() {
    return DbService.isInitialized()
  }

  get() {
    return DbService.execute(
      'select * from characters order by id asc'
    ).then(([result]) => {
      return result.rows.raw()
    })
  }
}

const service = new CharacterService()
export default service
