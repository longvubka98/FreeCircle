import React, { Component } from 'react';
import { Text, View, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { firebaseApp } from '../config';

export default class ThongTin extends Component {
  constructor(props) {
    super(props);
    this.itemRef = firebaseApp.database().ref('data');
    this.dataForUser = firebaseApp.database().ref('users/'+ firebaseApp.auth().currentUser.uid + '/doDaNhan');
    this.state = {
      name: null,
      add: null,
      phone: null,
      infor: null,
      imageAdd: null,
      image: null,
      resizedImageUri: null
    };
  }
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      }}
      >
        <Image source={{ uri: this.props.navigation.state.params.imageAdd }}
          style={{
            width: 400,
            height: 300
          }} />
        <Text style={{
          fontWeight: 'bold',
          color: 'black'
        }}>{this.props.navigation.state.params.name}</Text>
        <Text style={{
          color: 'black'
        }}>{this.props.navigation.state.params.phone}</Text>
        <Text style={{
          fontWeight: 'bold',
          color: 'black'
        }}>SĐT: {this.props.navigation.state.params.add}</Text>
        <Text style={{
          paddingTop: 20,
          textAlign: 'left',
          color: 'black'
        }}>
          {this.props.navigation.state.params.infor}
        </Text>

        <TouchableOpacity onPress={() => { this.nhanDo() }}
          style={styles.button}>
          <Text style={styles.buttonText}>Nhận đồ</Text>
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