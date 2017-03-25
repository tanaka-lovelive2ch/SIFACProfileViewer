import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { View, ScrollView, Text, TextInput, Button, StyleSheet, AsyncStorage } from 'react-native'
import ArcadeModal from './select-arcade-modal'
import { NavigationActions } from 'react-navigation'

class AuthScreen extends Component {
  constructor(props) {
    super(props)
    const auth = this.getAuth()
    
    this.state = {
      redirect: !auth.name || auth.name.length === 0,
      email: 'example@example.com',
      playerName: '',
      myArcade: null,
      showArcadeModal: false
    }
  }

  async getAuth() {
    const playerName = await AsyncStorage.getItem('user:name')
    const arcadeId = await AsyncStorage.getItem('user:arcade')
    return { name: playerName, arcadeId }
  }
  
  componentWillMount() {
    if (this.state.redirect) {     
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' })
        ]
      }))
    }
  }
  
  render() {
    if (this.state.redirect) {
      return (<View></View>)
    }
    
    const { playerName, myArcade, showArcadeModal } = this.state

    const disabledButton = myArcade === null || !playerName.match(/^[^ 　]/)
    
    return (
      <View style={style.container}>
        <ArcadeModal
          visible={showArcadeModal}
          onSelect={this.changeMyArcade.bind(this)}
          onCancel={this.closeArcadeModal.bind(this)}/>
        
        <View style={style.description}>
          <Text style={style.descriptionText}>
            ユーザー情報を作成します
          </Text>
        </View>

        <Text style={style.subject}>プレイヤー名</Text>
        <TextInput
          value={playerName}
          onChangeText={this.changePlayerName.bind(this)}
          placeholder='名無しで叶える物語'/>

        <Text style={style.subject}>MY店舗</Text>
        <View style={style.myArcade}>
          <Text>{myArcade ? myArcade.name : '未選択'}</Text>
        </View>
        <Button
          title='MY店舗選択'
          color='#AAA'
          onPress={this.openArcadeModal.bind(this)}/>
        
        <View style={style.createButton}>
          <Button
            title='作成'
            disabled={disabledButton}
            color={disabledButton ? '#CCC' : '#393e7a' }
            onPress={this.createUser.bind(this)}/>
        </View>
      </View>
    )
  }

  openArcadeModal() {
    this.setState({
      ...this.state,
      showArcadeModal: true
    })
  }

  closeArcadeModal() {
    this.setState({
      ...this.state,
      showArcadeModal: false
    })
  }
  
  changePlayerName(name) {
    this.setState({
      ...this.state,
      playerName: name
    })
  }

  changeMyArcade(arcade) {
    this.setState({
      ...this.state,
      myArcade: arcade,
      showArcadeModal: false
    })
  }
  
  async createUser() {
    const arcadeId = this.state.myArcade ? this.state.myArcade.id : ''
    await AsyncStorage.setItem('user:name', this.state.playerName)
    await AsyncStorage.setItem('user:arcade', arcadeId)

    this.props.navigation.dispatch(NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'Auth' }),
      ]
    }))
  }

  showLoginScreen() {
    this.props.navigation.navigate('Login')
  }
}

AuthScreen.propTypes = {
  navigation: PropTypes.object.isRequired
}

AuthScreen.navigationOptions = {
  title: 'ログイン',
  header: {
    visible: false
  }
}

export default connect((state) => {
  return {
    auth: state.auth
  }
})(AuthScreen)

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  description: {
    alignItems: 'center',
  },
  descriptionText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  subject: {
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#CCC',
    marginTop: 30
  },
  createButton: {
    flex: 1, 
    justifyContent: 'flex-end'
  },
  myArcade: {
    alignItems: 'center',
    paddingVertical: 30
  }
})
