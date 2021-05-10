import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 

export default function ErrorText({ errorMessage }) {
  return (
    <View>
      <Ionicons style={styles.iconError}
          name="warning-sharp" />
      <Text style={styles.textError}>{errorMessage}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  iconError: {
    textAlign: 'center',
    color: 'red',
    fontSize: 37,
    alignItems: 'center',
    marginTop: 20
  },
  textError: {
    textAlign: 'center', 
    margin: 20, 
    borderColor:'red',
    borderWidth: 2,
    fontSize: 15,
    padding: 10
  }
})
