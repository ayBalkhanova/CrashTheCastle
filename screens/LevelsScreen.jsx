import React, { useState } from 'react';
import { View, Button, Text, ImageBackground, TouchableOpacity} from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { mainImage } from '../images';
import { useLevel } from '../levelContext';


const LevelsScreen = ({navigation}) => {
  const { currentLevel, setLevel } = useLevel();

  const amountOfLevels = 6;

  return (
    <ImageBackground source={mainImage} style={{flex: 1, justifyContent: 'center'}} >
        <View style={{ position: 'absolute', alignSelf: 'center', borderColor: 'rgb(251, 201, 106)', borderWidth: 2, borderRadius: 22, width: 450}}>
            <View style={{ borderWidth: 4, borderRadius: 20, borderColor: 'rgb(30, 25, 32)', backgroundColor: 'rgb(252, 204, 119)'}}>
                <View style={{ width:'100%', left: 28}}>
                    <TouchableOpacity
                        key='0'
                        style={[styles.button, styles.backButton]}
                        onPress={() =>{ navigation.navigate('Start') }}>
                        <Text style={[styles.text, { minWidth: 15 }]}>
                            Назад
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row',  justifyContent: 'center', margin: 10}} >
                {[...Array(amountOfLevels).keys()].map((key) => 
                    <TouchableOpacity
                        key={key}
                        style={styles.button}
                        onPress={() =>{ navigation.navigate(`GameLevel${key}`) }}>
                        <Text style={[styles.text, { minWidth: 15 }]}>
                            {key + 1}
                        </Text>
                    </TouchableOpacity>
                )}
                </View>
            </View>
        </View>
    </ImageBackground>
  )
}

export default LevelsScreen;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 40,
    margin: 12,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: 'rgb(30, 25, 32)',
    backgroundColor: 'rgb(255, 190, 48)',
  },

  backButton: {
    width: '45%',
    marginBottom: 1,
  },

  text: {
    fontSize: 25,
    fontFamily: 'MV-crooker',
  },
});