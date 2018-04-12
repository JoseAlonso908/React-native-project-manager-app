/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import SessionCheck from './src/screens/SessionCheck';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import WalletsScreen from './src/screens/WalletsScreen';
import DashboardAccept from './src/screens/DashboardAccept';
import TermsConditionsScreen from './src/screens/TermsConditionsScreen';
import DashboardTabScreen from './src/screens/DashboardTabScreen';

const App = StackNavigator({

  // DashboardTab: { screen:DashboardTabScreen },
  Home: { screen: SessionCheck },
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  Profile: { screen:ProfileScreen },
  Wallets: { screen:WalletsScreen },
  DashboardAccept: { screen:DashboardAccept },
  TermsConditions: { screen:TermsConditionsScreen },
  DashboardTab: { screen:DashboardTabScreen },
});

export default App;
