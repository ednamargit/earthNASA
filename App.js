import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Button,
  TextInput,
} from "react-native";
import * as Location from "expo-location";
import Reload from "./components/Reload";
import InputDate from "./components/InputDate";
import TextDate from "./components/TextDate";
import ButtonDate from "./components/ButtonDate";
import ErrorText from "./components/ErrorText";

// import { NASA_API_KEY } from '@env';

const BASE_NASA_URL = "https://api.nasa.gov/planetary/earth/imagery?";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export default function App() {
  const [imagery, setImagery] = useState('https://api.nasa.gov/planetary/earth/imagery?lon=-95.33&lat=29.78&date=2018-01-01&dim=0.15&api_key=DEMO_KEY');
  const [errorMessage, setErrorMessage] = useState(null);
  const [date, setDate] = useState(new Date('January 01, 2018 23:15:30'));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [activity, setActivity] = useState(false);
  const [day, setDay] = useState(null);

  useEffect(() => {
    load();
  }, [date]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    // setDate(event.target.value); 
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const formatDateSel = () => {
    let dateSel = new Date(date);
    let daySel = dateSel.getDate();
    let monthSel = dateSel.getMonth() + 1;
    let yearSel = dateSel.getFullYear();
    return `${yearSel}-${monthSel}-${daySel}`;
  };

  async function load() {
    
    setErrorMessage(null);

    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMessage("Access to location is needed to run the app");
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      let currentDate = formatDateSel({ date });

      const nasaUrl = `${BASE_NASA_URL}lon=${longitude}&lat=${latitude}&date=${currentDate}&dim=0.15&api_key=DEMO_KEY`;

      const response = await fetch(nasaUrl);

      setImagery(nasaUrl);

      
      if(response.ok) {
        setActivity(true);
      } else {
        setErrorMessage('No imagery for specified date')
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }


  if(activity) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ButtonDate showDatepicker={showDatepicker} />
        <Reload load={load} />
        <InputDate
          date={date}
          setDate={setDate}
          mode={mode}
          setMode={setMode}
          show={show}
          setShow={setShow}
          showDatepicker={showDatepicker}
          onChange={onChange}
          minDate="01-01-2014"
        />
  
        <TextDate date={date} formatDateSel={formatDateSel} />
  
        <Image
          source={{
            uri: {imagery}["imagery"]
          }}
          style={styles.imageN}
          //  style={{width: '100%', height: '100%'}}
        />
      </View>
    );
  } else if (errorMessage !== null) {
    return (
      <View style={styles.container}>
        <ButtonDate showDatepicker={showDatepicker} />
        <Reload  load={load}/>
        <TextDate date={date} formatDateSel={formatDateSel} />
        <ErrorText errorMessage={errorMessage}/>
        <StatusBar style="auto" />
      </View>
    );
  } else {
      return(
        <View style={styles.container}>
        <ActivityIndicator size="large" color='red' />
        <StatusBar style="auto" />
      </View>
      )
    }
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageN: {
    width: "70%",
    height: "70%",
    borderRadius: 5,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
  },
});
