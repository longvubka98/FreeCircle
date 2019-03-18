import React, { Component } from 'react';
import firebase from '@firebase/app'
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import Logo from '../components/Logo';
import { firebaseApp } from '../config';
import FBSDK, { LoginManager, AccessToken } from 'react-native-fbsdk';
import RNAccountKit from 'react-native-facebook-account-kit'
// import firebase from 'firebase'

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
          'Thành công',
          'Chúc mừng bạn đã đăng nhập thành công',
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: () => this.props.navigation.navigate('Drawer') },
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
          'Thất bại',
          'Sai tên tài khoản hoặc mật khẩu',
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
  DangNhapFacebook() {
    LoginManager.logInWithReadPermissions(["public_profile", "email", "user_birthday"]).then(
      (result) => {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString()
          );
          //Tải dữ liệu user facebook lên firebase
          AccessToken.getCurrentAccessToken().then((data) => {
            firebaseApp.auth().signInAndRetrieveDataWithCredential(firebase.auth.FacebookAuthProvider.credential(data.accessToken));
          }).then(() => this.props.navigation.navigate('Drawer'))
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }
  DangNhapSdt() {
    RNAccountKit.loginWithPhone()
    .then((token) => {
      if (!token) {
        console.log('Login cancelled')
      } else {
        console.log(`Logged with phone. Token: ${token}`)
      }
    })
  }
  DangXuat() {
    LoginManager.logOut();
  }
  render() {
    return (
      <ImageBackground source={require('../images/login-background.jpg')} style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <Logo />
          <TouchableOpacity onPress={() => this.DangNhapFacebook()} style={styles.button_facebook}>
            <Text style={styles.buttonText}>Đăng nhập với facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.DangNhapSdt()} style={styles.button_phone}>
            <Text style={styles.buttonText}>Đăng nhập bằng số điện thoại</Text>
          </TouchableOpacity>
          {/* <TextInput style={styles.inputBox}
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
        /> */}
          {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Drawer')} style={styles.button}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity> */}
          <View style={styles.signupTextCont}>
            <Text style={styles.signupText}>Bạn chưa có tài khoản?</Text>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('SignUp') }}><Text style={styles.signupButton}>Đăng ký</Text></TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#95ccc1',
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
  button_phone: {
    width: 300,
    backgroundColor: '#138a72',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  button_facebook: {
    backgroundColor: '#3B5998',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    width: 300
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  }
});
