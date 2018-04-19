import { AppRegistry } from 'react-native';
import App from './src/cpApp/App';
import MyApp from './src/myApp/root';

AppRegistry.registerComponent('app', () => App);
AppRegistry.registerComponent('myApp', () => MyApp);
