import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Dimensions, StyleSheet, Image, Button, ScrollView, TouchableOpacity, View, Text, AsyncStorage, Picker, TextInput } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import SelectArcadeModal from './select-arcade-modal'
import SelectTitleModal from './select-title-modal'
import SkillPicker from './skill-picker'
import DatePicker from 'react-native-datepicker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Theme from '../theme'
import * as CardsActions from '../actions/cards'
import * as momentBase from 'moment'
const moment = momentBase.default

class CreateCardScreen extends Component {
  constructor(props) {
    super(props)

    const now = moment().format('YYYY-MM-DD HH:mm')
    this.state = {
      imageUri: null,
      imageSize: { width: 0, height: 0 },
      arcade: null,
      title: null,
      playerName: '',
      supportSkill: { skill: null, level: 1},
      cameraSkill: { skill: null, level: 1},
      stageSkill: { skill: null, level: 1},
      character: null,
      date: now,
      modal: null
    }
  }

  setState(newState) {
    const navState = this.props.navigation.state
    const prevParams = navState.params ? navState.params : {}
    const disabled = !(newState.imageUri && newState.imageUri.length > 0)
    
    super.setState(newState)
    this.props.navigation.setParams({
      ...prevParams,
      disabled
    })
  }
  
  componentWillMount() {
    this.props.navigation.setParams({
      disable: true,
      onPress: this.createCard.bind(this)
    })
  }
  componentDidMount() {
    this.fetchDefaultPlayerName()
  }
  
