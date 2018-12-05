import React, { Component } from 'react';
import { Text, View, Image, FlatList } from 'react-native';

export default class HomeComponent extends Component {
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

// import React, { Component } from 'react';
// import { Text, View, Image, TouchableOpacity } from 'react-native';
// import ImagePicker from 'react-native-image-picker';

// const options = {
//   title: 'Select Avatar',
//   customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// };

// export default class PromotionComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       avatarSource: null
//     }
//   }
// pickImage() {
//   ImagePicker.showImagePicker(options, (response) => {
  
//     if (response.didCancel) {
//     } else if (response.error) {
//     } else if (response.customButton) {
//     } else {
//       const source = { uri: response.uri };
  
//       // You can also display the image using data:
//       // const source = { uri: 'data:image/jpeg;base64,' + response.data };
  
//       this.setState({
//         avatarSource: source,
//       });
//     }
//   });
// }

//   render() {
//     return (
//       <View style={{
//         flex: 1,
//         backgroundColor: '#e97600',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}
//       >
//       <Image source={this.state.avatarSource} style={{with:200, height:200}}/>
//         <TouchableOpacity onPress= {() => this.pickImage()}>
//           <Text style={{ fontWeight: 'bold', fontSize: 22, color: 'white' }}>
//             Danh sách đồ Free
//         </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }