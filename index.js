/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/appConfig/Context';
// import App from './src/navigation/app'
// import App from './src/screens/TestResultScreen/index'
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
