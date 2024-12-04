import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WeeklyScheduleScreen from '../screens/WeeklyScheduleScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';

const CalendarStack = createNativeStackNavigator();
function CalendarStackNavigation(): React.JSX.Element {
  return (
    <CalendarStack.Navigator initialRouteName="WeeklySchedule">
      <CalendarStack.Screen
        name="WeeklySchedule"
        component={WeeklyScheduleScreen}
        options={{
          title: 'Task Force',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#5EA1A4'},
        }}
      />
      <CalendarStack.Screen
        name="CreateTask"
        component={CreateTaskScreen}
        options={{
          title: 'Create A New Task',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#5EA1A4'},
        }}
      />
    </CalendarStack.Navigator>
  );
}
export default CalendarStackNavigation;
