import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, ScrollView, TouchableOpacity, View, Text, AsyncStorage } from 'react-native'
import { DrawerNavigator, NavigationActions } from 'react-navigation'

class DrawerNavItem extends Component {
  render() {
    const { navigation, title, navigateOptions } = this.props
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(NavigationActions.navigate(navigateOptions)) 
        }}>
        <View style={{ padding: 30 }}>
          <Text>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

DrawerNavItem.propTypes = {
  navigation: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  navigateOptions: PropTypes.object.isRequired
}

class HomeDrawerComponent extends Component {
  render() {
    const navs = [
      {
        title: 'Settings',
        navigateOptions: { routeName: 'Settings' }
      },
    ]

    const { navigation } = this.props
    
    return (
      <View
        style={{
          borderWidth: 0, flex: 1, backgroundColor: '#aaa'
        }}>
        <ScrollView>
          <View style={{ backgroundColor: '#667722', padding: 50 }}>
            <Text>CustomDrawer</Text>
          </View>
          {navs.map((nav, i) => {
            return <DrawerNavItem
                       key={i}
                       navigation={navigation}
                       title={nav.title}
                       navigateOptions={nav.navigateOptions}/>
          })}
        </ScrollView>
      </View>
    )
  }
}

HomeDrawerComponent.propTypes = {
  navigation: PropTypes.object.isRequired
}

class HDCWrapper extends Component {
  render() {
    const { navigation } = this.props
    return (<HomeDrawerComponent navigation={ navigation }/>)
  }
}

HDCWrapper.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default HDCWrapper
