import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import CalendarStackNavigation from './CalendarStackNavigation';
import AllTasksNavigation from './AllTasksNavigation';

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
            height: 0,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            position: 'absolute',
            top: 10, // Adjust this value to move text up/down
          },
          tabBarStyle: {
            backgroundColor: '#757575',
            height: 45,
            paddingBottom: 0,
            paddingTop: 0, // Remove top padding
          }
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
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
