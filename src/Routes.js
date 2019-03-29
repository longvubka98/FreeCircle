import { Dimensions, View, Image, ScrollView } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import BangTin from './pages/BangTin';
import DoDaNhan from './pages/DoDaNhan';
import DoDaDang from './pages/DoDaDang';
import DangDo from './pages/DangDo';
import Login from './pages/Login'
import SignUp from './pages/Signup'
import ThongTin from './pages/ThongTin'
import CustomDrawerComponent from './components/DrawerComponent'
// import Recived from './pages/Recived'
var { height, width } = Dimensions.get('window');
let RouteConfigs = {
  'BangTin': {
    screen: BangTin,
  },
  'DoDaNhan': {
    screen: DoDaNhan,
  },
  'DangDo': {
    screen: DangDo,
  },
  'ThongTin': {
    screen: ThongTin
  }
};

let MaterialBottomTabNavigatorConfig = {
  shifting: true,
  labeled: true,
  activeColor: '#fff',
  inactiveColor: '#F5F5F5',
  order: ['BangTin', 'DoDaNhan', 'DangDo'],
  barStyle: {
   
  }
  // tabBarPosition: 'bottom',
  // animationEnabled: true,
  // swipeEnabled: true,
  // tabBarOptions: {
  //   showIcon: true,
  //   activeTintColor: 'blue',
  // labelStyle: {
  //   fontSize: 13,
  // },
  // style: {
  //   backgroundColor: 'lightgray',
  //   padding: -10
  // },
  // },
  // order: ['BangTin', 'DoDaNhan', 'DangDo'],
};

const TabNavigator = createMaterialBottomTabNavigator(RouteConfigs, MaterialBottomTabNavigatorConfig);
const Drawer = createDrawerNavigator({
  Tab: TabNavigator,
  Me: DoDaDang
},
  {
    contentComponent: CustomDrawerComponent,
    drawerWidth: width / 1.61,
    drawerPosition: 'left',
    contentOptions: {
      activeTintColor: 'red',
    }
  }
)
const Stack = createStackNavigator({
  Login: Login,
  Drawer: Drawer,
  SignUp: SignUp,
  ThongTin: ThongTin
},
  {
    headerMode: 'none'
  });
export const AppNavigator = createAppContainer(Stack);