  render() {
    const { modal } = this.state
    const characters = this.props.character.list.toArray()

    const renderImage = (uri, size) => {
      if (!uri) return null
      const dim = Dimensions.get('window')
      const imgWidth = dim.width -30*2
      const imgStyle = {
        width: imgWidth,
        height: imgWidth * size.height / size.width
      }
      
      return (
        <View style={{marginTop: 30}}>
          <Image
            style={imgStyle}
            source={{uri}}/>
        </View>
      )
    }
    
    return (
      <ScrollView style={style.container}>
        <SelectArcadeModal
          visible={modal === 'arcade'}
          onSelect={this.onSelectArcade.bind(this)}
          onCancel={this.closeModal.bind(this)}/>
        <SelectTitleModal
          visible={modal === 'title'}
          onSelect={this.onSelectTitle.bind(this)}
          onCancel={this.closeModal.bind(this)}/>

        <Text style={[style.subject, { marginTop: 0 }]}>画像</Text>
        <View style={style.image}>
          {renderImage(this.state.imageUri, this.state.imageSize)}
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <View style={{flex: 1}}>
              <Button
                title='選択'
                color={Theme.button.primary}
                onPress={this.pickImage.bind(this)}/>
            </View>
          </View>
        </View>
        
        <Text style={style.subject}>キャラクター</Text>
        {this.renderCharacterPicker(characters)}

        <Text style={style.subject}>撮影日時</Text>
        <View style={{flexDirection: 'row', marginTop: 30}}>
          <View style={{flex: 1}}>
            <DatePicker
              style={{width: null}}
              date={this.state.date}
              mode='datetime'
              format='YYYY-MM-DD HH:mm'
              onDateChange={this.onDateChange.bind(this)}/>
          </View>
        </View>
        
        <Text style={style.subject}>プレイヤー名</Text>
        <TextInput
          value={this.state.playerName}
          onChangeText={this.changePlayerName.bind(this)}
          placeholder='名無しで叶える物語'/>
        
        <Text style={style.subject}>称号</Text>
        <View style={style.myArcade}>
          <Text style={{paddingVertical: 30 }}>
            {this.state.title ? this.state.title.name : '未選択'}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Button
                title='選択'
                color={Theme.button.primary}
                onPress={this.openTitleModal.bind(this)}/>
            </View>
          </View>
        </View>

        <Text style={style.subject}>サポートスキル</Text>
        <View style={style.skill}>
          <SkillPicker
            skills={this.props.skill.support.toArray()}
            onSelect={this.changeSupportSkill.bind(this)}/>
        </View>

        <Text style={style.subject}>カメラスキル</Text>
        <View style={style.skill}>
          <SkillPicker
            skills={this.props.skill.camera.toArray()}
            onSelect={this.changeCameraSkill.bind(this)}/>
        </View>

        <Text style={style.subject}>ステージスキル</Text>
        <View style={style.skill}>
          <SkillPicker
            skills={this.props.skill.stage.toArray()}
            onSelect={this.changeStageSkill.bind(this)}/>
        </View>
        
        <Text style={style.subject}>店舗</Text>
        <View style={[style.myArcade, { marginBottom: 30 }]}>
          <Text style={{paddingVertical: 30}}>
            {this.state.arcade ? this.state.arcade.name : '未選択'}
          </Text>
          <View style={{flexDirection: 'row', marginBottom: 30}}>
            <View style={{flex: 1}}>
              <Button
                title='選択'
                color={Theme.button.primary}
                onPress={this.openArcadeModal.bind(this)}/>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }

  renderCharacterPicker(characters) {
    if (!characters || characters.length === 0) {
      return null
    }

    const selected = this.state.character ? this.state.character : characters[0]

    const renderItem = (ch, index) => {
      return (
        <Picker.Item
          key={index}
          label={ch.name}
          value={ch.id}/>
      )
    }
    
    return (
      <View style={style.skill}>
        <Picker style={{flex: 1}}
          selectedValue={selected.id}
          onValueChange={this.changeCharacter.bind(this)}>
          {characters.map(renderItem)}
        </Picker>
      </View>
    )
  }

  onDateChange(date) {
    this.setState({
      ...this.state,
      date: date
    })
  }
  
  changeCharacter(id) {
    const characters = this.props.character.list
    const selected = characters.find((c) => c.id === id)
    this.setState({
      ...this.state,
      character: selected
    })
  }
  
  changeSupportSkill(skill) {
    this.setState({
      ...this.state,
      supportSkill: skill
    })
  }

  changeCameraSkill(skill) {
    this.setState({
      ...this.state,
      cameraSkill: skill
    })
  }
  
  changeStageSkill(skill) {
    this.setState({
      ...this.state,
      stageSkill: skill
    })
  }
  
  changePlayerName(next) {
    this.setState({
      ...this.state,
      playerName: next
    })
  }
  
  openArcadeModal() {
    this.setState({
      ...this.state,
      modal: 'arcade'
    })
  }
  
  onSelectArcade(arcade) {
    this.setState({
      ...this.state,
      arcade,
      modal: null
    })
  }

  openTitleModal() {
    this.setState({
      ...this.state,
      modal: 'title'
    })
  }

  onSelectTitle(title) {
    let nextTitle = null
    if (title.id !== null && typeof(title.id) !== 'undefined') {
      nextTitle = title
    }

    this.setState({
      ...this.state,
      title: nextTitle,
      modal: null
    })
  }
  
  closeModal() {
    this.setState({
      ...this.state,
      modal: null
    })
  }

  fetchDefaultPlayerName() {
    AsyncStorage.getItem('user:name').then((name) => {
      this.setState({
        ...this.state,
        playerName: name
      })
    })
  }
  
  pickImage() {
    const that = this

    const option = {
      storageOptions: {
        path: 'SIFAC-Profiles'
      }
    }
    
    ImagePicker.showImagePicker(option, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        const uri = response.uri
        Image.getSize(uri, (width, height) => {
          that.setState({
            ...that.state,
            imageUri: uri,
            imageSize: { width, height }
          })
        })

        that.setState({
          ...that.state,
          imageUri: uri,
        })
      }
    })
  }

  createCard() {
    const { date, imageUri, playerName, title, arcade, supportSkill, stageSkill, cameraSkill, character } = this.state

    const params = {
      imageUri, playerName, arcade, title, character,
      supportSkill, cameraSkill, stageSkill, date
    }
    
    this.props.createCard(params).then((action) => {
      this.props.navigation.goBack()
    })
  }
}

CreateCardScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  character: PropTypes.object.isRequired,
  skill: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired,
  createCard: PropTypes.func.isRequired
}

CreateCardScreen.navigationOptions = {
  title: 'プロフィールカード作成',
  header: (navigation) => {
    const { state } = navigation
    const params = state.params ? state.params : { disabled: true }
    const onPress = params.onPress ? params.onPress : () => {} 
    return {
      ...Theme.header,
      right: (
        <View style={{marginRight: 10}}>
          <TouchableOpacity
            style={{backgroundColor: params.disabled ? '#CCC' : '#504dcb', borderRadius: 5, paddingHorizontal: 20, paddingVertical: 8}}
            disabled={params.disabled}
            onPress={onPress}>
            <Icon name='check' color='#fff' size={20}/>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

export default connect((state) => {
  return {
    character: state.character,
    skill: state.skill,
    title: state.title
  }
}, (dispatch) => {
  return {
    createCard: (params) => dispatch(CardsActions.createCard(params))
  }
})(CreateCardScreen)

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
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
  myArcade: {
    alignItems: 'center',
  },
  skill: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    alignItems: 'center',
  }
})
