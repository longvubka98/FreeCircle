import React, { Component } from 'react';
import firebase from '@firebase/app'
import {
  View,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { Container, Button, Text } from 'native-base';
import Logo from '../components/Logo';
import { firebaseApp } from '../config';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import RNAccountKit from 'react-native-facebook-account-kit'
const keyStore = "@App:token";
// cacsh dung image ngoai require thì có thể dùng import
import imgBackground from '../images/login-background.jpg'

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem(keyStore)
      if (token == null || token == '')
        return;
      const response = await firebaseApp.auth().signInAndRetrieveDataWithCredential(firebase.auth.FacebookAuthProvider.credential(token));
      this.props.navigation.navigate('Drawer')
    } catch (ex) {

    }
  }
  /**
   * 1. es6 (destruting,arrow function)
   * 2. async/await trong js *(cơ chế đồng bộ)
   */
  loginFacebook = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(["public_profile", "email", "user_birthday"]);
      const { isCancelled } = result;
      if (isCancelled) {
        console.log("Login cancelled");;
        return;
      }
      const token = await AccessToken.getCurrentAccessToken();
      const { accessToken } = token;
      if (accessToken == null || accessToken == '')
        return;

      await firebaseApp.auth().signInAndRetrieveDataWithCredential(firebase.auth.FacebookAuthProvider.credential(accessToken));
      // lưu accesstoken
      await AsyncStorage.setItem(keyStore, accessToken);

      this.props.navigation.navigate('Drawer')
    } catch (ex) {
      console.error(ex);
    }
  }
  loginPhone = () => {
    RNAccountKit.configure({
      defaultCountry: 'VN'
    })
    RNAccountKit.loginWithPhone()
      .then((token) => {
        if (!token) {
          console.log('Login cancelled')
        } else {
          console.log(`Logged with phone. Token: ${token}`)
        }
      })
  }
  render() {
    return (
      <Container>
        <ImageBackground source={imgBackground} style={{ width: '100%', height: '100%' }}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, marginBottom: 20 }}>
              <Logo />
            </View>
            <View style={{ flex: 1, marginHorizontal: 20 }}>
              <Button block primary rounded style={{ marginBottom: 20 }} onPress={this.loginFacebook}>
                <Text>Đăng nhập với facebook</Text>
              </Button>
              <Button block success rounded onPress={this.loginPhone}>
                <Text>Đăng nhập bằng số điện thoại</Text>
              </Button>
              <View style={{
                justifyContent: 'center',
                paddingVertical: 16,
                flexDirection: 'row'
              }}>
                <Text style={{ color: '#fff' }}>Bạn chưa có tài khoản?</Text>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('SignUp') }}>
                  <Text style={{ color: '#0A60FF' }}>Đăng ký</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Container>
    )
  }
}
