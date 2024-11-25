import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Home from './src/HomePage';

AppRegistry.registerComponent(appName, () => Home);

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  category: 'assignment' | 'test';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
}