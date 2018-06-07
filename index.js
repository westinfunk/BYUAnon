// import { AppRegistry } from 'react-native';
// import App from './App';

import { PRIMARY, WHITE, LIGHT_GRAY, DARK_GRAY } from './src/styles';

// AppRegistry.registerComponent('BYUAnon', () => App);

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';

registerScreens();

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'New',
      screen: 'NewMessages',
      title: 'BYU Anon',
      icon: require('./assets/home.png')
    },
    {
      label: 'Top',
      screen: 'TopMessages',
      title: 'Top',
      icon: require('./assets/fire.png')
    },
    {
      label: 'Profile',
      screen: 'Profile',
      title: 'Profile',
      icon: require('./assets/profile.png')
    }
  ],
  tabsStyle: {
    tabBarButtonColor: LIGHT_GRAY,
    tabBarSelectedButtonColor: PRIMARY,
    tabBarTextFontFamily: 'Nunito-ExtraBold'
  },
  appStyle: {
    navBarTextFontFamily: 'Nunito-ExtraBold',
    navBarTextColor: WHITE,
    navBarBackgroundColor: PRIMARY,
    navBarButtonColor: WHITE
  }
});
