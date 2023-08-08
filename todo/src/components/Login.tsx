import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

interface IProps {
  navigation?: {navigate: any};
}

interface IState {
  users: any[];
  mail: string;
  password: string;
  mailError: boolean;
  passwordError: boolean;
  passwordShow: boolean;
}

class Login extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      users: [],
      mail: '',
      password: '',
      mailError: false,
      passwordError: false,
      passwordShow: false,
    };
  }

  async componentDidMount() {
    const data: any = await AsyncStorage.getItem('users');
    const userlist = JSON.parse(data);
    console.log(userlist);
    this.setState({users: userlist});
    userlist?.map(
      (ele: any) =>
        ele.IsLoggedIn &&
        this.props.navigation?.navigate('HomePage', {details: ele}),
    );
  }

  toRegister = () => {
    this.props.navigation?.navigate('Register');
  };

  updateMail = (e: string) => {
    this.setState({mail: e});
  };
  updatePassword = (e: string) => {
    this.setState({password: e});
  };

  check = async () => {
    const {mail, users, password} = this.state;
    this.setState({mailError: false, passwordError: false});
    users?.map((ele: any) => {
      if (ele.email === mail) {
        if (ele.password === password) {
          this.props.navigation?.navigate('HomePage', {details: ele});
          this.setState({mail: '', password: ''});
        } else {
          this.setState({passwordError: true});
        }
      } else {
        this.setState({mailError: true});
      }
    });
  };

  showPassword = () => {
    this.setState({passwordShow: !this.state.passwordShow});
  };

  render() {
    const {updateMail, updatePassword, toRegister, check, showPassword} = this;
    const {mail, password, mailError, passwordError, passwordShow} = this.state;
    return (
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={-100}>
      <ImageBackground
        source={require('./assets/shape.png')}
        imageStyle={{height: 175, width: 200}}
        style={{height: '100%', width: '100%'}}>
        {/* <ScrollView
          style={{backgroundColor: 'transparent'}}
          // keyboardShouldPersistTaps={true}
          // keyboardDismissMode="on-drag"
          // ref="scrollView"
          // automaticallyAdjustContentInsets={true}
          // horizontal={false}
          > */}
          <View>
            <Text style={styles.title}>Welcome back</Text>
            <Image
              source={require('./assets/school.png')}
              style={styles.image}
            />
            <TextInput
              onChangeText={updateMail}
              style={styles.textInput}
              placeholder="Enter your Email"
              value={mail}
            />
            <Text style={styles.helperText}>
              {mailError && 'Please Check the mailId'}
            </Text>
            <View style={styles.password}>
              <TextInput
                onChangeText={updatePassword}
                secureTextEntry={passwordShow ? false : true}
                style={styles.passwordInput}
                placeholder="Enter password"
                value={password}
              />
              {passwordShow ? (
                <Icon name="eye-off" size={20} onPress={showPassword} />
              ) : (
                <Icon name="eye" size={20} onPress={showPassword} />
              )}
            </View>
            <Text style={styles.helperText}>
              {passwordError && 'Please Check the mailId'}
            </Text>

            <Text style={styles.footerLink}>Forgot password</Text>
            <TouchableOpacity style={styles.button} onPress={check}>
              <Text style={styles.buttonTxt}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.footer}>
              Don’t have an account ?{' '}
              <Text style={styles.footerLink} onPress={toRegister}>
                Sign Up
              </Text>
            </Text>
          </View>
          {/* </ScrollView> */}
      </ImageBackground>
        </KeyboardAvoidingView>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#50C2C9',
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 2,
  },
  image: {
    alignSelf: 'center',
    marginVertical: 30,
  },
  buttonTxt: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '800',
    fontFamily: 'Poppins',
  },
  backImg: {
    height: 130,
    width: 145,
  },
  textInput: {
    borderRadius: 100,
    backgroundColor: 'white',
    marginHorizontal: 10,
    paddingHorizontal: 20,
    elevation: 5,
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 180,
  },
  footer: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
  footerLink: {
    color: '#50C2C9',
    textAlign: 'center',
  },
  helperText: {
    color: 'red',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  passwordInput: {
    width: '90%',
    marginRight: 10,
  },
  password: {
    borderRadius: 100,
    backgroundColor: 'white',
    marginHorizontal: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
  },
});
