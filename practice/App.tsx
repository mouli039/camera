import {Appearance, Text, View} from 'react-native';
import React, {Component} from 'react';

export class App extends Component {
  // static getColorScheme(): 'light' | 'dark' | null;
  state = {
    msg: null,
  };
  componentDidMount(): void {
    const theme = Appearance.getColorScheme();
    this.setState({msg: theme});
    console.log(theme);
  }
  componentDidUpdate(): void {
    Appearance.addChangeListener(theme =>
      {
        this.setState({msg: theme.colorScheme})}
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.state.msg === 'light' ? 'white' : 'black',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 30,
            color: this.state.msg !== 'light' ? 'white' : 'black',
          }}>
          {this.state.msg}
        </Text>
      </View>
    );
  }
}

export default App;
