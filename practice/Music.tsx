import {
    Image,
    Text,
    Button,
    View,
    TouchableOpacity,
    StyleSheet,
    Slider,
  } from 'react-native';
  import Sound from 'react-native-sound';
  import TrackPlayer from 'react-native-track-player';
  import React, {Component} from 'react';
  import down from '../images/down.png';
  import dots from '../images/dots.png';
  import volume from '../images/volume.png';
  import mus from '../images/mus.png';
  import arrow from '../images/arrow.png';
  import heart from '../images/heart.gif';
  import shuf from '../images/shuf.png';
  import previous from '../images/previous.png';
  import pause from '../images/pause.png';
  import next from '../images/next.png';
  import play from '../images/play.png';
  
  interface Iprops {
    route?: any;
  }
  interface Istate {
    isPlaying: boolean;
    count: number;
  }
  const songs = [
    {
      title: 'Death Bed',
      artist: 'Powfu',
      artwork: 'https://samplesongs.netlify.app/album-arts/death-bed.jpg',
      url: 'https://samplesongs.netlify.app/Death%20Bed.mp3',
      id: '1',
    },
    {
      title: 'Bad Liar',
      artist: 'Imagine Dragons',
      artwork: 'https://samplesongs.netlify.app/album-arts/bad-liar.jpg',
      url: 'https://samplesongs.netlify.app/Bad%20Liar.mp3',
      id: '2',
    },
    {
      title: 'Faded',
      artist: 'Alan Walker',
      artwork: 'https://samplesongs.netlify.app/album-arts/faded.jpg',
      url: 'https://samplesongs.netlify.app/Faded.mp3',
      id: '3',
    },
    {
      title: 'Hate Me',
      artist: 'Ellie Goulding',
      artwork: 'https://samplesongs.netlify.app/album-arts/hate-me.jpg',
      url: 'https://samplesongs.netlify.app/Hate%20Me.mp3',
      id: '4',
    },
    {
      title: 'Solo',
      artist: 'Clean Bandit',
      artwork: 'https://samplesongs.netlify.app/album-arts/solo.jpg',
      url: 'https://samplesongs.netlify.app/Solo.mp3',
      id: '5',
    },
    {
      title: 'Without Me',
      artist: 'Halsey',
      artwork: 'https://samplesongs.netlify.app/album-arts/without-me.jpg',
      url: 'https://samplesongs.netlify.app/Without%20Me.mp3',
      id: '6',
    },
    {
      title: 'Death Bed',
      artist: 'Powfu',
      artwork: 'https://samplesongs.netlify.app/album-arts/death-bed.jpg',
      url: 'https://samplesongs.netlify.app/Death%20Bed.mp3',
      id: '7',
    },
    {
      title: 'Bad Liar',
      artist: 'Imagine Dragons',
      artwork: 'https://samplesongs.netlify.app/album-arts/bad-liar.jpg',
      url: 'https://samplesongs.netlify.app/Bad%20Liar.mp3',
      id: '8',
    },
    {
      title: 'Faded',
      artist: 'Alan Walker',
      artwork: 'https://samplesongs.netlify.app/album-arts/faded.jpg',
      url: 'https://samplesongs.netlify.app/Faded.mp3',
      id: '9',
    },
    {
      title: 'Hate Me',
      artist: 'Ellie Goulding',
      artwork: 'https://samplesongs.netlify.app/album-arts/hate-me.jpg',
      url: 'https://samplesongs.netlify.app/Hate%20Me.mp3',
      id: '10',
    },
  
    {
      title: 'Without Me',
      artist: 'Halsey',
      artwork: 'https://samplesongs.netlify.app/album-arts/without-me.jpg',
      url: 'https://samplesongs.netlify.app/Without%20Me.mp3',
      id: '11',
    },
  ];
  class Music1 extends Component<Iprops, Istate> {
    state = {
      isPlaying: false,
      count: 0,
    };
  
    audio: Sound | null = null;
  
    togglePlayPause = () => {
      const {isPlaying} = this.state;
  
      if (!isPlaying) {
        // Play the audio
        this.audio = new Sound(songs[this.state.count].url, '', error => {
          if (error) {
            console.log('Error loading audio:', error);
          } else {
            this.audio?.play(() => {
              this.setState({isPlaying: false});
              console.log('Finished playing');
            });
          }
        });
      } else {
        // Pause the audio
        this.audio?.pause(() => {
          this.setState({isPlaying: false});
          console.log('Paused');
        });
      }
  
      this.setState(prevState => ({isPlaying: !prevState.isPlaying}));
    };
  
    onNext = () => {
      const {count} = this.state;
      if (count < songs.length-1) {
        this.setState({count: count + 1});
      } else {
        this.setState({count: 0});
      }
      
    };
    onBack = () => {
      const {count} = this.state;
      if (count >1) {
        this.setState({count: count - 1});
      }
    };
  
    render() {
      const data = this.props.route.params;
      const {isPlaying} = this.state;
      const details = songs[this.state.count];
  
      return (
        <View style={{flex: 1, padding: 10}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Image source={down} />
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
              Music Player
            </Text>
            <Image source={dots} />
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 80,
            }}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Text style={{color: 'black', fontSize: 17, fontWeight: 'bold'}}>
                songs
              </Text>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}> | </Text>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>Lyrics</Text>
            </View>
            <Image
              style={{
                width: 300,
                height: 300,
                borderRadius: 18,
                marginRight: 15,
                marginTop: 20,
              }}
              source={{uri: `${details.artwork}`}}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              {details.title}
            </Text>
            <Text style={{fontSize: 15, fontWeight: 'bold', marginTop: 5}}>
              {details.artist}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 10,
              width: '100%',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Image source={volume} />
            <Image source={mus} />
            <Image source={shuf} />
            <Image source={arrow} />
            <Image source={heart} />
          </View>
  
          <View>
            <Slider
              style={style.slider}
              value={10}
              minimumValue={0}
              maximumValue={100}
              thumbTintColor="#FFD369"
              minimumTrackTintColor="#FFD369"
              maximumTrackTintColor="#FFF"
              onSlidingComplete={() => {}}
            />
          </View>
          <View
            style={{
              width: 320,
              marginLeft: 35,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
              1.53
            </Text>
            <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
              4.42
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: 260,
              marginLeft: 120,
              marginTop: 15,
            }}>
            <TouchableOpacity onPress={this.onBack}>
              <Image source={previous} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.togglePlayPause}>
              {isPlaying ? <Image source={pause} /> : <Image source={play} />}
            </TouchableOpacity>
  
            {/* <Image source={pause} />
            <Image source={play} /> */}
            <TouchableOpacity onPress={this.onNext}>
              <Image source={next} />
            </TouchableOpacity>
          </View>
          {/* <Button
            title={isPlaying ? 'Pause' : 'Play'}
            onPress={this.togglePlayPause}
          /> */}
        </View>
      );
    }
  }
  const style = StyleSheet.create({
    slider: {
      width: 350,
      heiht: 40,
      marginTop: 25,
      flexDirection: 'row',
    },
  });
  export default Music1;