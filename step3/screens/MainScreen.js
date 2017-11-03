import {
    DrawerNavigator,
  } from 'react-navigation';

import MessagesScreen from './MessagesScreen';
import UsersScreen from './UsersScreen';
  

const LoggedApp = DrawerNavigator({
    Messages: {
      screen: MessagesScreen,
    },
    Users: {
       screen: UsersScreen,
    },
});

export default LoggedApp;