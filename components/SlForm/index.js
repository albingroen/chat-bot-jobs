import React, { Component } from 'react'
import { WebView } from 'react-native'

import { createScript, testData } from './create-script'

class SlForm extends Component {
  constructor () {
    super()

    this.handleFormResult = this.handleFormResult.bind(this)
  }

  handleFormResult ({ nativeEvent: { data: message } = {} } = {}) {
    if (message === 'OK') {
      this.props.handleSuccess()
    } else {
      this.props.handleError(message)
    }
  }

  render () {
    const { data = testData } = this.props

    return (
      <WebView
        useWebKit
        source={{
          uri:
            'https://sl.se/sv/info/kundservice/resegarantin/forseningsersattning'
        }}
        style={{ marginTop: 20 }}
        injectedJavaScript={createScript(data)}
        onMessage={this.handleFormResult}
        javaScriptEnabled
      />
    )
  }
}

export default SlForm
