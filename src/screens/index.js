import { Navigation } from 'react-native-navigation';

import ComposeMessage from './ComposeMessageScreen';
import ComposeReply from './ComposeReplyScreen';
import Message from './MessageScreen';
import NewMessages from './NewMessagesScreen';
import TopMessages from './TopMessagesScreen';
import Profile from './ProfileScreen';
import UserMessages from './UserMessagesScreen';
import UserReplies from './UserRepliesScreen';

export function registerScreens() {
  Navigation.registerComponent('ComposeMessage', () => ComposeMessage);
  Navigation.registerComponent('ComposeReply', () => ComposeReply);
  Navigation.registerComponent('Message', () => Message);
  Navigation.registerComponent('NewMessages', () => NewMessages);
  Navigation.registerComponent('TopMessages', () => TopMessages);
  Navigation.registerComponent('Profile', () => Profile);
  Navigation.registerComponent('UserMessages', () => UserMessages);
  Navigation.registerComponent('UserReplies', () => UserReplies);
}
