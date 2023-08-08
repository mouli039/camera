import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';
import DeleteIcons from 'react-native-vector-icons/AntDesign';
import LogOutIcons from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  navigation?: any;
  route?: {
    params: {
      details: any;
    };
  };
}

interface IState {
  userDetails: any;
  input: string;
  users: any;
}

class HomePage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      userDetails: {},
      input: '',
      users: [],
    };
  }

  inputHandler = (e: string) => {
    this.setState({input: e});
  };

  async componentDidMount() {
    const {details}: any = this.props.route!.params;
    this.setState({userDetails: details});
    const data: any = await AsyncStorage.getItem('users');
    const list = JSON.parse(data);
    const newList = list.map((ele: any) =>
      ele.mail === details.mail ? {...ele, IsLoggedIn: true} : ele,
    );
    AsyncStorage.setItem('users', JSON.stringify(newList));
    this.setState({users: newList});
  }

  check = () => {
    this.state.input.trim() !== '' && this.addTodo();
  };

  addTodo = async () => {
    const {input, users, userDetails} = this.state;
    const newObj = {
      ...userDetails,
      todo: [...userDetails.todo, {strike: false, task: input}],
    };
    this.setState({userDetails: newObj});
    const newlist = users.map((ele: any) => {
      return ele.id === userDetails.id ? newObj : ele;
    });
    AsyncStorage.setItem('users', JSON.stringify(newlist));
    this.setState({users: newlist, input: ''});
  };

  deleteTask = (task: string) => {
    const {input, users, userDetails} = this.state;
    const newtodo = userDetails.todo.filter((ele: any) =>
      ele.task !== task ? ele : false,
    );
    const newObj = {
      ...userDetails,
      todo: newtodo,
    };
    const newlist = users.map((ele: any) => {
      return ele.id === userDetails.id ? newObj : ele;
    });
    this.setState({userDetails: newObj, users: newlist});
    AsyncStorage.setItem('users', JSON.stringify(newlist));
  };

  checkBox = (task: string) => {
    const {input, users, userDetails} = this.state;
    const newtodo = userDetails.todo.map((ele: any) =>
      ele.task === task ? {...ele, strike: !ele.strike} : ele,
    );
    const newObj = {
      ...userDetails,
      todo: newtodo,
    };
    const newlist = users.map((ele: any) => {
      return ele.id === userDetails.id ? newObj : ele;
    });
    this.setState({userDetails: newObj, users: newlist});
    AsyncStorage.setItem('users', JSON.stringify(newlist));
  };

  logOUt = () => {
    const {users, userDetails} = this.state;
    const newUser = {...userDetails, IsLoggedIn: false};
    const newlist = users.map((ele: any) =>
      ele.mail === newUser.mail ? newUser : ele,
    );
    AsyncStorage.setItem('users', JSON.stringify(newlist));
    this.props.navigation?.navigate('Login');
  };

  render() {
    const {userDetails, input} = this.state;
    const {inputHandler, checkBox, deleteTask, check, logOUt} = this;
    return (
      <ImageBackground
        source={require('./assets/shape.png')}
        imageStyle={{height: 175, width: 200}}
        style={{height: '100%', width: '100%', backgroundColor: '#50C2C9'}}>
        <ScrollView style={{backgroundColor: 'transparent'}}>
          <View style={styles.container}>
            <View style={styles.profile}>
              <LogOutIcons
                name="log-out"
                color="white"
                size={40}
                style={styles.logout}
                onPress={logOUt}
              />
              <Image
                source={require('./assets/profile.png')}
                style={styles.profileImage}
              />
              <Text style={styles.buttonTxt}>Welcome {userDetails.name}</Text>
            </View>
            <View
              style={{backgroundColor: '#F0F4F3', flex: 1, paddingBottom:40}}>
              <Text style={[styles.title, styles.titleRight]}>
                Good Afternoon
              </Text>
              <Image
                source={require('./assets/clock.png')}
                style={styles.clock}
              />
              <Text style={styles.title}>Task list</Text>
              <View style={[styles.taskList, styles.shodow]}>
                <View style={styles.row}>
                  <TextInput
                    onChangeText={inputHandler}
                    style={styles.textInput}
                    placeholder="Add Task "
                    value={input}
                  />
                  <TouchableOpacity>
                    <Icons
                      name="plus"
                      size={20}
                      color={'#50C2C9'}
                      onPress={check}
                    />
                  </TouchableOpacity>
                </View>
                <ScrollView>
                  {userDetails.todo?.map((ele: any, ind: number) => (
                    <View style={styles.row} key={ind}>
                      {ele.strike ? (
                        <DeleteIcons
                          name="checksquare"
                          color={'#50C2C9'}
                          size={20}
                          onPress={() => checkBox(ele.task)}
                        />
                      ) : (
                        <Icons
                          name="square-o"
                          size={20}
                          color={'#50C2C9'}
                          onPress={() => checkBox(ele.task)}
                        />
                      )}
                      <Text style={ele.strike && styles.line}>{ele.task}</Text>
                      <DeleteIcons
                        name="delete"
                        size={20}
                        color={'#50C2C9'}
                        onPress={() => deleteTask(ele.task)}
                      />
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

export default HomePage;

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  backImg: {
    height: 130,
    width: 145,
  },
  container: {
    backgroundColor: 'transprant',
  },
  textInput: {
    borderRadius: 100,
    backgroundColor: '#F0F4F3',
    marginBottom: 30,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    width: '70%',
    elevation: 5,
  },
  profile: {
    height: 290,
    width: '100%',
    // backgroundColor: '#50C2C9',
    alignSelf: 'center',
    zIndex: 1,
  },
  profileImage: {
    alignSelf: 'center',
  },
  buttonTxt: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '800',
    fontFamily: 'Poppins',
    fontSize: 18,
    marginTop: 20,
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '800',
    paddingHorizontal: 20,
  },
  titleRight: {
    textAlign: 'right',
    paddingTop:10
  },
  clock: {
    alignSelf: 'center',
  },
  taskList: {
    width: '90%',
    height: 300,
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 15,
    marginTop: 20,
    borderRadius: 15,
  },
  shodow: {
    elevation: 5,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  checkbox: {
    height: 10,
    width: 10,
    borderWidth: 1,
  },
  line: {
    textDecorationLine: 'line-through',
  },
  imageLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logout: {
    padding: 20,
    alignSelf: 'flex-end',
  },
});
