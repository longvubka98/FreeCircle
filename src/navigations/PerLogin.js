import { createStackNavigator, createAppContainer} from 'react-navigation';
import Login from '../pages/Login'
import SignUp from '../pages/Signup'
// import Recived from './pages/Recived'
const Stack = createStackNavigator({
  Login: Login,
  SignUp: SignUp,
},
  {
    headerMode: 'none'
  });
export default Stack