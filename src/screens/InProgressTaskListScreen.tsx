import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TaskCard from '../components/TaskCard';
import axios from "axios";
import { useFocusEffect } from '@react-navigation/native';

export default function InProgressTaskListScreen() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:5000/completed");
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTasks();
    }, [])
  );

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