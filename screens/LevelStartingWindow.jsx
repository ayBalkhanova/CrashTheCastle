import React from 'react';
import { View, Button, Text, TouchableOpacity, Image, ImageBackground} from 'react-native';
import { StyleSheet } from 'react-native';
import { mainImage } from '../images';

const LevelStartingWindow = ({navigation}) => {

  const ammoAmount = 3;

  return (
    <ImageBackground source={mainImage} style={{flex: 1, justifyContent: 'center'}} >
        <View style={{ alignSelf: 'center', borderColor: 'rgb(251, 201, 106)', borderWidth: 2, borderRadius: 22}}>
            <View style={{ borderWidth: 4, alignItems: 'center', borderRadius: 20, borderColor: 'rgb(30, 25, 32)', backgroundColor: 'rgb(251, 201, 106)'}}>
              <Text style={[styles.text, {marginTop: 10}]}>
                Уровень 1
              </Text>
              <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
                <Text style={[styles.text, {fontSize: 20, padding: 2, textAlign: 'center'}]}>
                  Сердце замка - огонь, что приводит его в жизнь.
                  </Text>
                  <Text style={[styles.text, {fontSize: 20, padding: 2, textAlign: 'center'}]}>
                  Потуши сердце, чтобы пройти этот уровень.
                  </Text>
                  <Text style={[styles.text, {fontSize: 20, padding: 2, textAlign: 'center'}]}>
                  У тебя есть {ammoAmount} обычных снаряда.
                </Text>
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
                    navigation.navigate('GameLevel1');
                    }
                  }>
                  <Text style={styles.bottomText}>
                    Продолжить
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
    </ImageBackground>
  )
}

export default LevelStartingWindow;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'rgb(30, 25, 32)',
    backgroundColor: 'rgb(255, 190, 48)',
    width: 170,
  },

  text: {
    fontSize: 27,
    fontFamily: 'MV-crooker',
  },

  bottomText: {
    fontSize: 16,
    fontFamily: 'MV-crooker',
  },
});