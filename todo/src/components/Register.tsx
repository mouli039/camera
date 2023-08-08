import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import React, {Component} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

interface IProps {
  navigation?: {navigate: (arg: string) => void};
}
interface IState {
  name: string;
  email: string;
  password: string;
  conPsw: string;
  nameError: boolean;
  emailError: boolean;
  passwordError: boolean;
  conPswError: boolean;
  users: any;
  passwordShow: boolean;
  conPswshow: boolean;
}

export class Register extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      conPsw: '',
      nameError: false,
      emailError: false,
      passwordError: false,
      conPswError: false,
      users: [],
      passwordShow: false,
      conPswshow: false,
    };
  }

  async componentDidMount() {
    const data = await AsyncStorage.getItem('users');
    data === null
      ? AsyncStorage.setItem('users', JSON.stringify([]))
      : this.setState({users: JSON.parse(data)});
  }

  toLogin = () => {
    this.props.navigation?.navigate('Login');
  };
  updateName = (e: string) => {
    this.setState({name: e});
  };
  updateEmail = (e: string) => {
    this.setState({email: e});
  };
  updatePassword = (e: string) => {
    this.setState({password: e});
  };
  updateConPsw = (e: string) => {
    this.setState({conPsw: e});
  };

  check = async () => {
    const {name, email, password, conPsw, users} = this.state;
    const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    this.setState({
      nameError: false,
      emailError: false,
      passwordError: false,
      conPswError: false,
    });
    if (name.trim() === '' && password.trim() === '' && email.trim() === '') {
      this.setState({
        nameError: true,
        emailError: true,
        passwordError: true,
        conPswError: true,
      });
    } else {
      if (name.trim() !== '') {
        if (email.trim() !== '' && emailRegEx.test(email)) {
          if (password.trim() !== '' && passwordRegEx.test(password)) {
            if (conPsw.trim() !== '' && conPsw === password) {
              const newUser = {
                name: name,
                email: email,
                password: password,
                todo: [],
                id: Date.now(),
                IsLoggedIn: false,
              };
              const res = [...users, newUser];
              await AsyncStorage.setItem('users', JSON.stringify(res));
              this.setState({
                name: '',
                email: '',
                password: '',
                conPsw: '',
                nameError: false,
                emailError: false,
                passwordError: false,
                conPswError: false,
              });
              Alert.alert('Successfully added user details');
              console.log(res);
            } else {
              this.setState({conPswError: true});
            }
          } else {
            this.setState({passwordError: true});
          }
        } else {
          this.setState({emailError: true});
        }
      } else {
        this.setState({nameError: true});
      }
    }
  };

  showPassword = () => {
    this.setState({passwordShow: !this.state.passwordShow});
  };
  showConPassword = () => {
    this.setState({conPswshow: !this.state.conPswshow});
  };
  render() {
    const {
      updateConPsw,
      updateEmail,
      updateName,
      updatePassword,
      toLogin,
      check,
      showPassword,
      showConPassword,
    } = this;
    const {
      name,
      email,
      password,
      conPsw,
      nameError,
      emailError,
      conPswError,
      passwordError,
      passwordShow,
      conPswshow,
    } = this.state;
    const passwordRegEx =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return (
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-60}>
        <ImageBackground
          source={require('./assets/shape.png')}
          imageStyle={{height: 175, width: 200}}
          style={{
            height: '100%',
            width: '100%',
          }}>
          {/* automaticallyAdjustKeyboardInsets={true} */}
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Welcome to Onboard! </Text>
              <Text style={styles.content}>
                Let’s help to meet up your tasks.
              </Text>
            </View>
            <View>
              <View style={styles.field}>
                <TextInput
                  onChangeText={updateName}
                  style={styles.textInput}
                  value={name}
                  placeholder="Enter Your Full name"
                />
                {nameError && (
                  <Text style={styles.helperText}>
                    {name.trim().length <= 2 ? "Username can't be empty" : ''}
                  </Text>
                )}
              </View>
              <View style={styles.field}>
                <TextInput
                  onChangeText={updateEmail}
                  style={styles.textInput}
                  value={email}
                  placeholder="Enter Your Email"
                />
                {emailError && (
                  <Text style={styles.helperText}>
                    {email.trim() === ''
                      ? "Email can't be empty"
                      : emailRegEx.test(email)
                      ? ''
                      : 'Invalid email id'}
                  </Text>
                )}
              </View>
              <View style={styles.field}>
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
                {passwordError && (
                  <Text style={styles.helperText}>
                    {password.trim() === ''
                      ? "Password can't be empty"
                      : passwordRegEx.test(password)
                      ? ''
                      : 'Invalid Password '}
                  </Text>
                )}
              </View>
              <View style={styles.field}>
                <View style={styles.password}>
                  <TextInput
                    onChangeText={updateConPsw}
                    secureTextEntry={conPswshow ? false : true}
                    style={styles.passwordInput}
                    placeholder="Re-enter password"
                    value={conPsw}
                  />
                  {conPswshow ? (
                    <Icon name="eye-off" size={20} onPress={showConPassword} />
                  ) : (
                    <Icon name="eye" size={20} onPress={showConPassword} />
                  )}
                </View>
                {conPswError && (
                  <Text style={styles.helperText}>
                    {conPsw.trim() === ''
                      ? "re-enter password can't be empty"
                      : 'password and re-enter password should be same'}
                  </Text>
                )}
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={check}>
              <Text style={styles.buttonTxt}>Register</Text>
            </TouchableOpacity>
            <Text style={styles.footer}>
              Already have an account ?{' '}
              <Text style={styles.footerLink} onPress={toLogin}>
                Sign In
              </Text>
            </Text>
          </View>
          {/* </ScrollView> */}
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

export default Register;

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 40,
    backgroundColor: 'transparent',
  },
  content: {
    marginTop: 15,
    textAlign: 'center',
    width: 200,
    alignSelf: 'center',
    fontWeight: '500',
    marginBottom: 70,
    backgroundColor: 'transparent',
  },
  button: {
    backgroundColor: '#50C2C9',
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 10,
    elevation: 2,
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
  helperText: {
    color: 'red',
    paddingHorizontal: 20,
  },
  field: {
    height: 90,
    backgroundColor: 'transparent',
  },
  footer: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    paddingBottom: 30,
  },
  footerLink: {
    color: '#50C2C9',
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
