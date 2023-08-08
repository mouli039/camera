import React, {Component} from 'react';
import GetStarted from './src/components/GetStarted';
import Login from './src/components/Login';
import Register from './src/components/Register';
import HomePage from './src/components/HomePage';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

interface IProps {
  navigation?: any;
}
interface IState {
  users: {}[];
}

const Stack = createStackNavigator();

class App extends Component<IProps, IState> {
  state: IState = {users: []};
  async componentDidMount() {
    const data = await AsyncStorage.getItem('users');
    data === null
      ? AsyncStorage.setItem('users', JSON.stringify([]))
      : this.setState({users: JSON.parse(data)});
    this.toRegister();
  }
  toRegister = async () => {
    if (this.state.users?.length === 0) {
      this.props.navigation.navigate('Register');
    } else {
      this.state.users.map(
        (ele: any) =>
          ele.IsLoggedIn === true &&
          this.props.navigation?.navigate('HomePage', {details: ele}),
      );
      this.props.navigation?.navigate('Login');
    }
  };

  render() {
    if (this.state.users.length === 0 ){
      return <View>
        <></>
      </View>
    }
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="HomePage" component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
