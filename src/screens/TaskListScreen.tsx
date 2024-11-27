import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TaskCard from '../components/TaskCard';
import axios from "axios";

export default function TaskListScreen() {
  const [tasks, setTasks] = useState([]); // Add tasks data here from json

  useEffect(() => {
    axios
      .get("http://10.0.2.2:5000/")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  }, []);


  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => <TaskCard task={item} />}
        keyExtractor={item => item._id}
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