import React, { Component } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { firebaseApp } from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = firebaseApp.database().ref('data');
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    this.itemsRef.on('value', (snapshot) => {
      let data = snapshot.val();
      let items = Object.values(data);
      this.setState({ items });
    });
  }
  static navigationOptions = ({ navigation }) => ({
    title:'Home',
    tabBarLabel: 'Home',
    tabBarColor: '#138a72',
    tabBarIcon: () => (
      <Icon name="home" size={20} color="#fff" />
    )
  })

  render() {
    return (
        <FlatList
          data={this.state.items}
          keyExtractor={item => item.phone}
          renderItem={({ item, i }) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ThongTin', { imageAdd: item.imageAdd, name: item.key, add: item.add, phone: item.phone, infor: item.infor })}>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                height:120,
                borderBottomColor:'#FAFAFA',
                borderWidth: 0.2,
              }}>
              <Image source = {{uri: item.resizedImageAdd}} style ={{ flex:1, height :100, marginLeft:10}}></Image>
              <View style ={{flexDirection: 'column', paddingLeft: 15, flex:2}}>
                <Text style = {{color: 'black', fontWeight: 'bold', fontSize: 13}}>{item.add}</Text>
                <Text style = {{fontSize: 13}}>{item.infor}</Text>
              </View>
              </View>
            </TouchableOpacity>
          )}
        />
    );
  }
}