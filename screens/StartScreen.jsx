import React, { useState } from 'react';
import { View, Button, Text, ImageBackground, TouchableOpacity} from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { mainImage } from '../images';

const StartScreen = ({navigation}) => {

  return (
    <ImageBackground source={mainImage} style={{flex: 1, justifyContent: 'center'}} >
      {/* <Image
        source={require('../assets/sprites/flame.gif')}
        resizeMode='stretch'
        style={{ width: 90, height: 180, position: 'absolute', right: '110', top: 130 }}
      /> */}
        <View style={{ alignSelf: 'center', borderColor: 'rgb(251, 201, 106)', borderWidth: 2, borderRadius: 15}}>
            <View style={{ borderWidth: 4, borderRadius: 13, borderColor: 'rgb(30, 25, 32)', backgroundColor: 'rgb(251, 201, 106)'}}>
              <TouchableOpacity 
                style={[styles.button, styles.firstButton]}
                onPress={() =>{
                  navigation.navigate('LevelStart');
                  }
                }>
                <Text style={styles.text}>
                  Начать
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>{
                  navigation.navigate('Levels');
                  }
                }>
                <Text style={styles.text}>
                  Уровни
                </Text>
              </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
  )
}

export default StartScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 70,
    marginVertical: 15,
    marginHorizontal: 25,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'rgb(30, 25, 32)',
    backgroundColor: 'rgb(255, 190, 48)',
  },

  firstButton: {
    marginBottom: 0,
  },

  text: {
    fontSize: 25,
    fontFamily: 'MV-crooker',
    fontWeight: 'regular'
  },
});