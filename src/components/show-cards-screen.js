import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { TouchableWithoutFeedback, Image, Dimensions, ScrollView, TouchableOpacity, View, Text } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import NavigationBarAndroid from '../navigation-bar-android'
import Theme from '../theme'
import DeleteModal from './delete-modal'
import * as CardActions from '../actions/cards'

class ShowCardsScreen extends Component {
  constructor(props) {
    super(props)

    const card = props.card
    this._initialIndex = card.index < card.list.size ? card.index : 0
    this.state = {
      modal: null,
      currentIndex: this._initialIndex
    }
  }

  componentDidMount() {
    NavigationBarAndroid.hide()
  }

  componentWillUnmount() {
    NavigationBarAndroid.show()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.card.list.size < 1) {
      nextProps.navigation.goBack()
    }
  }
  
  render() {
    const { card } = this.props
    if (card.list.size < 1) return (<View></View>)
    
    const index = card.index < card.list.size ? card.index : 0

    return (
      <View style={{flex: 1}}>
        <DeleteModal
           visible={this.state.modal === 'delete'}
           onOK={this.deleteCard.bind(this)}
           onCancel={this.hideModal.bind(this)}/>
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
      </View>
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
           onLongPress={this.showDeleteModal.bind(this)}
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

  onChangeTab(data) {
    const key = data.i
    this.setState({
      currentIndex: key
    })
  }
  
  deleteCard(deleteFile) {
    this.props.deleteCard(this.props.card.list.get(this.state.currentIndex), deleteFile).then(() => {
      this.hideModal()
    })
  }
  
  showDeleteModal() {
    this.setState({
      modal: 'delete'
    })
  }

  hideModal() {
    this.setState({
      modal: null
    })
  }
}

ShowCardsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired
}

ShowCardsScreen.navigationOptions = {
  header: (navigation) => {
    const state = navigation.state
    const navParams = state.params ? state.params : { showHeader: false }

    return {
      ...Theme.header,
      visible: navParams.showHeader ? navParams.showHeader : false,
      style: transparentHeaderStyle,
      title: '',
    }
  }
}

export default connect((state) => {
  return {
    card: state.card
  }
}, (dispatch) => {
  return {
    deleteCard: (card, deleteFile) => dispatch(CardActions.deleteCard(card, deleteFile))
  }
  
})(ShowCardsScreen)

const transparentHeaderStyle = {
  position: 'absolute',
  zIndex: 100,
  top: 0, right: 0, left: 0,
  backgroundColor: Theme.primary.rgba(0.5)
}
