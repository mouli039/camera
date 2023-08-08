import {Appearance, Button, FlatList, Image, Text, View} from 'react-native';
import React, {Component} from 'react';
import FirstApp from './src/components/FirstApp';
import ExampleApp from './src/components/ExampleApp';
import NewCam from './src/components/NewCam';
import {launchCamera} from 'react-native-image-picker';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

interface IProps {}
interface IState {
  uri: any;
}

export class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      uri: [],
    };
  }

  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any,
  ): void {
    console.log('hiii')
    const theme = Appearance.getColorScheme();
    console.log(theme)
  }

  launchNativeCamera = () => {
    let options: any = {
      includeBase64: true,
      storageOptions: {
        skipBackup: false,
        path: 'images',
      },
    };
    request(PERMISSIONS.ANDROID.CAMERA).then(result => {
      console.log(result);
    });

    check(PERMISSIONS.ANDROID.CAMERA)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(error => {
        // …cgl
        console.log('check', error);
      });
    launchCamera(options, (response: any) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = {uri: response.uri};
        // console.log('response', JSON.stringify(response));
        this.setState({uri: [...this.state.uri, response.assets[0].uri]});
      }
    });
  };
  render() {
    return (
      // <FirstApp/>
      // <ExampleApp/>
      // <NewCam/>
      <>
        <Button onPress={this.launchNativeCamera} title="press" />
        <FlatList
          data={this.state.uri}
          renderItem={({item}) => (
            <Image source={{uri: item}} style={{width: 150, height: 150}} />
          )}
          keyExtractor={item => item}
        />
      </>
    );
  }
}

export default App;
