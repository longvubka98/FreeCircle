import { createStackNavigator, createAppContainer} from 'react-navigation';
import Login from '../pages/Login'
import SignUp from '../pages/Signup'
import {Drawer} from './Logged';
// import Recived from './pages/Recived'
const Stack = createStackNavigator({
  Login: Login,
  SignUp: SignUp,
  Drawer: Drawer
},
  {
    headerMode: 'none'
  });
export default createAppContainer(Stack)