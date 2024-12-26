import "./global.css";
import { StatusBar } from 'expo-status-bar';
import Header from './src/components/Header';
import { StyleSheet, Text, View } from 'react-native';
import BottomAppBar from './src/components/BottomAppBar';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Favorites from './src/screens/Favorites';
import ShoppingCart from './src/screens/ShoppingCart';
import Map from './src/screens/Map';
import Login from './src/screens/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Tab = createBottomTabNavigator();

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home-filled" size={40} color="black" />
              ),
            }}
          />
          <Tab.Screen
            name="ShoppingCart"
            component={ShoppingCart}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="shopping-cart" size={40} color="black" />
              ),
            }}
          />
          <Tab.Screen
            name="Favorites"
            component={Favorites}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="star-outline" size={40} color="black" />
              ),
            }}
          />
          <Tab.Screen
            name="Map"
            component={Map}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="map" size={40} color="black" />
              ),
            }}
          />
          <Tab.Screen
            name="Login"
            component={Login}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="account-circle" size={40} color="black" />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
