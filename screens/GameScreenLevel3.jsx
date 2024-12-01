import React from 'react';
import { useState, useEffect } from 'react';
import { View, ImageBackground, TouchableOpacity} from 'react-native';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { useLevel } from '../levelContext';

import { GameEngine } from 'react-native-game-engine';

import entitiesLevel3 from '../entities/level3';

import Physics from '../physics';

import { Dimensions } from 'react-native';

import { backgroundImage } from '../images';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const reloadImg = require('../assets/sprites/reload.png');

const GameScreenLevel3 = ({navigation}) => {
  const { currentLevel, setLevel } = useLevel();

  const [gameRunning, setGameRunning] = useState(true);
  const [levelRunning, setLevelRunning] = useState(true);

  useEffect(() => {
    if (!levelRunning) {
      const timer = setTimeout(() => {
        navigation.navigate('LevelCompleted');
        setLevel(prevLevel => prevLevel + 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [levelRunning]);

  const radiusBody = 10;

  const xBody = 538;
  const yBody = 215;

  return (
    <ImageBackground source={backgroundImage} style={{ flex: 1, justifyContent: 'center', zIndex: 10 }} >
      <TouchableOpacity 
        style={styles.button}
        onPress={() =>{
          navigation.navigate('Pause');
          }
        }>
          <Image source={reloadImg} style={{width: 47, height:40, resizeMode: 'contain'}} />
      </TouchableOpacity>
            
      <GameEngine 
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        gameRunning={gameRunning}
        onEvent={(event) => {
          switch (event.type) {
            case 'level_finished':
              setLevelRunning(false);
              setGameRunning(false);
              break;
            case 'game_over':
              setGameRunning(false);
              break;
          }
        }}
        entities={entitiesLevel3()}
        systems={[Physics]}
      >
      </GameEngine>
    { !levelRunning ? 
        <>
          <View style={{left: 485, top: 163, width: 100, height: 100, position: 'absolute', zIndex: 1 }}>
            <Image source={require('../assets/sprites/heartBreaking.gif')} style={{flex: 1}} />
          </View>
        </>
      : 
      <Image source={require('../assets/sprites/flame.gif')}
            style={{
                left: xBody - 10,
                top: yBody - 190,
                width: radiusBody * 2,
                height: radiusBody * 4,
                resizeMode: 'stretch',
                zIndex: 1,
      }}/>
    }
    </ImageBackground>
  )
}

export default GameScreenLevel3;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    margin: 20,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'rgb(76, 59, 45)',
    width: 50,
    height: 50,
    position: 'absolute',
    top: 10,
    zIndex: 500, 
    left: 10,
  },

});