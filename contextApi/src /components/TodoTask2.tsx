import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import Context from '../context/Context';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Entypo';
import DeleteIcon from 'react-native-vector-icons/AntDesign';
import CircleIcon from 'react-native-vector-icons/FontAwesome';

interface IProps {
  navigation?: any;
}

interface IState {
  currentDate: any;
}

class TodoTask1 extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      currentDate: new Date(),
    };
  }
  toNextPage = () => {
    this.props.navigation.push('TodoTask1');
  };
  render() {
    const today = this.state.currentDate;
    const day = moment(today).format('dddd');
    const date = moment().format('Do');
    const hours = moment().format('h:mm a');
    const timeStamp = moment().calendar();
    return (
      <Context.Consumer>
        {({tasks, addNewTask, deleteTask, markTask, input, inputHandler}) => (
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <ImageBackground
                source={{
                  uri: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg',
                }}
                style={styles.image}>
                <View style={styles.header}>
                  <DeleteIcon
                    name="arrowleft"
                    size={30}
                    color="white"
                    onPress={this.toNextPage}
                  />
                  <Text style={styles.headerText}>TodoTask2</Text>
                </View>
                <View style={styles.timer}>
                  <Text style={styles.day}>
                    {day} {date}
                  </Text>
                  <Text style={styles.time} onPress={this.toNextPage}>
                    {hours}
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={styles.content}>
              <View style={styles.fields}>
                <TextInput
                  style={styles.input}
                  onChangeText={inputHandler}
                  value={input}
                  placeholder="Enter the task"
                />
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => addNewTask(input)}>
                  <DeleteIcon name="plus" size={30} color="#ffffff" />
                </TouchableOpacity>
              </View>
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={tasks}
                  keyExtractor={(item: any) => item?.id}
                  renderItem={({item}: any) => (
                    <View style={styles.tasks}>
                      <View>
                        {item.strike ? (
                          <Text style={styles.taskTitle1}>{item.taskName}</Text>
                        ) : (
                          <Text style={styles.taskTitle}>{item.taskName}</Text>
                        )}
                        <Text style={styles.tasktime}>{timeStamp}</Text>
                      </View>
                      <View style={styles.actions}>
                        {!item.strike ? (
                          <Icon
                            name="circle"
                            size={20}
                            color="#20EEB0"
                            onPress={() => markTask(item.id)}
                          />
                        ) : (
                          <CircleIcon
                            name="circle"
                            size={20}
                            color="#20EEB0"
                            onPress={() => markTask(item.id)}
                          />
                        )}
                        <DeleteIcon
                          name="delete"
                          size={20}
                          color={'#FF4545'}
                          onPress={() => deleteTask(item.id)}
                        />
                      </View>
                    </View>
                  )}
                />
              </View>
            </View>
          </View>
        )}
      </Context.Consumer>
    );
  }
}

export default TodoTask1;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  imageContainer: {
    height: '40%',
  },
  image: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  timer: {
    padding: '6%',
    backgroundColor: 'transparent',
  },
  day: {
    fontSize: 15,
    color: 'white',
    fontWeight: '600',
  },
  time: {
    fontSize: 40,
    color: 'white',
    fontWeight: '800',
  },
  content: {
    height: '60%',
    paddingVertical: '5%',
  },
  fields: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#EBEFF2',
    width: '70%',
    marginRight: '2%',
    paddingHorizontal: '5%',
    borderRadius: 10,
  },
  icon: {
    backgroundColor: '#20EEB0',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tasks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '6%',
    paddingTop: '6%',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '15%',
  },
  taskTitle: {
    color: 'black',
  },
  taskTitle1: {
    color: 'grey',
    textDecorationLine: 'line-through',
  },
  tasktime: {
    color: 'grey',
  },
  header: {
    justifyContent: 'flex-start',
    alignItems:'center',
    paddingHorizontal:'5%',
    flexDirection:'row',
    marginTop:'3%'
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginLeft:'5%'
  },
});
