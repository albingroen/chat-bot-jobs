import React from 'react'
import { Text, StyleSheet } from 'react-native'

const Title = props => {
  const { children, center } = props
  return (
    <Text style={[styles.Title, center && { textAlign: 'center' }]}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  Title: {
    fontSize: 30,
    fontWeight: '600'
  }
})

export default Title
