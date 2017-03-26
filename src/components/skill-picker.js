import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button, ScrollView, TouchableOpacity, View, Text, AsyncStorage, StyleSheet, Picker, TextInput } from 'react-native'

export default class SkillPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      skill: 0,
      level: 1
    }
  }
  render() {
    const levelItems = [1,2,3,4,5,6,7,8,9, 10].map((i) => {
      return (
        <Picker.Item
          key={i}
          label={i.toString()}
          value={i}/>
      )
    })
    
    return (
      <View style={style.container}>
        <Picker style={{flex: 1}}
          selectedValue={this.state.skill}
          onValueChange={this.changeSkill.bind(this)}
          >
          {[null, ...this.props.skills].map(this.renderSkill)}
        </Picker>
        <Text>Lv: </Text>
        <Picker style={{flex: 1}}
          selectedValue={this.state.level}
          onValueChange={this.changeLevel.bind(this)}>
          {levelItems}
        </Picker>
      </View>
    )
  }

  renderSkill(skill, index) {
    return (
      <Picker.Item
        key={index}
        label={skill ? skill.name : '未選択'}
        value={index}/>
    )
  }
  changeSkill(value) {
    this.setState({
      ...this.state,
      skill: value
    })

    const skill = value > 0 && (value - 1) < this.props.skills.length ? this.props.skills[value - 1] : null
    this.props.onSelect({
      skill,
      level: this.state.level
    })
  }

  changeLevel(level) {
    this.setState({
      ...this.state,
      level: level
    })

    const value = this.state.skill
    const skill = value > 0 && (value - 1) < this.props.skills.length ? this.props.skills[value - 1] : null
    this.props.onSelect({
      skill, level
    })
  }
}

SkillPicker.propTypes = {
  skills: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})
