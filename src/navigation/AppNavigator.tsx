import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//import {createNativeStackNavigator} from '@react-navigation/native-stack';
//import WeeklyScheduleScreen from '../screens/WeeklyScheduleScreen';
//import CreateTaskScreen from '../screens/CreateTaskScreen';
//import TaskListScreen from '../screens/TaskListScreen';
//import NotificationsScreen from '../screens/NotificationsScreen';
import {NavigationContainer} from '@react-navigation/native'; //Added this line
import CalendarStackNavigation from './CalendarStackNavigation'; //Added this line
import AllTasksNavigation from './AllTasksNavigation'; //Added this line
import NotificationsNavigation from './NotificationNavigation'; //Added this line

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#fff',
          tabBarActiveBackgroundColor: '#75A1A4',
          tabBarIconStyle: {
            display: 'none',
          },
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarStyle: {backgroundColor: '#757575'},
        }}>
        <Tab.Screen
          name="Calendar"
          component={CalendarStackNavigation}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="All Tasks"
          component={AllTasksNavigation}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsNavigation}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
