import React from 'react'
import { View, Text, Button } from 'react-native'

export default function ButtonDate({ showDatepicker }) {
  return (
    <View>
      <Button onPress={showDatepicker} title="Select a Date!" />
    </View>
  )
}
