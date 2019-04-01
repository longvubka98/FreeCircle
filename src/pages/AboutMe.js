import React, { Component } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import { firebaseApp } from '../config';

export default class DoDaDang extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let tabBarLabel = 'Đồ đã nhận';
    let tabBarIcon = () => (
      <Image
        source={require('../images/2.png')}
        style={{ width: 26, height: 26, tintColor: '#0067a7' }}
      />
    );
    return { tabBarLabel, tabBarIcon };
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#0067a7',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
          Danh sách đồ Free
        </Text>
      </View>
    );
  }
}