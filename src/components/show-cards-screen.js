import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { TouchableWithoutFeedback, Image, Dimensions, ScrollView, TouchableOpacity, View, Text } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import NavigationBarAndroid from '../navigation-bar-android'
import Theme from '../theme'

class ShowCardsScreen extends Component {
  constructor(props) {
    super(props)

    const card = props.card
    this._initialIndex = card.index < card.list.size ? card.index : 0
    this._hideNativeButtons = () => {
      console.log('hide')
    }
    this._showNativeButtons = () => {
      console.log('show')
    }
  }

  componentDidMount() {
    NavigationBarAndroid.hide()
  }

  componentWillUnmount() {
    NavigationBarAndroid.show()
  }
  
  render() {
    const { card } = this.props
    if (card.list.size < 1) return (<View></View>)
    
    const index = card.index < card.list.size ? card.index : 0

    return (
      <TouchableWithoutFeedback
         style={{flex: 1}}
         onPress={this.toggleHeader.bind(this)}>
        <ScrollableTabView
           style={{flex: 1}}
           ref={this.setTabView.bind(this)}
           renderTabBar={this.renderTabBar}
           initialPage={this._initialIndex}>
          
          {this.renderCards()}
        </ScrollableTabView>
      </TouchableWithoutFeedback>
    )
  }

  renderTabBar() {
    return (<View></View>)
  }
  renderCards() {
    return this.props.card.list.map((card) => {
      const id = card.get('id')
      const imageUri = card.get('imageUri')
      
      return (
        <TouchableWithoutFeedback
           onPress={this.toggleHeader.bind(this)}
           key={id}
           style={{flex: 1, justifyContent: 'flex-end'}}
           tabLabel={id.toString()}>
          <Image style={{flex: 1}} source={{uri: imageUri}}/>
        </TouchableWithoutFeedback>
      )
    })
  }
  
  toggleHeader() {
    this.props.navigation.setParams({
      showHeader: !this.props.navigation.state.params.showHeader
    })
  }

  setTabView(ref) {
    this._tabView = ref
  }
}

ShowCardsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired
}

ShowCardsScreen.navigationOptions = {
  header: ({state}) => {
    const navParams = state.params ? state.params : { showHeader: false }
    
    return {
      ...Theme.header,
      visible: navParams.showHeader ? navParams.showHeader : false,
      style: transparentHeaderStyle,
      title: ''
    }
  }
}

export default connect((state) => {
  return {
    card: state.card
  }
})(ShowCardsScreen)

const transparentHeaderStyle = {
  position: 'absolute',
  zIndex: 100,
  top: 0, right: 0, left: 0,
  backgroundColor: Theme.primary.rgba(0.5)
}
