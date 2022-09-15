import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PieChart from './src/containers/PieChart';
import BarChart from './src/containers/BarChart';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'PieChart') {
              iconName = focused
                ? 'md-pie-chart-sharp'
                : 'md-pie-chart-outline';
            } else if (route.name === 'BarChart') {
              iconName = focused ? 'bar-chart-sharp' : 'bar-chart-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="PieChart" component={PieChart} />
        <Tab.Screen name="BarChart" component={BarChart} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}