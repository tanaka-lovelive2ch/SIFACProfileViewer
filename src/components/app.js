import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux'
import store from '../store'
import RootNavigatorContainer from './root-navigator-container'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigatorContainer/>
      </Provider>
    )
  }
}

export default App
