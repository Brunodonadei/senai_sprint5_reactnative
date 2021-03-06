import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Login from './login'
import Consultas from './consultas'
import Agendamentos from './agendamentos'

const bottomTab = createBottomTabNavigator()

export default class Main extends Component{
  render(){
    return(
      <View style={styles.main}>
          <bottomTab.Navigator
            // initialRouteName= 'Login'
            tabBarOptions={{
              activeBackgroundColor : '#252759',
              inactiveBackgroundColor : '#6A73A6',
              activeTintColor : 'white',
              inactiveTintColor : 'white',
            }}
          >
            <bottomTab.Screen name="Consultas" component={Consultas}/>
          </bottomTab.Navigator>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F1F1F1'
  }
})