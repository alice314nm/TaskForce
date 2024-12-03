import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Home from '../HomePage';

AppRegistry.registerComponent(appName, () => Home);

export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  category: 'assignment' | 'test';
}