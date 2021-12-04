import React from 'react';
import { StatusBar } from 'react-native';
import CodePush from 'react-native-code-push';

import Home from './screens/Home';

const App = () => (
  <>
    <StatusBar barStyle="light-content" />
    <Home />
  </>
);

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
})(App);
