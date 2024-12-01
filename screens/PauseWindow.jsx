import React from 'react'
import { View, Button, Text, TouchableOpacity, Image, ImageBackground} from 'react-native'
import { StyleSheet } from 'react-native';
import { mainImage } from '../images';
import { useLevel } from '../levelContext';

const emptyStar = require('../assets/sprites/emptyStar.png');

const PauseWindow = ({navigation}) => {
  
  const { currentLevel, setLevel } = useLevel();

  return (
    <ImageBackground source={mainImage} style={{flex: 1, justifyContent: 'center'}} >
        <View style={{ alignSelf: 'center', borderColor: 'rgb(251, 201, 106)', borderWidth: 2, borderRadius: 22}}>
            <View style={{ borderWidth: 4, alignItems: 'center', borderRadius: 20, borderColor: 'rgb(30, 25, 32)', backgroundColor: 'rgb(251, 201, 106)'}}>

              <Text style={[styles.text, {marginTop: 1}]}>
                Уровень {currentLevel}
              </Text>

              <View style={{ flexDirection: 'row', height: 150}}>
                <Image source={emptyStar} style={{resizeMode: 'contain', width: 100, height: 100}} />
                <Image source={emptyStar} style={ {resizeMode: 'contain', width: 100, height: 100}} />
                <Image source={emptyStar} style={{resizeMode: 'contain', width: 100, height: 100}} />
              </View>

              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity 
                  style={styles.button}
                  onPress={() =>{
                    navigation.navigate('Start');
                    }
                  }>
                  <Text style={styles.bottomText}>
                    Назад
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>{
                    navigation.navigate(`GameLevel${currentLevel}`);
                    }
                  }>
                  <Text style={styles.bottomText}>
                    Заново
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
    </ImageBackground>
  )
}

export default PauseWindow;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 5,
    margin: 10,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'rgb(30, 25, 32)',
    backgroundColor: 'rgb(255, 190, 48)',
    width: 150,
  },

  text: {
    fontSize: 25,
    fontFamily: 'MV-crooker',
  },

  bottomText: {
    fontSize: 15,
    fontFamily: 'MV-crooker',
  },
});