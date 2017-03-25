import React, { Component, PropTypes } from 'react'
import { NavigationActions, addNavigationHelpers } from 'react-navigation'
import { View, StyleSheet, BackAndroid } from 'react-native'
import { connect } from 'react-redux'
import RootNavigator from './root-navigator'

class RootNavigatorContainer extends Component {
  getCurrentRoute(nav) {
    if (typeof(nav.index) !== 'undefined') {
      return this.getCurrentRoute(nav.routes[nav.index])
    }

    return nav
  }

  componentWillMount() {
    // initialize state
    const { dispatch } = this.props

  }
  
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const { dispatch, nav } = this.props
      const { routeName } = this.getCurrentRoute(nav)
      if (routeName !== 'Home') {
        dispatch(NavigationActions.back())
        return true
      }

      return false
    })
  }

  componentWillUnmount() {
    const { dispatch } = this.props

    BackAndroid.removeEventListener('hardwareBackPress')
  }

  render () {
    const { dispatch, nav } = this.props
    return (
      <View style={style.container}>
        <RootNavigator navigation={addNavigationHelpers({ dispatch, state: nav })}/>
      </View>
    )
  }
}

RootNavigatorContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
}

const style = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default connect((state) => {
  return {
    nav: state.nav
  }
})(RootNavigatorContainer)

