import DbService from '../services/db-service'

class TitleService {
  isInitialized() {
    return DbService.isInitialized()
  }

  get() {
    return DbService.execute(
      'select * from profile_titles order by id asc'
    ).then(([result]) => {
      return result.rows.raw()
    })
  }
}

const service = new TitleService()
export default service
