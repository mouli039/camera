import React, {Component} from 'react';
import ContextProvider from './src /context/ContextProvider';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodoTask1 from './src /components/TodoTask1';
import TodoTask2 from './src /components/TodoTask2';
import {Text} from 'react-native';
import DeleteIcon from 'react-native-vector-icons/AntDesign';

const Stack = createNativeStackNavigator();

interface IProps {
  navigation?: any;
}

class App extends Component<IProps> {
  toNextPage = () => {
    this.props.navigation.navigate('TodoTask2');
  };
  render() {
    return (
      <ContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="TodoTask1"
              component={TodoTask1}
              options={{
                headerTransparent: true,
                headerTintColor: 'white',
                headerShown: false,
                // headerTitle: props => (
                //   <Text style={{color: 'white', fontSize: 20,fontWeight:'500'}}>
                //     {props.children}
                //   </Text>
                // ),
              }}
            />
            <Stack.Screen
              name="TodoTask2"
              component={TodoTask2}
              options={{
                headerTransparent: true,
                headerTintColor: 'white',
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ContextProvider>
    );
  }
}

export default App;
