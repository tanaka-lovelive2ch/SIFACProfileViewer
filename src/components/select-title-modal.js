import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Modal, View, ListView, Text, TextInput, Button, StyleSheet, TouchableHighlight } from 'react-native'

const notTitle = {
  name: '未選択'
}

class SelectTitleModal extends Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.selected !== r2.selected
    })

    this.state = {
      searchText: '',
      selected: null,
      dataSource: ds
    }
  }

  initialize() {
    this.setState({
      ...this.state,
      searchText: '',
      selected: null,
    })
  }

  render() {
    const { title, visible, transparent, onSelect, onCancel, onRequestClose } = this.props
    const { selected, searchText } = this.state

    const rows = title.list.filter((t) => {
      return t.name.match(searchText)
    }).toArray()

    const ds = this.state.dataSource.cloneWithRows([
      {...notTitle, selected: selected === null },
      ...rows.map((t) => {
        return {
          ...t,
          selected: selected !== null && selected.id === t.id
        }
      })
    ])

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
                onChangeText={this.searchTitle.bind(this)}/>
            </View>
          </View>


          <ListView
            enableEmptySections={true}
            dataSource={ds}
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

  renderRow(title) {
    const rowStyle = {
      padding: 15, borderBottomWidth: 1, borderColor: '#CCC',
      backgroundColor: title.selected ? '#bcc8db' : '#fff'
    }
    
    return (
      <TouchableHighlight
        style={rowStyle}
        onPress={this.onPressTitle.bind(this, title)}>
        <Text>{title.name}</Text>
      </TouchableHighlight>
    )
  }
  
  searchTitle(text) {
    this.setState({
      ...this.state,
      searchText: text
    })
  }

  onPressTitle(title) {
    this.setState({
      ...this.state,
      selected: title
    })
  }
}

SelectTitleModal.propTypes = {
  title: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  transparent: PropTypes.bool,
  onRequestClose: PropTypes.func
}

SelectTitleModal.defaultProps = {
  transparent: false,
  onRequestClose: () => {}
}

export default connect((state) => {
  return {
    title: state.title
  }
})(SelectTitleModal)

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
