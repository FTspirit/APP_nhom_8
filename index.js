/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { HomeScreen } from './src/components/HomeScreen';
import { MessageScreen } from './src/screens/MessageScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { FlashScreen } from './src/screens/FlashScreen';
import { LoginZalo } from './src/screens/LoginZalo';
import { ZaloHome } from './src/screens/ZaloHome';

AppRegistry.registerComponent(appName, () => App);
