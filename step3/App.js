import {
  StackNavigator,
} from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import SignupScreen from './screens/SignupScreen';

const BasicApp = StackNavigator({
  Login: {screen: LoginScreen}, 
  Signup: {screen: SignupScreen},  
  Main: {screen: MainScreen},
});

export default BasicApp;
