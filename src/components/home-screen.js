import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Image, Dimensions, RefreshControl, Button, ScrollView, TouchableOpacity, View, Text, AsyncStorage } from 'react-native'
import { StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation'
import MyDrawer from './my-drawer'
import Theme from '../theme'
import ActionButton from 'react-native-action-button'
import * as CardsActions from '../actions/cards'
import { CardQuery } from '../services/card-service'

class CardsScreen extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      cards: [],
      query: new CardQuery
    }
  }

  componentWillMount() {
    this.props.searchCards(this.state.query)
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}
          refreshControl={this.refreshControl()}>
          {this.renderCards()}
        </ScrollView>
        
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={this.openCreateCard.bind(this)}/>
      </View>
    )
  }

  renderCards() {
    const cards = this.props.card.list.toArray()
    let pairs = []

    const dim = Dimensions.get('window')
    
    for (let i = 0; i < cards.length; i += 2) {
      let tmp = [cards[i]]
      if (i + 1 < cards.length) {
        tmp.push(cards[i+1])
      }
      
      pairs.push(tmp)
    }

    const components = pairs.map((pair, index) => {
      return this.renderPair(pair, dim, index)
    })
    
    return (
      <View>
        {components}
      </View>
    )
  }

  renderPair(pair, dim, key) {
    const pairStyle = {
      flexDirection: 'row'
    }
    const cardStyle = {
      flex: 1
    }

    const imgWidth = (dim.width / 2)
    const renderLeft = () => {
      if (pair.length < 1) {
        return null
      }

      const card = pair[0]
      return (
        <TouchableOpacity
           style={cardStyle}
           onPress={this.openShowCards.bind(this, card)}>
          <Image
            style={{width :imgWidth, height: imgWidth}}
            source={{uri: card.get('imageUri')}}/>
        </TouchableOpacity>
      )
    }

    const renderRight = () => {
      if (pair.length < 2) {
        return null
      }
      
      const card = pair[1]
      return (
        <TouchableOpacity
           style={cardStyle}
           onPress={this.openShowCards.bind(this, card)}>
          <Image
             style={{width: imgWidth, height: imgWidth}}
             source={{uri: card.get('imageUri')}}/>
        </TouchableOpacity>
      )
    }
    
    return (
      <View style={pairStyle} key={key}>
        {renderLeft()}
        {renderRight()}
      </View>
    )
  }
  
  openCreateCard() {
    this.props.navigation.navigate('CreateCard')
  }

  openShowCards(initialCard) {
    this.props.navigation.navigate('ShowCards', { initialCard })
  }
  
  refreshControl() {
    return (
      <RefreshControl
        refreshing={this.props.card.refreshing}
        onRefresh={() => this.props.searchCards(this.state.query)}/>
    )
  }
}

CardsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
  searchCards: PropTypes.func.isRequired
}

CardsScreen.navigationOptions = {
  title: 'Home'
}

const ConnectedCardsScreen = connect((state) => {
  return {
    card: state.card
  }
}, (dispatch) => {
  return {
    searchCards: (query) => dispatch(CardsActions.search(query))
  }
})(CardsScreen)

const HomeStack = StackNavigator({
  Cards: {
    screen: ConnectedCardsScreen,
    navigationOptions: {
      header: { ...Theme.header }
    }
  }
}, {
  initialRouteName: 'Cards'
})

const HomeScreen = DrawerNavigator({
  Home: { screen: HomeStack },
}, {
  initialRouteName: 'Home',
  contentComponent: MyDrawer
})

export default HomeScreen
