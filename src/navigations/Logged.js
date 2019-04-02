import { Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Home from '../pages/Home';
import Received from '../pages/Received';
import MySharing from '../pages/MySharing';
import MyShared from '../pages/MyShared';
import AboutMe from '../pages/AboutMe';
import AboutUs from '../pages/AboutUs';
import SomeThingHappyForYou from '../pages/SomeThingHappyForYou';
import Share from '../pages/Share';
import CustomDrawerComponent from './SideMenu';
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

export const Drawer = createDrawerNavigator({
    Tab: TabNavigator,
    AboutMe: AboutMe,
    MySharing: MySharing,
    MyShared: MyShared,
    Happy: SomeThingHappyForYou,
    AboutUs: AboutUs
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
export default createAppContainer(Drawer)