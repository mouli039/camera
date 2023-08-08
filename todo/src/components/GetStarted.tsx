import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  navigation?: any;
}
interface IState {
  users: {}[];
}
class GetStarted extends Component<IProps, IState> {
  state: IState = {users: []};

  async componentDidMount() {
    const data = await AsyncStorage.getItem('users');
    data === null
      ? AsyncStorage.setItem('users', JSON.stringify([]))
      : this.setState({users: JSON.parse(data)});
      this.toRegister()
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
    return (
      <View style={styles.container}>
        <Image source={require('./assets/shape.png')} style={styles.backImg} />
        <Image source={require('./assets/checking.png')} style={styles.image} />
        <View>
          <Text style={styles.title}>Gets things with TODs</Text>
          <Text style={styles.content}>
            Lorem ipsum dolor sit amet consectetur. Eget sit nec et euismod.
            Consequat urna quam felis interdum quisque. Malesuada adipiscing
            tristique ut eget sed.
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.toRegister}>
          <Text style={styles.buttonTxt}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F4F3',
  },
  image: {
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 40,
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '800',
    textAlign: 'center',
  },
  content: {
    marginTop: 15,
    textAlign: 'center',
    width: 210,
    alignSelf: 'center',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#50C2C9',
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 150,
    borderRadius: 10,
  },
  buttonTxt: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '800',
    fontFamily: 'Poppins',
  },
  backImg: {
    height: 200,
    width: 220,
  },
});
