import { NavigationContainer } from '@react-navigation/native';
import MyStack from './MyStack';
import { LevelProvider } from './levelContext';

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet } from 'react-native';
import { View, Text, Button } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { useFonts } from 'expo-font';

export default function App() {

  const [fontsLoaded] = useFonts({
    "MV-crooker": require("./assets/fonts/MV-crooker.ttf"),
  });

  if (!fontsLoaded) {
    return (<ImageBackground source={require('./assets/splash.png')} style={{ flex: 1 }} />)
  }
  // const [{ x, y, z}, setData] = useState({ x: 0, y: 0, z: 0 });

  // useEffect(() => {
  //   const subscription = Accelerometer.addListener(setData);
  //   return () => subscription.remove();
  // }, []);
  
 return (

  <LevelProvider>
      <NavigationContainer>
        <MyStack/>
        <StatusBar style="auto" hidden />
      </NavigationContainer>
    </LevelProvider>
  );}
  // return (
  //   <View style={styles.container}>
  //     <View style={{zIndex: 10, alignSelf:'flex-start', top: 70, position: 'absolute'}}>
  //        <Text>x: {x}</Text>
  //     <Text>y: {y}</Text>
  //     <Text>z: {z}</Text>
  //     <Button title='Slow' onPress={() => Accelerometer.setUpdateInterval(2000)} />
  //     <Button title='Fast' onPress={() => Accelerometer.setUpdateInterval(550)} />
  //     <View style={{top: x* 200 - 100, left: y*400, backgroundColor: 'green', width:50, height: 50}}>
  //       <Text>
  //         {x}, {y}
  //       </Text>
  //     </View>
  //     </View>
  //    <View style={{height: 300, left: 192, zIndex: 1000000000, position: 'absolute', width: 500, borderWidth: 20, borderColor: 'black'}}></View>
  //     <View style= {{height: 300, zIndex:1, left: 10}}>
  //       <Image source={require('./assets/sprites/layers/backClouds.png')} style= {{ position: 'absolute', width: 500, left: -y*15-180,  top: x*10 - 500, resizeMode: 'contain', zIndex: 100 }} />
        
  //       <Image source={require('./assets/sprites/layers/backMountainAndPlayer.png')} style= {{ position: 'absolute', width: 500, top: - 490, left: -180, resizeMode: 'contain', zIndex: 200 }} />
  //       <Image source={require('./assets/sprites/layers/frontMountain.png')} style= {{ position: 'absolute', width: 500, top: -x*10 - 490, left: -y*5-180, resizeMode: 'contain', zIndex: 230 }} />
  //       <Image source={require('./assets/sprites/layers/smallClouds.png')} style= {{ position: 'absolute', width: 500, top: - 490, left: -y*10-180, resizeMode: 'contain', zIndex: 10 }} />
  //       <Image source={require('./assets/sprites/layers/smallCloudAndSun.png')} style= {{ position: 'absolute', width: 500, top: x*2 - 490, left: -y*2-180, resizeMode: 'contain', zIndex: 1 }} />
        
        
  //       <Image source={require('./assets/sprites/layers/leftBackClouds.png')} style= {{ position: 'absolute', width: 500, top: -x*20 - 490, left: -y*25-180, resizeMode: 'contain', zIndex: 300 }} />
  //       <Image source={require('./assets/sprites/layers/leftFrontCloud.png')} style= {{ position: 'absolute', width: 500, top: -x*20 - 490, left: -y*30-180, resizeMode: 'contain', zIndex: 310 }} />
  //       <Image source={require('./assets/sprites/layers/topCloud.png')} style= {{ position: 'absolute', width: 500, top: x*20 - 500, left: -y*30-180, resizeMode: 'contain', zIndex: 300 }} />
  //       <Image source={require('./assets/sprites/layers/rightBackCloud.png')} style= {{ position: 'absolute', width: 500, top: -x*30 - 480, left: -y*35-180, resizeMode: 'contain', zIndex: 400 }} />
  //       <Image source={require('./assets/sprites/layers/rightFrontClouds.png')} style= {{ position: 'absolute', width: 500, top: -x*30 - 480, left: -y*40-180, resizeMode: 'contain', zIndex: 410 }} />
  //     </View>
  //     <StatusBar style="auto" />
  //   </View>
  // );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 
