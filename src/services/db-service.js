class DbService {
  constructor() {
    this.db = null
  }

  isInitialized() {
    return !!this.db
  }

  initialize(db) {
    this.db = db
  }

  /**
   * 返されるPromiseはtransactionに対してのものなので、
   * callbackがPromiseを返してもthenには渡らない
   */
  transaction(callback) {
    return this.db.transaction((tx) => {
      callback(tx)
    })
  }

  execute(sql, params = []) {
    return this.db.executeSql(sql, params)
  }
}

export default new DbService()
