import { Record } from 'immutable'

const authStateBase = Record({
  user: null
})

export class AuthState extends authStateBase {
  set currentUser(user) {
    return this.set('user', user)
  }
  
  get currentUser() {
    return this.get('user')
  }

  isloggedIn() {
    return !!this.currentUser
  }
}

const initialState = new AuthState()

function AuthReducer(state = initialState, action) {
  switch(action.type) {
    
  }

  return state
}

export default AuthReducer
