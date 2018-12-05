import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import Logo from '../components/Logo';
import {firebaseApp} from '../config';
// import '@firebase/auth'
// import "@firebase/database"
// import '@firebase/firestore'
// import '@firebase/storage'
// import '@firebase/messaging'
// import '@firebase/functions'

// var config = {
//     apiKey: "AIzaSyAJUaKjR44WnojFnPNf8u8QL5n0rsqRVW8",
//     authDomain: "freecircle-56dc0.firebaseapp.com",
//     databaseURL: "https://freecircle-56dc0.firebaseio.com",
//     projectId: "freecircle-56dc0",
//     storageBucket: "freecircle-56dc0.appspot.com",
//     messagingSenderId: "387442449911"
//   };
  
// const firebaseApp = firebase.initializeApp(config);
// import firebaseApp from '../config'

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  Dangky() {
    firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        Alert.alert(
          'Tung hoa',
          'Chúc mừng bạn đã đăng ký thành công',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
          ],
          { cancelable: false }
        )
        this.setState({
          email: '',
          password: ''
        })
      })
      .catch(function (error) {
        Alert.alert(
          'Tịt',
          'Đăng ký thất bại',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        )
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Email"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity onPress={() => this.Dangky()} style={styles.button}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingBottom: 100
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10
  },
  button: {
    width: 300,
    backgroundColor: '#138a72',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  }
});
