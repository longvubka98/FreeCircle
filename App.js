// import React from "react";
// import { View, Text } from "react-native";
// import { createStackNavigator, createAppContainer } from "react-navigation";

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//         <Text>Home Screen</Text>
//       </View>
//     );
//   }
// }

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: HomeScreen
//   }
// });

// export default createAppContainer(AppNavigator);

import React from 'react';
import { Root } from "native-base";
import Loading from "./src/components/Loading";
import { firebaseApp } from './src/config';
import PerLogin from './src/navigations/PerLogin';
import LoggedNavigation from './src/navigations/Logged';

console.disableYellowBox = true;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogged: false,
      loaded: false,
    }
  }

  async _loadAssetsAsync() {
    await console.log("user");
    try {
      const user = firebaseApp.auth().currentUser;
        console.log("user", user);
        if (user) {
          this.setState({
            isLogged: true,
            loaded: true
          });
        } else {
          this.setState({
            isLogged: false,
            loaded: true
          });
        }
    } catch (ex){
      console.log(ex);
    }
  }

  componentDidMount() {
    this._loadAssetsAsync();
  }

  render() {
    const { isLogged, loaded } = this.state;
    console.log("loaded", loaded);

    if (!loaded) {
      return (
        <Loading />
      );
    }

    if (!isLogged) {
      return (
        <Root>
          <LoggedNavigation />
        </Root>
      );
    } else {
      return (
        <Root>
          <PerLogin />
        </Root>
      );
    }
  }
}