import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StartScreen from './screens/StartScreen';
import GameScreenLevel1 from './screens/GameScreenLevel1';
import GameScreenLevel2 from './screens/GameScreenLevel2';
import GameScreenLevel3 from './screens/GameScreenLevel3';
import GameScreenLevel4 from './screens/GameScreenLevel4';
import GameScreenLevel5 from './screens/GameScreenLevel5';
import GameScreenLevel6 from './screens/GameScreenLevel6';
import LevelsScreen from './screens/LevelsScreen';
import LevelCompletedWindow from './screens/LevelCompletedWindow';
import LevelStartingWindow from './screens/LevelStartingWindow';
import GameOverWindow from './screens/GameOverWindow';
import PauseWindow from './screens/PauseWindow';

export const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={StartScreen}/>
        <Stack.Screen name="Levels" component={LevelsScreen} />
        <Stack.Screen name="GameLevel1" component={GameScreenLevel1} />
        <Stack.Screen name="GameLevel2" component={GameScreenLevel2} />
        <Stack.Screen name="GameLevel3" component={GameScreenLevel3} />
        <Stack.Screen name="GameLevel4" component={GameScreenLevel4} />
        <Stack.Screen name="GameLevel5" component={GameScreenLevel5} />
        <Stack.Screen name="GameLevel6" component={GameScreenLevel6} />
        <Stack.Screen name="LevelCompleted" component={LevelCompletedWindow} />
        <Stack.Screen name="LevelStart" component={LevelStartingWindow} />
        <Stack.Screen name="GameOver" component={GameOverWindow} />
        <Stack.Screen name="Pause" component={PauseWindow} />
      </Stack.Navigator>
  );
};

export default MyStack;