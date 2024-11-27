import React from 'react';
import { View, StyleSheet } from 'react-native';
import WeeklyCalendar from '../components/WeeklyCalendar';
import { FAB } from 'react-native-paper';

export default function WeeklyScheduleScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <WeeklyCalendar />
      <FAB
        style={styles.fab}
        label="Add +"
        onPress={() => navigation.navigate('CreateTask')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});