import {
  TabNavigator,
} from 'react-navigation';

import HelloScreen from './screens/HelloScreen';
import PingScreen from './screens/PingScreen';

const TabApp = TabNavigator({
  Hello: {screen: HelloScreen},  
  Ping: {screen: PingScreen},
});

export default TabApp;
