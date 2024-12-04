import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeeklyScheduleScreen from './screens/WeeklyScheduleScreen';
import TaskListScreen from './screens/TaskListScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIcon: () => null,
        tabBarLabelStyle: {
          fontSize: 14,
          bottom: 15
        }
      }}
    >
      <Tab.Screen
        name="Calendar"
        component={WeeklyScheduleScreen}
      />
      <Tab.Screen
        name="All Tasks"
        component={TaskListScreen}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CreateTask" 
        component={CreateTaskScreen}
        options={{ title: 'Create New Task' }}
      />
    </Stack.Navigator>
  );
}

export default function Home() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}