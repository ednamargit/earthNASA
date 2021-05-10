import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { View, StyleSheet } from 'react-native';

export default function Reload({ load }) {
  return (
    <View>
      <Ionicons 
        style={styles.icon}
        onPress={load} 
        name="refresh-circle-outline" />
    </View>
  )
}

const styles = StyleSheet.create(
  {
    icon: {
      color: 'blue',
      fontSize: 37,
      //transform: [{ rotate: '70deg'}],
      position: 'absolute',
      left: 100
      
    }
  }
)
