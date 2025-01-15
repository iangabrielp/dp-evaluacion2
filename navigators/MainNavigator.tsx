import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import RegistroScreen from '../screens/RegistroScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import OperacionesScreen from '../screens/OperacionesScreen';
import ProductosScreen from '../screens/ProductosScreen';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator ()

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={MyTabs} />
      <Stack.Screen name="Registro" component={RegistroScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      
    </Stack.Navigator>
  );
}

function MyTabs(){
    return(
        <Tab.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Operaciones" component={OperacionesScreen} />
            <Stack.Screen name="Productos" component={ProductosScreen} />
        </Tab.Navigator>
    )
}


export default function MainNavigator(){
  return(
      <NavigationContainer>
          <MyStack/>
      </NavigationContainer>

  );
}