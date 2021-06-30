import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/login';
import Main from './src/screens/main';
import Main2 from './src/screens/main2';

const AuthStack = createStackNavigator()

export default function Stack() {
  return (
    <NavigationContainer
    style={styles.container}>
      <AuthStack.Navigator
        headerMode='none'
      >
        <AuthStack.Screen name='Login' component={Login} />
        <AuthStack.Screen name='Main' component={Main} />
        <AuthStack.Screen name='Main2' component={Main2} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
