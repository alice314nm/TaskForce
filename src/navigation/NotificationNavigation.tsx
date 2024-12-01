import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotificationsScreen from '../screens/NotificationsScreen';

const NotificationStack = createNativeStackNavigator();
function NotificationsNavigation(): React.JSX.Element {
  return (
    <NotificationStack.Navigator initialRouteName="Notifications">
      <NotificationStack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          title: 'All Notifications',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#5EA1A4'},
        }}
      />
    </NotificationStack.Navigator>
  );
}

export default NotificationsNavigation;
