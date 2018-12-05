import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
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
//   apiKey: "AIzaSyAJUaKjR44WnojFnPNf8u8QL5n0rsqRVW8",
//   authDomain: "freecircle-56dc0.firebaseapp.com",
//   databaseURL: "https://freecircle-56dc0.firebaseio.com",
//   projectId: "freecircle-56dc0",
//   storageBucket: "freecircle-56dc0.appspot.com",
//   messagingSenderId: "387442449911"
// };
// if (!firebase.apps.length) {
//   const firebaseApp = firebase.initializeApp(config);
// }
// import firebaseApp from '../config'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  DangNhap() {
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        Alert.alert(
          'Tung hoa',
          'Chúc mừng bạn đã đăng nhập thành công',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => this.props.navigation.navigate('Tabs') },
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
          'Chúc mừng bạn đã đăng nhập thành công',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => console.log('Cancel Pressed') },
          ],
          { cancelable: false }
        )
        this.setState({
          email: '',
          password: ''
        })
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
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Tabs')} style={styles.button}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('SignUp') }}><Text style={styles.signupButton}>Đăng ký</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#95ccc1',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row'
  },
  signupText: {
    color: '#138a72',
    fontSize: 16
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500'
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
    textAlign: 'center'
  }
});
