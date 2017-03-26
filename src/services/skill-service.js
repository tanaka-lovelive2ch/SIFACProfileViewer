import DbService from '../services/db-service'

class SkillService {
  isInitialized() {
    return DbService.isInitialized()
  }

  get() {
    return DbService.execute(
      'select * from skills order by id asc'
    ).then(([result]) => {
      return result.rows.raw()
    })
  }
}

const service = new SkillService()
export default service
