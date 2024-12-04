import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TaskListScreen from '../screens/TaskListScreen';

const TaskListStack = createNativeStackNavigator();
function AllTasksNavigation(): React.JSX.Element {
  return (
    <TaskListStack.Navigator initialRouteName="TaskList">
      <TaskListStack.Screen
        name="TaskList"
        component={TaskListScreen}
        options={{
          title: 'All Tasks',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#5EA1A4'},
        }}
      />
    </TaskListStack.Navigator>
  );
}
export default AllTasksNavigation;
