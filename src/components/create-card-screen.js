import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Dimensions, StyleSheet, Image, Button, ScrollView, TouchableOpacity, View, Text, AsyncStorage, Picker, TextInput } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import SelectArcadeModal from './select-arcade-modal'
import SelectTitleModal from './select-title-modal'
import SkillPicker from './skill-picker'

class CreateCardScreen extends Component {

  constructor(props) {
    super(props)


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
      modal: null
    }
  }

  componentDidMount() {
    this.fetchDefaultPlayerName()
  }
  
  fetchDefaultPlayerName() {
    AsyncStorage.getItem('user:name').then((name) => {
      this.setState({
        ...this.state,
        playerName: name
      })
    })
  }
  
  render() {
    const { modal } = this.state
    const characters = this.props.character.list.toArray()

    const renderImage = (uri, size) => {
      if (!uri) return null
      const dim = Dimensions.get('window')
      const imgWidth = dim.width -30*2
      return (
        <Image
          style={{ width: imgWidth, height: imgWidth * size.height / size.width}}
          source={{uri}}/>
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

        <Text style={style.subject}>画像</Text>
        <View style={style.image}>
          {renderImage(this.state.imageUri, this.state.imageSize)}
          <Button title='選択' onPress={this.pickImage.bind(this)}/>
        </View>
        
        <Text style={style.subject}>キャラクター</Text>
        {this.renderCharacterPicker(characters)}
        
        <Text style={style.subject}>プレイヤー名</Text>
        <TextInput
          value={this.state.playerName}
          onChangeText={this.changePlayerName.bind(this)}
          placeholder='名無しで叶える物語'/>
        
        <Text style={style.subject}>称号</Text>
        <View style={style.myArcade}>
          <Text>
            {this.state.title ? this.state.title.name : '未選択'}
          </Text>
          <Button title='選択' onPress={this.openTitleModal.bind(this)}/>
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
        <View style={style.myArcade}>
          <Text>
            {this.state.arcade ? this.state.arcade.name : '未選択'}
          </Text>
          <Button title='選択' onPress={this.openArcadeModal.bind(this)}/>
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
}

CreateCardScreen.propTypes = {
  character: PropTypes.object.isRequired,
  skill: PropTypes.object.isRequired,
  title: PropTypes.object.isRequired
}

export default connect((state) => {
  return {
    character: state.character,
    skill: state.skill,
    title: state.title
  }
})(CreateCardScreen)

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
  },
  skill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30
  },
  image: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 30
  }
})
