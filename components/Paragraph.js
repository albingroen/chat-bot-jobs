import React from 'react'
import { Text, StyleSheet } from 'react-native'

const Paragraph = props => {
  const { children, center } = props
  return (
    <Text style={[styles.Paragraph, center && { textAlign: 'center' }]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  Paragraph: {
    paddingTop: 10,
    lineHeight: 20,
    opacity: 0.85
  }
})

export default Paragraph
