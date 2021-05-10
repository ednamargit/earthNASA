import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function TextDate({ formatDateSel, date }) {
  return (
    <View style={styles.viewText} > 
      <Text style={styles.textDate}>{formatDateSel(date)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textDate: {
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 18,
    borderWidth: 2,
    padding: 5,
    paddingLeft: 12,
    margin: 10,
  },
  viewText: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.32,
    shadowRadius: 10,
    elevation: 7,
  }

}) 
