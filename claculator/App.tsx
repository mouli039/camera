import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import History from './src/components/History';
import Calculator from './src/components/Calculator';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Calculator" component={Calculator} />
          <Stack.Screen name="History" component={History} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
