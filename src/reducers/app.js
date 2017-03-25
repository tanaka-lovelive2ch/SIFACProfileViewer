import * as AppActions from '../actions/app'
import { Record } from 'immutable'

const AppStateBase = Record({
  dbService: null,
  initializationError: null,
  initialized: false
})

class AppState extends AppStateBase {
  set dbService(service) {
    return this.set('dbService', service)
  }
  get dbService() {
    return this.get('dbService')
  }
  
  set initializationError(error) {
    return this.set('initializationError', error)
  }

  get initializationError() {
    return this.get('initializationError')
  }

  isInitialized() {
    return this.get('initialized')
  }

  set initialized(flag) {
    return this.set('initialized', flag)
  }
}

const initialState = new AppState()

export default function(state = initialState, action) {
  switch(action.type) {
  case AppActions.SET_DB:
    return state.dbService = action.dbService
  case AppActions.COMPLETE_INITIALIZATION:
    return state.initialized = true
  case AppActions.SHOW_INITIALIZATION_FAILURE:
    return state.initializationError = action.error    
  }

  return state
}
