import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

interface IProps {
  navigation?: any;
}
interface IState {
  storage: any;
}

class History extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      storage: [],
    };
  }

  async componentDidMount() {
    const data:any= await AsyncStorage.getItem('calculatorData');
    this.setState({storage: JSON.parse(data)});
  }

  toCalculator = () => {
    this.props.navigation?.push('Calculator');
  };

  clearHistory = async () => {
    AsyncStorage.clear();
    this.setState({storage: ''});
  };

  render() {
    const {storage} = this.state;
    const {toCalculator, clearHistory} = this;
    return (
      <View style={styles.container}>
        <Icon
          name="arrow-back-circle-sharp"
          size={40}
          color={'#A5A5A5'}
          onPress={toCalculator}
        />
        {storage.length === 0 ? (
          <Text style={styles.title}>No history found</Text>
        ) : (
          <>
            <FlatList
              data={storage.reverse()}
              keyExtractor={(item: any) => item.id}
              renderItem={({item}:any) => (
                <View style={styles.eachItem}>
                  <Text style={styles.screenText}>{item.question}</Text>
                  <Text style={styles.ans}>{item.answer}</Text>
                </View>
              )}
            />
            <TouchableOpacity style={styles.clearBtn} onPress={clearHistory}>
              <Text style={styles.clearText}>Clear History</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }
}

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  screenText: {
    textAlign: 'right',
    fontSize: 15,
    fontWeight: '700',
    color: '#818181',
  },
  ans: {
    textAlign: 'right',
    fontSize: 25,
    fontWeight: '700',
    color: 'white',
  },
  eachItem: {
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderColor: '#A5A5A5',
  },
  clearBtn: {
    backgroundColor: '#24A5FF',
    borderRadius: 30,
    padding: 20,
  },
  clearText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '700',
  },
});
