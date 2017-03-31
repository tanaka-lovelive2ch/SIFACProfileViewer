import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import SelectTitleModal from './select-title-modal'
import SelectArcadeModal from './select-arcade-modal'
import { Picker, View, Button, Text, StyleSheet } from 'react-native'
import Theme from '../theme'
import * as CardAction from '../actions/cards'
import { CardQuery } from '../services/card-service'

class ChangeQueryScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      characters: [],
      title: null,
      arcade: null,
      skills: [],
      modal: null,
      currentCharacterValue: '未選択'
    }
  }

  componentWillMount() {
    this.ichinen = {
      characters: this.props.character.list.filter((c) => {
        return c.name.match(/(星空凛|西木野真姫|小泉花陽)/)
      }),
      label: '一年生',
      value: '一年生'
    }
    this.ninen = {
      characters: this.props.character.list.filter((c) => {
        return c.name.match(/(高坂穂乃果|南ことり|園田海未)/)
      }),
      label: '二年生', value: '二年生'
    }
    
    this.sannen = {
      characters: this.props.character.list.filter((c) => {
        return c.name.match(/(絢瀬絵里|東條希|矢澤にこ)/)
      }),
      label: '三年生', value: '三年生'
    }
    
    this.printemps = {
      characters: this.props.character.list.filter((c) => {
        return c.name.match(/高坂穂乃果|南ことり|小泉花陽/)
      }),
      label: 'Printemps', value: 'Printemps'
    }
    
    this.lilywhite = {
      characters: this.props.character.list.filter((c) => {
        return c.name.match(/園田海未|東條希|星空凛/)
      }),
      label: 'lily white', value: 'lily white'
    }
    this.bibi = {
      characters: this.props.character.list.filter((c) => {
        return c.name.match(/絢瀬絵里|西木野真姫|矢澤にこ/)
      }),
      label: 'BiBi', value: 'BiBi'
    }    
  }

  groupToPickerItem(group) {
    return (<Picker.Item key={group.value} label={group.label} value={group.value}/>)
  }
  
  render() {
    const { modal } = this.state
    const hideModal = this.hideModal.bind(this)

    const currentCharacterLabel = typeof(this.state.currentCharacterValue) === 'number' ? this.props.character.list.find((c) => c.id === this.state.currentCharacterValue).name : this.state.currentCharacterValue
    
    return (
      <View style={{flex: 1}}>
        <SelectTitleModal
           visible={modal === 'title'}
           onSelect={this.onSelectTitle.bind(this)}
           onCancel={hideModal}/>
        <SelectArcadeModal
           visible={modal === 'arcade'}
           onSelect={this.onSelectArcade.bind(this)}
           onCancel={hideModal}/>
        <View style={style.subject}>
          <Text style={style.subjectText}>キャラクター</Text>
        </View>
        {this.renderCharacters()}
        <View style={{paddingLeft: 30}}>
          <Text>{'選択: ' + currentCharacterLabel}</Text>
        </View>
        
        <View style={{position: 'absolute', bottom: 0, flexDirection: 'row', padding: 30}}>
          <View style={{flex: 1}}>
            <Button
               title='検索'
               color={Theme.button.primary}
               onPress={this.changeQuery.bind(this)}/>
          </View>
        </View>
      </View>
    )
  }

  renderCharacters() {
    let pickerItems = this.props.character.list.map((c, index) => {
      return (<Picker.Item key={c.id} label={c.name} value={c.id}/>)
    })
    
    pickerItems = [(<Picker.Item key={'未選択'} label='未選択' value='未選択'/>), ...pickerItems.toArray()]
    const groupItems = [
      this.ichinen, this.ninen, this.sannen,
      this.printemps, this.lilywhite, this.bibi
    ].map(this.groupToPickerItem)

    pickerItems = pickerItems.concat(groupItems)
    
    return (
      <View style={{padding: 30, alignItems: 'center'}}>
        <Text>{this.state.currentCharacterLabel}</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Picker
               selectedValue={this.state.currentCharacterValue}
               onValueChange={this.onChangeCharacter.bind(this)}>
              {pickerItems}
            </Picker>
          </View>
        </View>
      </View>
    )
  }

  onChangeCharacter(value) {
    let characters = []
    if (value === '未選択') {
      this.setState({
        characters,
        currentCharacterValue: value
      })
      return
    }
    
    if (typeof(value) === 'number') {
      characters = this.props.character.list.filter((c) => c.id === value).toArray()
    }
    if (typeof(value) === 'string') {
      characters = [
        this.ichinen, this.ninen, this.sannen,
        this.printemps, this.lilywhite, this.bibi
      ].filter((g) => g.value === value)[0].characters.toArray()
    }

    this.setState({
      characters,
      currentCharacterValue: value
    })
  }
  
  onSelectTitle(title) {
    this.setState({
      title: title,
      modal: null,
    })
  }

  onSelectArcade(arcade) {
    this.setState({
      arcade,
      modal: null
    })
  }

  hideModal() {
    this.setState({
      modal: null
    })
  }
  
  changeQuery() {
    const { navigation } = this.props
    let newQuery = new CardQuery()
    newQuery.characters = this.state.characters
    this.props.changeQuery(newQuery).then(() => {
      navigation.goBack()
    })
  }
}

ChangeQueryScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

ChangeQueryScreen.navigationOptions = {
  header: {
    ...Theme.header
  }
}
export default connect((state) => {
  return {
    character: state.character
  }
}, (dispatch) => {
  return {
    changeQuery: (query) => dispatch(CardAction.search(query))
  }
})(ChangeQueryScreen)

const style = StyleSheet.create({
  subject: {
    padding: 30,
    paddingBottom: 0
  },
  subjectText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})
