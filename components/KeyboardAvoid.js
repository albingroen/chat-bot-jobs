import React, { Component } from 'react'
import { KeyboardAvoidingView } from 'react-native'

class KeyboardAvoid extends Component {
  render () {
    const { ...rest } = this.props

    return (
      <KeyboardAvoidingView
        behavior='position'
        keyboardVerticalOffset={0}
        {...rest}
      >
        {this.props.children}
      </KeyboardAvoidingView>
    )
  }
}

export default KeyboardAvoid
