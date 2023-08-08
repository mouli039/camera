import React, {Component} from 'react';
import {StyleSheet, View, Alert, Text, Button} from 'react-native';
import {RNCamera} from 'react-native-camera';

class NewCam extends Component {
  camera:any;
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={{flex: 1, alignItems: 'center',display:'flex'}}
          ref={ref => {
            this.camera = ref;
          }}>
          <Text style={{alignContent:'flex-end',justifyContent:'flex-end'}}>
            <Button title="Take a pic man" color="#841584" onPress={} />
          </Text>
        </RNCamera>
        <Text>Click Here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
});

export default NewCam;

// takepictureAsync(options)
