import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeeklyScheduleScreen from './screens/WeeklyScheduleScreen';
import TaskListScreen from './screens/TaskListScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import CreateTaskScreen from './screens/CreateTaskScreen';
import usePushNotification from './notifications/UsePushNotification';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowIcon: false,
        tabBarIconStyle: { display: 'none' },
        tabBarLabelStyle: {
          fontSize: 14,
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
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
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
  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();

  useEffect(() => {
    const listenToNotifications = () => {
      try {
        getFCMToken();
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}