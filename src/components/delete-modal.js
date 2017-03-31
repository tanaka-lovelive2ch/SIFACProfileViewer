import React, { Component, PropTypes } from 'react'
import { Button, Switch, View, Modal, Text, TouchableOpacity, Dimensions } from 'react-native'
import Theme from '../theme'

class DeleteModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      deleteFile: false
    }
  }
  
  render() {
    const { width, height } = Dimensions.get('window')
    const modalStyle = {
      width: width * 9 / 10,
      height: width * 9 / 16,
      backgroundColor: '#FFF'
    }
    
    return (
      <Modal
         transparent={true}
         visible={this.props.visible}
         onRequestClose={() =>{}}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={modalStyle}>
            <View style={{alignItems: 'center', padding: 30, paddingBottom: 0}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                プロフィールカードを削除します
              </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 30, paddingVertical: 15}}>
              <Text>画像ファイルの削除</Text>
              <Switch
                 value={this.state.deleteFile}
                 onValueChange={this.onChangeSwitch.bind(this)}/>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 30}}>
              <View style={{marginRight: 15, flex: 1}}>
                <Button title='キャンセル' onPress={this.props.onCancel} color='#AAA'/>
              </View>
              <View style={{marginLeft: 15, flex: 1}}>
                <Button title='削除' onPress={this.props.onOK} color={Theme.button.primary}/>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  onChangeSwitch(value) {
    this.setState({
      deleteFile: value
    })
  }

  onOK() {
    const { deleteFile } = this.state
    this.props.onOK(deleteFile)
  }
}

DeleteModal.PropTypes = {
  visible: PropTypes.bool.isRequired,
  onOK: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default DeleteModal
