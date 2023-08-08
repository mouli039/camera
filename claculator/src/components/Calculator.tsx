import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

interface IProps {
  navigation?: any;
}
interface IState {
  storage: any;
  input: string;
  answer: string;
  dot: boolean;
}

class Calculator extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      storage: [],
      input: '',
      answer: '',
      dot: false,
    };
  }

  async componentDidMount() {
    const data = await AsyncStorage.getItem('calculatorData');
    data === null
      ? AsyncStorage.setItem('calculatorData', JSON.stringify([]))
      : this.setState({storage: JSON.parse(data)});
  }

  toHistory = () => {
    this.setState({input: '', answer: '', storage: []});
    this.props.navigation?.push('History');
  };

  clear = () => {
    this.setState({input: '', answer: ''});
  };
  back = () => {
    const {input} = this.state;
    const newInput = input.slice(0, -1);
    this.setState({input: newInput});
  };

  dotCheck = (e: string) => {
    const symbols = ['.', '*', '/', '+', '-'];
    this.state.dot === true &&
      symbols.includes(e) &&
      this.setState(() => ({dot: false}));
    if (e === '.') {
      !this.state.dot && this.updateInput(e);
      this.setState({dot: true});
    } else {
      this.updateInput(e);
    }
  };
  check = () => {
    this.state.input.trim() !== '' && this.evalute();
  };
  evalute = () => {
    const {input, storage} = this.state;
    try {
      const res = eval(input);
      const newData = [
        ...storage,
        {question: input, answer: res, id: Date.now()},
      ];
      AsyncStorage.setItem('calculatorData', JSON.stringify(newData));
      console.log('cl', newData);
      this.setState({answer: res, input: '', storage: newData});
    } catch {}
  };

  updateInput = (e: string) => {
    const {input} = this.state;
    const symbols = ['.', '*', '/', '+', '-'];
    const sym = ['*', '.', '/', '+'];
    const lastLatter = input.charAt(input.length - 1);
    if (input.length === 0) {
      if (!sym.includes(e)) {
        symbols.includes(e)
          ? !symbols.includes(lastLatter) && this.setState({input: input + e})
          : this.setState({input: input + e});
      }
    } else {
      symbols.includes(e)
        ? !symbols.includes(lastLatter) && this.setState({input: input + e})
        : this.setState({input: input + e});
    }
  };

  render() {
    const {input, answer} = this.state;
    const {clear, back, dotCheck, toHistory, check} = this;
    return (
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          backgroundColor: 'black',
          alignItems: 'center',
        }}>
        <View style={styles.container}>
          <View style={styles.historyBtn}>
            <Text onPress={toHistory} style={styles.history}>
              History
            </Text>
          </View>
          <View style={styles.screen}>
            <Text style={styles.screenText}>{input}</Text>
            <Text style={styles.ans}>
              {answer === '' ? '0' : `= ${answer}`}
            </Text>
          </View>
          <View style={styles.keyboard}>
            <View style={styles.row}>
              <TouchableOpacity onPress={clear}>
                <Text style={styles.bottonback}>Ac</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={back}>
                <Text style={styles.bottonback}>
                  <Icon name="backspace-outline" size={40} color={'#A5A5A5'} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dotCheck('/')}>
                <Text style={[styles.botton, styles.btnRowEnd]}>/</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dotCheck('*')}>
                <Text
                  style={[styles.botton, styles.btnRowEnd, styles.zeroMargin]}>
                  *
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => dotCheck('7')}>
                <Text style={styles.botton}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dotCheck('8')}>
                <Text style={styles.botton}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dotCheck('9')}>
                <Text style={styles.botton}>9</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dotCheck('-')}>
                <Text
                  style={[styles.botton, styles.btnRowEnd, styles.zeroMargin]}>
                  -
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => dotCheck('4')}>
                <Text style={styles.botton}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dotCheck('5')}>
                <Text style={styles.botton}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dotCheck('6')}>
                <Text style={styles.botton}>6</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dotCheck('+')}>
                <Text style={[styles.bottonCol, styles.zeroMargin]}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rowAdj}>
              <TouchableOpacity onPress={() => dotCheck('1')}>
                <Text style={styles.bottonLastRow}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dotCheck('2')}>
                <Text style={styles.bottonLastRow}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dotCheck('3')}>
                <Text style={styles.bottonLastRow}>3</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modifiedRow}>
              <TouchableOpacity onPress={() => dotCheck('0')}>
                <Text style={styles.bottonRow}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dotCheck('.')}>
                <Text style={[styles.bottonLastRow, styles.bottondot]}>.</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={check}>
                <Text
                  style={[styles.bottonCol, styles.btnlast, styles.zeroMargin]}>
                  =
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Calculator;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  screen: {
    height: '35%',
    justifyContent: 'center',
  },
  keyboard: {
    height: '60%',
    display: 'flex',
  },
  screenText: {
    textAlign: 'right',
    fontSize: 20,
    fontWeight: '700',
    color: '#818181',
  },
  ans: {
    textAlign: 'right',
    fontSize: 40,
    fontWeight: '700',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  rowAdj: {
    bottom: 25,
    flexDirection: 'row',
  },
  botton: {
    fontSize: 35,
    fontWeight: '700',
    color: '#29A8FF',
    textAlign: 'center',
    paddingVertical: 10,
    height: 70,
    width: 70,
    backgroundColor: '#303136',
    borderRadius: 10,
    marginRight: 30,
    marginBottom: 30,
  },
  bottonback: {
    height: 70,
    width: 70,
    backgroundColor: '#616161',
    borderRadius: 10,
    marginRight: 30,
    marginBottom: 30,
    fontSize: 30,
    fontWeight: '700',
    color: '#A5A5A5',
    textAlign: 'center',
    paddingVertical: 15,
  },
  bottonCol: {
    height: 120,
    width: 70,
    backgroundColor: '#005DB2',
    borderRadius: 10,
    color: '#24A5FF',
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: 35,
    fontSize: 35,
  },
  modifiedRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    bottom: 50,
  },
  bottonLastRow: {
    height: 70,
    width: 70,
    backgroundColor: '#303136',
    borderRadius: 10,
    marginRight: 30,
    fontSize: 35,
    fontWeight: '700',
    color: '#29A8FF',
    textAlign: 'center',
    paddingVertical: 10,
  },
  bottonRow: {
    height: 70,
    width: 170,
    backgroundColor: '#303136',
    borderRadius: 10,
    marginRight: 30,
    fontSize: 35,
    fontWeight: '700',
    color: '#29A8FF',
    textAlign: 'center',
    paddingVertical: 10,
  },
  btnlast: {
    backgroundColor: '#1991FF',
    color: '#B2DAFF',
    fontSize: 35,
    paddingVertical: 35,
  },
  btnRowEnd: {
    backgroundColor: '#005DB2',
    color: '#24A5FF',
  },
  bottondot: {
    paddingVertical: 0,
  },
  history: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    width: '30%',
  },
  historyBtn: {
    alignSelf: 'flex-end',
  },
  zeroMargin: {
    marginRight: 0,
  },
});
