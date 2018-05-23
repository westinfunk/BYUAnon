// import { AppRegistry } from 'react-native';
// import App from './App';

// AppRegistry.registerComponent('BYUAnon', () => App);

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';

registerScreens();

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'New',
      screen: 'NewMessages',
      title: 'New'
    },
    {
      label: 'Top',
      screen: 'TopMessages',
      title: 'Top'
    },
    {
      label: 'Profile',
      screen: 'Profile',
      title: 'Profile'
    }
  ]
});
