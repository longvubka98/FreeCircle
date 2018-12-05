import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import HomeComponent from './pages/Home';
import PromotionComponent from './pages/Recived';
import TransactionHistoryComponent from './pages/Mine';
import Login from './pages/Login'
import SignUp from './pages/Signup'
// import Recived from './pages/Recived'

let routeConfigs = {
  'Home': {
    screen: HomeComponent,
  },
  'Promotion': {
    screen: PromotionComponent,
  },
  'Transaction': {
    screen: TransactionHistoryComponent,
  }
};

let tabNavigatorConfig = {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
    showIcon: true,
    activeTintColor: 'blue',
    labelStyle: {
      fontSize: 13,
    },
    style: {
      backgroundColor: 'lightgray',
      padding: -10
    },
  },
  order: ['Home', 'Promotion', 'Transaction'],
};

const TabNavigator = createBottomTabNavigator(routeConfigs, tabNavigatorConfig);
const Stack = createStackNavigator({
  Login: Login,
  Tabs: TabNavigator,
  SignUp: SignUp,
  // Recived: {screen: Recived}
},
{
  headerMode: 'none'
 });
 export const AppNavigator = createAppContainer(Stack);