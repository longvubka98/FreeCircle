import { Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Home from './pages/Home';
import Received from './pages/Received';
import DoDaDang from './pages/MySharing';
import Share from './pages/Share';
import Login from './pages/Login'
import SignUp from './pages/Signup'
import Information from './pages/Infomation'
import CustomDrawerComponent from './components/SideMenu'
// import Recived from './pages/Recived'
var { height, width } = Dimensions.get('window');
let RouteConfigs = {
  'Home': {
    screen: Home,
  },
  'Received': {
    screen: Received,
  },
  'Share': {
    screen: Share,
  },
  'Information': {
    screen: Information
  }
};

let MaterialBottomTabNavigatorConfig = {
  shifting: true,
  labeled: true,
  activeColor: '#fff',
  inactiveColor: '#F5F5F5',
  order: ['Home', 'Received', 'Share'],
  barStyle: {
   
  }
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
  Information: Information
},
  {
    headerMode: 'none'
  });
export const AppNavigator = createAppContainer(Stack);