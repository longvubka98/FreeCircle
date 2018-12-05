import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity,StyleSheet } from 'react-native';

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
  
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#964f8e',
        alignItems: 'center',
        justifyContent: 'center'
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>Đồ bạn đăng</Text>
        <TouchableOpacity style={styles.button}
        onPress = {() => this.props.navigation.navigate('DangDo')} >
        <Text style = {styles.buttonText}>Chia sẻ đồ</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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