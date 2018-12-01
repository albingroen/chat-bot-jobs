import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const HeaderRight = props => (
  <View style={styles.Container}>
    <TouchableOpacity onPress={() => props.navigate('About', {})}>
      <FontAwesome name='question-circle-o' size={32} color='white' />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => props.navigate('InfoTicket', {})}>
      <View style={styles.SettingsIcon}>
        <FontAwesome name='gear' size={32} color='white' />
      </View>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 16
  },
  SettingsIcon: {
    marginLeft: 16
  }
})

export default HeaderRight
