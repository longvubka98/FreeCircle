import ImagePicker from 'react-native-image-crop-picker';
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { firebaseApp } from '../config';
import RNFetchBlob from 'rn-fetch-blob';
import ImageResizer from 'react-native-image-resizer';
var storageRef = firebaseApp.storage();
const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

function uploadImage(uri) {
  return new Promise((res) =>{
  var ID = new Date().getTime();
  var imageRef = storageRef.ref(`images`).child(`${ID}`);
  RNFetchBlob.fs.readFile(uri, 'base64')
    .then((data) => {
    return Blob.build(data, { type: `image.jpg;BASE64` })
    })
    .then((blob) => {
    return imageRef.put(blob);
    }).then(()=>{
      imageRef.getDownloadURL().then(url => {
        return res(url);
      })
    })
  })
}

function resize(uri) {
  return new Promise((res) =>{
    ImageResizer.createResizedImage(uri, 200, 200, 'JPEG', 100)
    .then(({ uri }) => {
      uploadImage(uri).then((url)=>{
        return res(url)
      })
    })
    .catch(err => {
      console.log(err);
      return Alert.alert('Unable to resize the photo', 'Check the console for full the error message');
    });
  })
}
export default class TransactionHistoryComponent extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let tabBarLabel = 'Đồ của tôi';
    let tabBarIcon = () => (
      <Image
        source={require('../images/3.png')}
        style={{ width: 26, height: 26, tintColor: '#964f8e' }}
      />
    );
    return { tabBarLabel, tabBarIcon };
  }

  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database().ref('data');
    this.state = {
      name: null,
      add: null,
      phone: null,
      infor: null,
      imageAdd: null,
      image: null,
      resizedImageUri:null
    };
  }
  pickImage() {
    ImagePicker.openPicker({
      // multiple: true,
      width: 500,
      height: 500,
    }).then(image => {
      this.setState({
        image: { uri: image.path, width: image.width, height: image.height, mime: image.mime }
        // images.map(i => {
        //   console.log('received image', i);
        //   return { uri: i.path, width: i.width, height: i.height, mime: i.mime };
        // })
      });
    }).catch(e => Alert.alert(e));
  }
  pushData(urlImage, name, add, phone, infor) {
    uploadImage(urlImage).then(url =>{
      this.setState({
        imageAdd: url
      })
    });
    resize(urlImage).then(url =>{
      this.setState({
        resizedImageUri: url
      })
    })
    this.itemRef.push({
      name: name,
      add: add,
      phone: phone,
      infor: infor,
      imageAdd: this.state.imageAdd,
      resizedImageAdd: this.state.resizedImageUri
    })
  }
  renderImage(image) {
    return <Image style={{ width: 300, height: 300, resizeMode: 'contain' }} source={image} />
  }
  render() {
    return (
      <ScrollView style={{
        marginTop: 40,
        flex: 1,
        backgroundColor: '#fff',
      }}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{ fontSize: 22, color: 'black' }}>Đồ bạn đăng</Text>
        <FormLabel labelStyle={styles.formLabel}>TÊN BẠN</FormLabel>
        <FormInput
          inputStyle={styles.formInput}
          containerStyle={styles.formContai}
          placeholder="Name..."
          onChangeText={(name) => this.setState({ name })} />
        <FormLabel labelStyle={styles.formLabel}>ĐỊA CHỈ</FormLabel>
        <FormInput
          inputStyle={styles.formInput}
          containerStyle={styles.formContai}
          placeholder="Địa chỉ..."
          onChangeText={(add) => this.setState({ add })} />
        <FormLabel labelStyle={styles.formLabel}>SĐT LIÊN HỆ</FormLabel>
        <FormInput
          inputStyle={styles.formInput}
          containerStyle={styles.formContai}
          placeholder="SĐT..."
          keyboardType='phone-pad'
          onChangeText={(phone) => this.setState({ phone })} />
        <FormLabel labelStyle={styles.formLabel}>MÔ TẢ</FormLabel>
        <FormInput
          inputStyle={styles.formInput1}
          containerStyle={styles.formContai}
          onChangeText={(infor) => this.setState({ infor })} />
        {this.state.image ? this.renderImage(this.state.image) : null}
        <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'white' }}></Text>
        <TouchableOpacity style={styles.button}
          // onPress={() => this.pushData(this.state.name, this.state.add, this.state.phone, this.state.infor, 'aaa')}
          onPress={() => this.pickImage()} >
          <Text style={styles.buttonText}>Chia sẻ đồ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => this.pushData(this.state.image.uri, this.state.name, this.state.add, this.state.phone, this.state.infor)} >
          <Text style={styles.buttonText}>updo</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  formLabel: {
    color: '#000',
    alignItems: 'flex-end'
  },
  formInput: {
    color: '#000',
    marginBottom: -15,
    textAlign: 'left'
  },
  formInput1: {
    color: '#000',
    paddingBottom: 80,
    marginBottom: -15,
    textAlign: 'left'
  },
  formContai: {
    borderBottomWidth: 1
  },
  button: {
    width: 300,
    backgroundColor: '#138a72',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center'
  }
});