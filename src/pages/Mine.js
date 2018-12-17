import ImagePicker from 'react-native-image-crop-picker';
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
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
    this.state = {
      image: null,
      images: null
    };
  }
  pickImage() {
    ImagePicker.openPicker({
      // multiple: true,
      width: 500,
      height: 500,
    }).then(image => {
      this.setState({
        image: { uri: image.path, width: image.width, height: image.height, mime: image.mime },
        images: null
        // images.map(i => {
        //   console.log('received image', i);
        //   return { uri: i.path, width: i.width, height: i.height, mime: i.mime };
        // })
      });
    }).catch(e => Alert.alert(e));
  }
  renderImage(image) {
    return <Image style={{ width: 300, height: 300, resizeMode: 'contain' }} source={image} />
  }
  render() {
    return (
      <ScrollView style={{
        marginTop:40,
        flex: 1,
        backgroundColor: '#fff',
      }}
      contentContainerStyle = {{
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <Text style={{ fontSize: 22, color: 'black' }}>Đồ bạn đăng</Text>
        <FormLabel labelStyle={styles.formLabel}>TÊN BẠN</FormLabel>
        <FormInput inputStyle={styles.formInput} containerStyle = {styles.formContai} placeholder="Name..."/>
        <FormLabel labelStyle={styles.formLabel}>ĐỊA CHỈ</FormLabel>
        <FormInput inputStyle={styles.formInput} containerStyle = {styles.formContai} placeholder="Địa chỉ..."/>
        <FormLabel labelStyle={styles.formLabel}>SĐT LIÊN HỆ</FormLabel>
        <FormInput inputStyle={styles.formInput} containerStyle = {styles.formContai}  placeholder="SĐT..." keyboardType='phone-pad'/>
        <FormLabel labelStyle={styles.formLabel}>MÔ TẢ</FormLabel>
        <FormInput inputStyle={styles.formInput1} containerStyle = {styles.formContai}/>
        {this.state.image ? this.renderImage(this.state.image) : null}
        <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'white' }}></Text>
        <TouchableOpacity style={styles.button}
          onPress={() => this.pickImage()} >
          <Text style={styles.buttonText}>Chia sẻ đồ</Text>
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
    textAlign:'left'
  },
  formInput1: {
    color: '#000',
    paddingBottom:80,
    marginBottom: -15,
    textAlign:'left'
  },
  formContai:{
    borderBottomWidth:1
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