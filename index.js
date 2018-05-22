// import { AppRegistry } from 'react-native';
// import App from './App';

// AppRegistry.registerComponent('BYUAnon', () => App);

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';

registerScreens();

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'One',
      screen: 'First',
      title: 'First Screen'
    },
    {
      label: 'Two',
      screen: 'Second',
      title: 'Second Screen'
    }
  ]
});
