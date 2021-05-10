import React, { useState } from 'react'; 
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'; 
import DateTimePicker from '@react-native-community/datetimepicker';

// export default function InputDate({ date, onChange }) {

export default function InputDate({ date, mode, show, onChange }) {  
  
  return (
    <View>
      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          display="spinner"
          onChange={onChange}
        />
      )}
      {/* <TextInput value={date} onChange={onChange}></TextInput> */}
    </View>
  );
}

