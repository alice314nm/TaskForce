import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TaskCard from '../components/TaskCard';

export default function TaskListScreen() {
  const tasks = []; // Add your tasks data here

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskCard task={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});