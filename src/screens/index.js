import { Navigation } from 'react-native-navigation';

import First from './FirstScreen';
import Second from './SecondScreen';
import Pushed from './PushedScreen';

export function registerScreens() {
  Navigation.registerComponent('First', () => First);
  Navigation.registerComponent('Second', () => Second);
  Navigation.registerComponent('Pushed', () => Pushed);
}
