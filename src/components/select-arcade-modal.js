import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal, View, ListView, Text, TextInput, Button, StyleSheet, TouchableHighlight } from 'react-native'
import ArcadeService from '../services/arcade-service'

class SelectArcadeModal extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.selected !== r2.selected
    })
    
    this.state = {
      searchText: '',
      searching: false,
      queryCount: 0,
      arcades: [],
      selected: null,
      dataSource: ds.cloneWithRows([])
    }
  }

  initialize() {
    this.setState({
      ...this.state,
      searchText: '',
      searching: false,
      queryCount: 0,
      arcades: [],
      selected: null
    })

    this.searchArcades('')
  }

  render() {
    const { visible, transparent, onSelect, onCancel, onRequestClose } = this.props
    const { searchText } = this.state

    const onPressSelectButton = () => { onSelect(this.state.selected) }
    
    return (
      <Modal
        visible={visible}
        transparent={transparent}
        onRequestClose={onRequestClose}
        onShow={this.initialize.bind(this)}>

        <View style={style.container}>
          <View style={style.searchBar}>
            <View style={{flex: 1}}>
              <TextInput
                value={searchText}
                onChangeText={this.searchArcades.bind(this)}/>
            </View>
          </View>


          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}/>
          
          <View style={style.buttons}>
            <View style={style.cancelButton}>
              <Button
                title='キャンセル'
                color='#AAA'
                onPress={onCancel}/>
            </View>
            <View style={style.selectButton}>
              <Button
                title='選択'
                color='#393e7a'
                onPress={onPressSelectButton}/>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  renderRow(arcade) {
    const selectedRow = this.state.selected && this.state.selected.id === arcade.id
    const rowStyle = {
      padding: 15, borderBottomWidth: 1, borderColor: '#CCC',
      backgroundColor: selectedRow ? '#bcc8db' : '#fff'
    }
    
    return (
      <TouchableHighlight
        style={rowStyle}
        onPress={this.onPressArcade.bind(this, arcade)}>
        <Text>{arcade.name}</Text>
      </TouchableHighlight>
    )
  }

  onPressArcade(arcade) {
    const newArcades = this.state.arcades.map((a) => {
      return {
        ...a,
        selected: a.id === arcade.id
      }
    })
    
    this.setState({
      ...this.state,
      selected: arcade,
      arcades: newArcades,
      dataSource: this.state.dataSource.cloneWithRows(newArcades)
    })
  }
  
  searchArcades(text) {
    this.setState({
      ...this.state,
      searchText: text,
      searching: true,
      queryCount: this.state.queryCount + 1
    })

    ArcadeService.findByName(text).then((rows) => {
      if (this.state.queryCount > 1) {
        return
      }

      const newArcades = rows.map((r) => {
        return {
          ...r,
          selected: false
        }
      })
      
      this.setState({
        ...this.state,
        searching: false,
        queryCount: this.state.queryCount - 1,
        selected: null,
        arcades: newArcades,
        dataSource: this.state.dataSource.cloneWithRows(newArcades)
      })
    })
  }

  componentDidMount() {
    // whether setState is available or not
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }
}

SelectArcadeModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  transparent: PropTypes.bool,
  onRequestClose: PropTypes.func
}

SelectArcadeModal.defaultProps = {
  transparent: false,
  onRequestClose: () => {}
}

export default connect((state) => {
  return {
    
  }
})(SelectArcadeModal)

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cancelButton: {
    marginRight: 5,
    flex: 1
  },
  selectButton: {
    marginLeft: 5,
    flex: 1
  },
  buttons: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center'
  }
})
